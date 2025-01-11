"use client";
import { useState } from "react";

interface CopyButtonProps {
  value: string; // Giá trị để sao chép
  copiedText: string; // Văn bản khi sao chép thành công
  isExpired?: boolean; // Trạng thái hết hạn
}

const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  copiedText,
  isExpired = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset sau 2 giây
    });
  };

  return (
    <div className="copy-button">
      <input type="hidden" value={value} />
      <button
        type="button"
        className={`rounded-full text-xs font-semibold w-full py-2 ${
          isExpired
            ? "text-neutral-600 bg-[#EBEBEB] border-gray-400 cursor-not-allowed"
            : "text-white  border border-[#ff3c02] bg-[#ff3c02]"
        }`}
        disabled={isExpired}
        onClick={!isExpired ? handleCopy : undefined}
      >
        {isExpired ? "Hết hạn" : isCopied ? copiedText : "Sao chép"}
      </button>
    </div>
  );
};

export default CopyButton;
