import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
}

export const FileUploadZone = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
      };

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === newFile.id 
                ? { ...f, preview: e.target?.result as string }
                : f
            )
          );
        };
        reader.readAsDataURL(file);
      }

      setUploadedFiles(prev => [...prev, newFile]);
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      <Card 
        className={cn(
          "border-2 border-dashed transition-all duration-300 bg-gradient-subtle",
          isDragOver 
            ? "border-primary bg-accent shadow-medical" 
            : "border-border hover:border-primary/50 hover:bg-accent/30"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-medical flex items-center justify-center text-white shadow-glow">
            <Upload className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Upload Medical Documents or Images
            </h3>
            <p className="text-muted-foreground">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports: PDF, DOC, DOCX, JPG, PNG, DICOM files
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button 
              variant="outline" 
              className="hover:bg-accent hover:shadow-medical transition-all duration-300"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <FileText className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
            <Button 
              variant="outline"
              className="hover:bg-accent hover:shadow-medical transition-all duration-300"
              onClick={() => document.getElementById('image-input')?.click()}
            >
              <Image className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </div>

          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
            className="hidden"
          />
          <input
            id="image-input"
            type="file"
            multiple
            accept="image/*,.dcm"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card className="p-4 bg-gradient-card shadow-card">
          <h4 className="font-medium text-foreground mb-3">Uploaded Files</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div 
                key={file.id}
                className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50 animate-fade-in"
              >
                {file.preview ? (
                  <img 
                    src={file.preview} 
                    alt={file.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-medical-blue-light flex items-center justify-center">
                    {file.type.includes('image') ? (
                      <Image className="h-5 w-5 text-medical-blue" />
                    ) : (
                      <FileText className="h-5 w-5 text-medical-blue" />
                    )}
                  </div>
                )}
                
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};