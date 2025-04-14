
import { HfInference } from '@huggingface/transformers';

const hf = new HfInference();

/**
 * Loads an image file into an HTMLImageElement
 */
export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Removes the background from an image and returns a new image as a Blob
 */
export const removeBackground = async (
  img: HTMLImageElement
): Promise<Blob> => {
  try {
    // Create a canvas to draw the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    
    // Set canvas dimensions to match image
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw the original image on canvas
    ctx.drawImage(img, 0, 0);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Create a Blob from the original image for the ML model
    const imageBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else resolve(new Blob());
      }, 'image/png');
    });
    
    console.log('Running segmentation model on image...');
    
    // Use Hugging Face Transformers.js to perform image segmentation
    // We're using a segmentation model to identify the foreground (person/object)
    const segmentation = await hf.imageSegmentation({
      data: imageBlob,
      model: 'facebook/detr-resnet-50-panoptic',
      // We're removing the unsupported 'topk' property
    });
    
    console.log('Segmentation result:', segmentation);
    
    // Create a mask based on the segmentation result
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const maskCtx = maskCanvas.getContext('2d');
    
    if (!maskCtx) {
      throw new Error('Could not get mask canvas context');
    }
    
    // If we have segments from the model
    if (Array.isArray(segmentation) && segmentation.length > 0) {
      // Find segments that are likely to be foreground objects
      // Classes like 'person', 'animal', 'object', etc.
      const foregroundClasses = ['person', 'dog', 'cat', 'bird', 'car', 'bicycle', 'motorcycle', 'airplane', 'potted plant', 'flower'];
      
      // Fill the mask with black (transparent)
      maskCtx.fillStyle = 'black';
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      
      // For each segment that matches our foreground classes
      segmentation.forEach(segment => {
        if (foregroundClasses.some(cls => segment.label.toLowerCase().includes(cls))) {
          // Draw this segment as white in our mask
          maskCtx.fillStyle = 'white';
          const mask = new Image();
          mask.src = segment.mask;
          maskCtx.drawImage(mask, 0, 0, maskCanvas.width, maskCanvas.height);
        }
      });
    } else {
      // Fallback: If segmentation didn't work, use a simple algorithm
      // This is a very basic approach - in a real app you'd want something more sophisticated
      console.log('Segmentation failed or returned no segments, using fallback algorithm');
      
      // Create a simple contrast-based mask
      const data = imageData.data;
      const maskData = maskCtx.createImageData(canvas.width, canvas.height);
      
      // Simple background removal based on contrast differences
      for (let i = 0; i < data.length; i += 4) {
        // Calculate contrast value
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Simple edge detection (this is very basic)
        const isEdge = 
          i > 4 * canvas.width && 
          (Math.abs(r - data[i - 4]) > 30 || 
           Math.abs(g - data[i - 4 + 1]) > 30 || 
           Math.abs(b - data[i - 4 + 2]) > 30);
        
        // Set mask values - white for foreground, black for background
        if (isEdge) {
          maskData.data[i] = 255;
          maskData.data[i + 1] = 255;
          maskData.data[i + 2] = 255;
          maskData.data[i + 3] = 255;
        } else {
          maskData.data[i] = 0;
          maskData.data[i + 1] = 0;
          maskData.data[i + 2] = 0;
          maskData.data[i + 3] = 255;
        }
      }
      
      maskCtx.putImageData(maskData, 0, 0);
    }
    
    // Apply the mask to the original image
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(maskCanvas, 0, 0);
    
    // Convert the canvas with transparent background to a Blob
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob from canvas'));
      }, 'image/png');
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw new Error('Failed to remove background: ' + (error instanceof Error ? error.message : String(error)));
  }
};
