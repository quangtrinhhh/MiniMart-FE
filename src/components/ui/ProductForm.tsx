import InputField from "./InputField";
import SelectField from "./SelectField";
import CheckboxGroup from "./CheckboxGroup";

const ProductForm: React.FC = () => (
  <div className="bg-white rounded-md flex-1 flex flex-col gap-5 p-5 mt-5">
    <InputField
      label="Product name"
      placeholder="Enter product name"
      type="text"
      description="Do not exceed 20 characters when entering the product name."
    />
    <div className="flex gap-5">
      <SelectField
        label="Category"
        options={["Choose category", "Shop", "Product"]}
      />
      <InputField label="Quantity" placeholder="Enter number" type="number" />
    </div>
    <div className="flex gap-5">
      <InputField label="Price" placeholder="Price" type="text" />
      <InputField label="Sele price" placeholder="Sele pricer" type="text" />
    </div>
    <SelectField label="Brand" options={["Choose brand", "Shop", "Product"]} />
    <CheckboxGroup
      label="Color"
      options={["Red", "Blue", "Green", "Black", "White"]}
    />
    <CheckboxGroup label="Size" options={["S", "M", "L", "XL", "XXL"]} />
  </div>
);

export default ProductForm;
