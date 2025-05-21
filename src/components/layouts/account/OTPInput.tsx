"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length: number;
  value: string[];
  onChange: (value: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, value, onChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [activeInput, setActiveInput] = useState<number>(0);

  // Focus the first empty input on mount
  useEffect(() => {
    const firstEmptyIndex = value.findIndex((val) => val === "");
    const indexToFocus = firstEmptyIndex !== -1 ? firstEmptyIndex : 0;

    setTimeout(() => {
      focusInput(indexToFocus);
    }, 100);
  }, [value]);

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      setActiveInput(index);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;

    // Only allow numeric input
    if (!/^\d*$/.test(val)) return;

    // Take the last character if multiple characters are entered
    const digit = val.slice(-1);

    // Update the OTP array
    const newOtp = [...value];
    newOtp[index] = digit;
    onChange(newOtp);

    // Move to next input if a digit was entered
    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();

      // If current input has a value, clear it
      if (value[index]) {
        const newOtp = [...value];
        newOtp[index] = "";
        onChange(newOtp);
      }
      // Otherwise focus previous input
      else if (index > 0) {
        focusInput(index - 1);
      }
    }
    // Handle arrow keys
    else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
    // Handle paste
    else if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();

      navigator.clipboard.readText().then((text) => {
        // Filter out non-numeric characters
        const pastedData = text.replace(/\D/g, "").substring(0, length);

        if (pastedData) {
          const newOtp = [...value];

          // Fill in the values
          for (let i = 0; i < pastedData.length; i++) {
            if (index + i < length) {
              newOtp[index + i] = pastedData[i];
            }
          }

          onChange(newOtp);

          // Focus the input after the last pasted character
          const newFocusIndex = Math.min(index + pastedData.length, length - 1);
          focusInput(newFocusIndex);
        }
      });
    }
  };

  const handleClick = (index: number) => {
    focusInput(index);
  };

  // Create an array of the specified length
  const inputs = Array.from({ length }, (_, i) => i);

  return (
    <div className="flex justify-center gap-2 md:gap-3">
      {inputs.map((index) => (
        <div key={index} className="relative">
          <Input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            autoComplete="one-time-code"
            className={cn(
              "w-12 h-14 md:w-14 md:h-16 text-center text-xl md:text-2xl font-semibold rounded-lg transition-all duration-200",
              "border-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none",
              value[index] ? "bg-blue-50 border-blue-200" : "border-gray-200",
              activeInput === index ? "border-blue-500 shadow-sm" : ""
            )}
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => setActiveInput(index)}
            onClick={() => handleClick(index)}
          />
          <div
            className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 transition-all duration-300",
              activeInput === index ? "bg-blue-500" : "bg-transparent"
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default OTPInput;
