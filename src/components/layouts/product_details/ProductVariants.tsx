import { Variant } from "@/types/backend";
import { useState } from "react";

interface ProductVariantsProps {
  variants?: Variant[];
  onSelectVariant: (variant: Variant) => void;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants = [],
  onSelectVariant,
}) => {
  const [selected, setSelected] = useState<Variant | null>(variants[0] ?? null);

  const handleSelect = (variant: Variant) => {
    setSelected(variant);
    onSelectVariant(variant);
  };

  return (
    <div className="flex gap-5 mt-5 text-sm">
      <div className="text-neutral-500">Loại:</div>
      <div className="flex gap-5">
        {variants.length > 0 ? (
          variants.map((variant) => (
            <div
              key={variant.id}
              className={`border px-4 py-2 cursor-pointer ${
                selected?.id === variant.id
                  ? "border-black bg-gray-100"
                  : "border-gray-300"
              }`}
              onClick={() => handleSelect(variant)}
            >
              {variant.name}
            </div>
          ))
        ) : (
          <div className="text-gray-500">Không có biến thể</div>
        )}
      </div>
    </div>
  );
};

export default ProductVariants;
