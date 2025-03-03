interface FormFieldProps {
  label: string;
  name: string; // Thêm name để cập nhật đúng field trong state
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  required?: boolean;
  type?: "text" | "textarea"; // Hỗ trợ cả input và textarea
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  type = "text", // Mặc định là input type text
}) => {
  return (
    <fieldset className="flex flex-col md:flex-row items-center gap-2">
      <label className="text-[#111] font-bold w-full md:w-[300px]">
        {label} {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border rounded-lg px-5 py-2 outline-none flex-1 resize-none h-24"
          required={required}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border rounded-lg px-5 py-2 outline-none flex-1"
          required={required}
        />
      )}
    </fieldset>
  );
};

export default FormField;
