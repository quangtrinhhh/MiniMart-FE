import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useRef } from "react";

interface FormattedNumberInputProps {
  value?: number | null;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  max?: number;
  min?: number;
  allowDecimal?: boolean; // nếu cần mở rộng hỗ trợ số thập phân
}

export function FormattedNumberInput({
  value,
  onChange,
  placeholder,
  disabled,
  className,
  max,
  min,
  allowDecimal = false,
}: FormattedNumberInputProps) {
  const [displayValue, setDisplayValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Format số thành chuỗi có dấu phẩy
  const formatNumber = (val: string) => {
    // Loại bỏ tất cả ký tự không phải số và dấu chấm nếu không cho phép thập phân
    let numeric = allowDecimal
      ? val.replace(/[^0-9.]/g, "")
      : val.replace(/[^0-9]/g, "");

    // Chỉ giữ 1 dấu thập phân nếu cho phép
    if (allowDecimal) {
      const parts = numeric.split(".");
      if (parts.length > 2) {
        numeric = parts[0] + "." + parts.slice(1).join("");
      }
    }

    // Ngăn nhập số bắt đầu bằng 0 trừ khi là "0" hoặc số thập phân bắt đầu 0.
    if (!allowDecimal) {
      if (numeric.length > 1 && numeric.startsWith("0")) {
        numeric = numeric.replace(/^0+/, "");
      }
    } else {
      // Với số thập phân, cho phép "0." ở đầu
      if (numeric.length > 1 && numeric.startsWith("0") && numeric[1] !== ".") {
        numeric = numeric.replace(/^0+/, "");
      }
    }

    if (numeric === "") return "";

    // Format với dấu phẩy
    if (!allowDecimal) {
      return parseInt(numeric, 10).toLocaleString("en-US");
    } else {
      // Format phần nguyên có dấu phẩy, giữ nguyên phần thập phân
      const [intPart, decPart] = numeric.split(".");
      const formattedInt = parseInt(intPart || "0", 10).toLocaleString("en-US");
      return decPart !== undefined
        ? `${formattedInt}.${decPart}`
        : formattedInt;
    }
  };

  // Cập nhật hiển thị khi value thay đổi bên ngoài
  useEffect(() => {
    if (value !== undefined && value !== null && !isNaN(value)) {
      setDisplayValue(value.toLocaleString("en-US"));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  // Xử lý khi người dùng nhập liệu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const prevCursor = e.target.selectionStart || 0;

    const formatted = formatNumber(raw);

    setDisplayValue(formatted);

    // Lấy số sạch, loại bỏ dấu phẩy
    const cleanNumberStr = formatted.replace(/,/g, "");

    // Kiểm tra min max
    let numericValue = allowDecimal
      ? parseFloat(cleanNumberStr)
      : parseInt(cleanNumberStr, 10);
    if (isNaN(numericValue)) numericValue = 0;

    if (min !== undefined && numericValue < min) numericValue = min;
    if (max !== undefined && numericValue > max) numericValue = max;

    onChange(numericValue);

    // Xử lý con trỏ (có thể tối ưu thêm, hiện chỉ set cursor về cuối)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          prevCursor;
      }
    }, 0);
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      inputMode="numeric"
      spellCheck={false}
      autoComplete="off"
    />
  );
}
