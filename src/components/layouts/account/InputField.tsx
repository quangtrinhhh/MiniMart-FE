interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  ...rest
}) => {
  return (
    <label htmlFor={id} className="flex flex-col">
      <span className="text-[#999999] text-sm mb-2">{label}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border rounded-md px-2 py-2 focus:border-orange-500 focus:border-2 focus:outline-none text-sm"
        {...rest} // Hỗ trợ các props khác từ react-hook-form
      />
    </label>
  );
};

export default InputField;
