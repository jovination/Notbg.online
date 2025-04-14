import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to download models
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

/**
 * Resizes an image if it exceeds maximum dimensions
 */
export const resizeImage = (
  canvas: HTMLCanvasElement, 
  ctx: CanvasRenderingContext2D, 
  image: HTMLImageElement
): boolean => {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
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
  
  // Apply inverted mask to alpha channel with improved edge detection
  for (let i = 0; i < mask.data.length; i++) {
    // Use a smoother transition for edges to reduce jagged edges
    // Invert the mask value (1 - value) to keep the subject instead of the background
    const maskValue = mask.data[i];
    // Apply a slightly different formula for edges (values between 0.3 and 0.7)
    if (maskValue > 0.3 && maskValue < 0.7) {
      // Smoother transition for edges
      const alpha = Math.round((1 - maskValue) * 255);
      data[i * 4 + 3] = alpha;
    } else {
      // Binary mask for clearly foreground/background areas
      const alpha = maskValue < 0.5 ? 255 : 0;
      data[i * 4 + 3] = alpha;
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
      1.0
    );
  });
}

/**
 * Creates and initializes a segmentation model
 */
export const createSegmentationModel = async () => {
  return await pipeline(
    'image-segmentation', 
    'Xenova/segformer-b2-finetuned-ade-512-512'
  );
}

/**
 * Main function to remove background from an image
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
    const imageData = canvasToDataURL(canvas, 0.9);
    console.log('Image converted to base64');
    
    // Process the image with the segmentation model
    console.log('Processing with segmentation model...');
    const result = await segmenter(imageData, { 
      threshold: 0.5 // Keep threshold for segmentation
    });
    
    console.log('Segmentation result:', result);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    // Apply mask to remove background
    console.log('Mask applied successfully');
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
