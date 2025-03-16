import { Input } from "@/components/ui/input";
import { useRef } from "react";

interface OTPInputProps {
  otp: string[];
  handleChange: (index: number, value: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ otp, handleChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <div className="flex justify-between gap-2">
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
