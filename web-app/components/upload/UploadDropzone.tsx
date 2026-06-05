import { useState, useCallback } from 'react';
import { Upload, FileType, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadDropzoneProps {
  onUpload?: (files: File[]) => void;
  isUploading?: boolean;
  progress?: number;
}

export function UploadDropzone({ onUpload, isUploading, progress = 0 }: UploadDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    if (onUpload && selectedFiles.length > 0) {
      onUpload(selectedFiles);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          isDragActive 
            ? 'border-primary bg-primary/[0.02]' 
            : 'border-white/10 bg-white/[0.01] hover:border-primary/20 hover:bg-primary/[0.01]'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          multiple 
          accept="image/jpeg, image/png, image/heic"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">Drag & drop your media here</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Support for JPG, PNG, and HEIC files. Max file size 50MB.
          </p>
          <Button variant="premium" className="pointer-events-auto" disabled={isUploading}>
            Browse Files
          </Button>
        </div>
      </div>

      {/* Selected Files Queue */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">{selectedFiles.length} files selected</h4>
              {!isUploading && (
                <Button size="sm" variant="premium" onClick={handleUploadClick}>
                  Upload All
                </Button>
              )}
            </div>
            
            {isUploading && (
              <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary font-semibold">Uploading & AI Scanning...</span>
                  <span className="text-white">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#E5C158] to-[#A38A4D]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {selectedFiles.map((file, index) => (
                <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <FileType className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  {!isUploading && (
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
