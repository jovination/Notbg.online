import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { loadImage, removeBackground } from "@/lib/backgroundRemoval";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const ImageUploader = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
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
      setProgress(0);
      setProcessingStatus('Loading image...');
      setOriginalImage(URL.createObjectURL(file));
      setProcessedImage(null);
      
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 150);
      
      setProcessingStatus('Loading image...');
      const img = await loadImage(file);
      
      setProcessingStatus('Removing background...');
      const processedBlob = await removeBackground(img);
      const processedURL = URL.createObjectURL(processedBlob);
      
      clearInterval(progressInterval);
      setProgress(100);
      setProcessingStatus('Finalizing...');
      
      setTimeout(() => {
        setProcessedImage(processedURL);
        setProcessingStatus('');
        
        toast({
          title: "Success!",
          description: "Background removed successfully.",
        });
      }, 300);
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 300);
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
      
      toast({
        title: "Downloaded!",
        description: "Your image has been downloaded successfully.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold mb-4">Remove Background in Seconds</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your image and our AI will automatically identify objects and remove the background.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!originalImage ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`drop-zone rounded-[24px] flex items-center justify-center  h-[350px] ${isDragging ? "active" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Upload className="h-12 w-12 text-blue-500 mb-4" />
              </motion.div>
              <p className="text-lg font-medium mb-2">Drag and drop your image here</p>
              <p className="text-gray-500 mb-4">or click to browse files</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">Upload Image</Button>
              </motion.div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 max-w-sm w-full"
              >
                <Card className="h-full rounded-[24px] overflow-hidden shadow-md">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="text-center mb-4">
                      <h3 className="font-semibold">Original Image</h3>
                    </div>
                    <div className="image-container flex-grow aspect-square flex items-center justify-center bg-gray-100 rounded-[16px] overflow-hidden">
                      {originalImage && (
                        <motion.img
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          src={originalImage}
                          alt="Original"
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-1 max-w-sm w-full"
              >
                <Card className="h-full rounded-[24px] overflow-hidden shadow-md">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="text-center mb-4">
                      <h3 className="font-semibold">Processed Image</h3>
                    </div>
                    <div className="image-container flex-grow aspect-square flex items-center justify-center bg-gray-100 bg-[url('/placeholder.svg')] rounded-[16px]">
                      {isProcessing ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-2" />
                          <p className="text-gray-500">{processingStatus} {progress}%</p>
                          <div className="w-48 h-3 mt-2 overflow-hidden">
                            <Progress value={progress} className="h-full" />
                          </div>
                        </div>
                      ) : processedImage ? (
                        <motion.img
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
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
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center gap-4 flex-wrap"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDownload}
                  disabled={!processedImage || isProcessing}
                  className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Download Result
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="absolute left-10 top-1/2 w-16 h-16 text-primary opacity-60 hidden md:block"
        animate={{ 
          y: [0, 15, 0],
          rotate: 360 
        }}
        transition={{ 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M30,20 Q50,60 70,20" />
        </svg>
      </motion.div>
    </div>
  );
};

export default ImageUploader;
