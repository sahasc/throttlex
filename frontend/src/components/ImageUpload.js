import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

const ImageUpload = ({ onImageSelect, currentImage, label = "Upload Image" }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String);
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
        {label}
      </label>
      
      {preview ? (
        <div className="relative aspect-video bg-throttle-bg-secondary border border-throttle-border overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-throttle-red text-white p-2 hover:bg-throttle-red-hover transition-colors"
            data-testid="remove-image"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          data-testid="upload-image-button"
          className="w-full aspect-video bg-throttle-bg-secondary border border-throttle-border hover:border-throttle-red transition-colors flex flex-col items-center justify-center gap-3"
        >
          <Upload size={40} className="text-throttle-text-muted" />
          <span className="text-throttle-text-secondary text-sm uppercase">
            Click to upload
          </span>
          <span className="text-throttle-text-muted text-xs">
            Max 2MB, JPG/PNG
          </span>
        </button>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        data-testid="image-upload-input"
      />
    </div>
  );
};

export default ImageUpload;
