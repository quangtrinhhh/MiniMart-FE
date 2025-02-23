interface InputFieldProps {
  label: string;
  placeholder: string;
  type: string;
  description?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type,
  description,
}) => (
  <fieldset className="flex flex-col gap-3 flex-1">
    <div className="text-[#111] font-bold">
      {label}
      <span className="text-red-600 ml-1">*</span>
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className="border rounded-lg px-5 py-2 outline-none flex-1"
    />
    {description && (
      <span className="text-[#95989D] text-xs">{description}</span>
    )}
  </fieldset>
);

export default InputField;
