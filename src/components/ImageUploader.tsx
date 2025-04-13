
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { loadImage, removeBackground } from "@/lib/backgroundRemoval";
import { Card, CardContent } from "@/components/ui/card";

const ImageUploader = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      setOriginalImage(URL.createObjectURL(file));
      setProcessedImage(null);
      
      // Load the image
      const img = await loadImage(file);
      
      // Process the image to remove background
      const processedBlob = await removeBackground(img);
      const processedURL = URL.createObjectURL(processedBlob);
      
      setProcessedImage(processedURL);
      
      toast({
        title: "Success!",
        description: "Background removed successfully.",
      });
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const a = document.createElement("a");
      a.href = processedImage;
      a.download = "notbg-image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Remove Background in Seconds</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your image and our AI will automatically remove the background. It's that simple!
        </p>
      </div>

      {!originalImage ? (
        <div
          className={`drop-zone rounded-[32px] ${isDragging ? "active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">Drag and drop your image here</p>
            <p className="text-gray-500 mb-4">or click to browse files</p>
            <Button className="rounded-full">Upload Image</Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Original Image */}
            <Card className="flex-1 max-w-sm rounded-[32px]">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold">Original Image</h3>
                </div>
                <div className="image-container aspect-square flex items-center justify-center bg-gray-100 rounded-[24px]">
                  {originalImage && (
                    <img
                      src={originalImage}
                      alt="Original"
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Processed Image */}
            <Card className="flex-1 max-w-sm rounded-[32px]">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold">Processed Image</h3>
                </div>
                <div className="image-container aspect-square flex items-center justify-center bg-gray-100 bg-[url('/placeholder.svg')] rounded-[24px]">
                  {isProcessing ? (
                    <div className="loader"></div>
                  ) : processedImage ? (
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <ImageIcon className="h-12 w-12 mb-2" />
                      <p>Processing will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                setOriginalImage(null);
                setProcessedImage(null);
              }}
              variant="outline"
              className="rounded-full"
            >
              Try Another Image
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!processedImage || isProcessing}
              className="rounded-full"
            >
              Download Result
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
