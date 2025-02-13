interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
}) => {
  return (
    <label htmlFor={id} className="flex flex-col">
      <span className="text-[#999999] text-sm mb-2">{label}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="border rounded-md px-2 py-2 focus:border-orange-500 focus:border-2 focus:outline-none text-sm"
      />
    </label>
  );
};

export default InputField;
