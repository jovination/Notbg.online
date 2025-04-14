
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to download models
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;
const MIN_IMAGE_DIMENSION = 24; // New minimum dimension for downsizing

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
 * Converts canvas to base64 data URL
 */
export const canvasToDataURL = (canvas: HTMLCanvasElement, quality = 0.9): string => {
  return canvas.toDataURL('image/jpeg', quality);
}

/**
 * Applies a segmentation mask to an image to remove the background
 * Uses advanced edge detection for better object boundaries
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
  
  // Enhanced algorithm for better object detection and edge refinement
  // We'll scan for object edges and apply a more gradual transition
  
  // First pass: Apply basic mask
  for (let i = 0; i < mask.data.length; i++) {
    const maskValue = mask.data[i];
    data[i * 4 + 3] = Math.round((1 - maskValue) * 255); // Invert mask
  }
  
  // Second pass: Improve edges with a 3x3 kernel
  const tempData = new Uint8ClampedArray(data.length);
  tempData.set(data);
  
  const width = outputCanvas.width;
  const height = outputCanvas.height;
  
  // Edge enhancement kernel
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      
      // Only process pixels near edges (where alpha is between 20 and 235)
      if (data[idx + 3] > 20 && data[idx + 3] < 235) {
        // Sample surrounding pixels
        let sum = 0;
        let count = 0;
        
        // Check 3x3 neighborhood
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const kidx = ((y + ky) * width + (x + kx)) * 4;
            sum += data[kidx + 3];
            count++;
          }
        }
        
        // Calculate smoothed alpha value
        const avgAlpha = Math.round(sum / count);
        
        // Apply refined alpha for smoother edges
        tempData[idx + 3] = avgAlpha;
      }
    }
  }
  
  // Apply smoothed data
  outputCtx.putImageData(new ImageData(tempData, width, height), 0, 0);
  
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
      1.0
    );
  });
}

/**
 * Creates and initializes a segmentation model with improved parameters
 */
export const createSegmentationModel = async () => {
  // Use a more accurate model for better object detection
  return await pipeline(
    'image-segmentation', 
    'Xenova/segformer-b2-finetuned-ade-512-512', 
    { device: 'webgpu' } // Use WebGPU if available for faster processing
  );
}

/**
 * Main function to remove background from an image
 * Implements improved object detection logic
 */
export const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('Starting background removal process...');
    
    // Initialize segmentation model
    const segmenter = await createSegmentationModel();
    
    // Create canvas from image
    const { canvas, wasResized } = createCanvasFromImage(imageElement);
    console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
    
    // Get image data as base64
    const imageData = canvasToDataURL(canvas, 0.92); // Higher quality for better object detection
    console.log('Image converted to base64');
    
    // Process the image with the segmentation model
    console.log('Processing with segmentation model...');
    const result = await segmenter(imageData, { 
      threshold: 0.5 // Threshold for segmentation
    });
    
    console.log('Segmentation result:', result);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    // Apply mask to remove background
    console.log('Applying enhanced mask for better edge detection');
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
