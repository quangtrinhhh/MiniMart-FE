"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaMoneyBill1 } from "react-icons/fa6";

const paymentMethods = [
  { id: "bank_transfer", label: "Chuyển khoản" },
  { id: "cod", label: "Thu hộ (COD)" },
];

interface IProps {
  setPaymentMethod: (method: string) => void;
}

const PaymentMethods: React.FC<IProps> = ({ setPaymentMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | undefined>(
    undefined
  );

  const handleChange = (method: string) => {
    setSelectedMethod(method);
    setPaymentMethod(method); // Cập nhật giá trị lên component cha
  };

  return (
    <div className="min-w-[300px] w-full  space-y-2 mt-5">
      <h2 className="font-semibold text-lg">Thanh toán</h2>

      <RadioGroup
        value={selectedMethod}
        onValueChange={handleChange}
        className="space-y-2"
      >
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={cn(
              "flex items-center justify-between p-3 border rounded-lg cursor-pointer",
              selectedMethod === method.id && "border-blue-500 bg-blue-50"
            )}
            onClick={() => handleChange(method.id)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={method.id} id={method.id} />
              <Label htmlFor={method.id} className="cursor-pointer">
                {method.label}
              </Label>
            </div>
            <FaMoneyBill1 className="w-5 h-5 text-blue-500" />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethods;
