/* eslint-disable @typescript-eslint/no-explicit-any */

import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to download models
env.allowLocalModels = false;
env.useBrowserCache = true; // Enable browser caching to speed up subsequent loads

const MAX_IMAGE_DIMENSION = 768; // Reduced from 1024 for faster processing
const MIN_IMAGE_DIMENSION = 24; // Minimum dimension for downsizing

/**
 * Resizes an image if it exceeds maximum dimensions or is below minimum dimensions
 */
export const resizeImage = (
  canvas: HTMLCanvasElement, 
  ctx: CanvasRenderingContext2D, 
  image: HTMLImageElement
): boolean => {
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  let wasResized = false;

  // Handle maximum dimension constraint
  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }
    wasResized = true;
  }

  // Handle minimum dimension constraint
  if (width < MIN_IMAGE_DIMENSION || height < MIN_IMAGE_DIMENSION) {
    if (width < height) {
      height = Math.round((height * MIN_IMAGE_DIMENSION) / width);
      width = MIN_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MIN_IMAGE_DIMENSION) / height);
      height = MIN_IMAGE_DIMENSION;
    }
    wasResized = true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);
  return wasResized;
}

/**
 * Creates a canvas from an image element
 */
export const createCanvasFromImage = (image: HTMLImageElement): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  wasResized: boolean;
} => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  const wasResized = resizeImage(canvas, ctx, image);
  return { canvas, ctx, wasResized };
}

/**
 * Converts canvas to base64 data URL with optimized quality
 */
export const canvasToDataURL = (canvas: HTMLCanvasElement, quality = 0.75): string => {
  // Using lower quality for faster processing
  return canvas.toDataURL('image/jpeg', quality);
}

/**
 * Fast implementation of mask application to remove background
 */
export const applyMaskToImage = (
  canvas: HTMLCanvasElement,
  mask: { data: number[] }
): Promise<Blob> => {
  // Create a new canvas for the masked image
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = canvas.width;
  outputCanvas.height = canvas.height;
  const outputCtx = outputCanvas.getContext('2d');
  
  if (!outputCtx) {
    throw new Error('Could not get output canvas context');
  }
  
  // Draw original image
  outputCtx.drawImage(canvas, 0, 0);
  
  // Apply the mask
  const outputImageData = outputCtx.getImageData(
    0, 0,
    outputCanvas.width,
    outputCanvas.height
  );
  const data = outputImageData.data;
  
  // Optimized single-pass algorithm for faster processing
  for (let i = 0; i < mask.data.length; i++) {
    const maskValue = mask.data[i];
    // Simple threshold for binary segmentation (faster)
    const alpha = maskValue < 0.4 ? 255 : 0; // Sharper cutoff for better object definition
    data[i * 4 + 3] = alpha;
  }
  
  // Only enhance edges for higher quality images to save processing time
  if (canvas.width > 400 || canvas.height > 400) {
    // Fast edge refinement
    const tempData = new Uint8ClampedArray(data);
    const width = outputCanvas.width;
    const height = outputCanvas.height;
    
    // Only process edge pixels (where alpha changes)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4 + 3; // Alpha channel
        
        // Only process edge pixels (where alpha is either 0 or 255)
        if (data[idx] === 0 || data[idx] === 255) {
          // Check neighbors to see if we're at an edge
          const left = data[((y) * width + (x-1)) * 4 + 3];
          const right = data[((y) * width + (x+1)) * 4 + 3];
          const top = data[((y-1) * width + (x)) * 4 + 3];
          const bottom = data[((y+1) * width + (x)) * 4 + 3];
          
          // If this is an edge pixel, apply smoothing
          if (left !== data[idx] || right !== data[idx] || top !== data[idx] || bottom !== data[idx]) {
            // Simple smoothing operation
            tempData[idx] = Math.round((left + right + top + bottom) / 4);
          }
        }
      }
    }
    
    // Apply refined edges
    for (let i = 0; i < data.length; i++) {
      data[i] = tempData[i];
    }
  }
  
  outputCtx.putImageData(outputImageData, 0, 0);
  
  // Convert canvas to blob
  return new Promise((resolve, reject) => {
    outputCanvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      },
      'image/png',
      0.95 // Slightly reduced quality for faster processing
    );
  });
}

/**
 * Creates and initializes a faster segmentation model
 */
export const createSegmentationModel = async () => {
  // Use a smaller, faster model for quicker processing
  return await pipeline(
    'image-segmentation', 
    'Xenova/segformer-b0-finetuned-ade-512-512', // Smaller, faster model
    { 
      device: 'webgpu', 
      progress_callback: null // Disable progress tracking for speed
    }
  );
}

// Cache the model to avoid reloading
let cachedModel: any = null;

/**
 * Main function to remove background from an image
 * Optimized for speed while maintaining accuracy
 */
export const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('Starting optimized background removal process...');
    
    // Use cached model if available
    if (!cachedModel) {
      console.log('Initializing segmentation model...');
      cachedModel = await createSegmentationModel();
    }
    
    // Create canvas from image (with optimal size)
    const { canvas, wasResized } = createCanvasFromImage(imageElement);
    console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
    
    // Get image data as base64 with reduced quality for faster processing
    const imageData = canvasToDataURL(canvas, 0.75);
    
    // Process the image with the segmentation model
    console.log('Processing with fast segmentation model...');
    const result = await cachedModel(imageData, { 
      threshold: 0.4 // Lower threshold for faster processing
    });
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    // Apply mask to remove background
    console.log('Applying optimized mask');
    return await applyMaskToImage(canvas, result[0].mask);
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
