/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useCallback } from "react";
import { XCircle, UploadCloud } from "lucide-react";

interface UploadImageProps {
  onUpload: (file: File | null) => void;
  isSuccess?: boolean;
}

const UploadImage: React.FC<UploadImageProps> = ({ onUpload, isSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hàm xóa ảnh, dùng useCallback để tránh tạo lại không cần thiết
  const handleRemoveImage = useCallback(() => {
    setFile(null);
    setPreview(null);
    setError(null);
    onUpload(null);
  }, [onUpload]);

  // Xóa preview khi thành công
  useEffect(() => {
    if (isSuccess) handleRemoveImage();
  }, [isSuccess, handleRemoveImage]);

  // Dọn dẹp URL của preview khi component unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    processFile(selectedFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files?.[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile?: File) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError(null);
    onUpload(selectedFile);
  };

  return (
    <div className="relative w-full flex-1">
      <label
        className="border border-dashed border-blue-500 h-[200px] flex-1 rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition w-full"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={preview}
              alt="Preview"
              className="h-full object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition"
            >
              <XCircle className="w-5 h-5 text-red-500" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud className="w-10 h-10 text-blue-500" />
            <span className="text-gray-600">
              Click to upload or drag & drop
            </span>
            <span className="text-sm text-gray-400">JPG, PNG (Max 5MB)</span>
          </div>
        )}
      </label>

      {file && (
        <p className="text-gray-700 mt-2 text-sm">Selected: {file.name}</p>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default UploadImage;
