interface SelectFieldProps {
  label: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options }) => (
  <fieldset className="flex flex-col flex-1 gap-3">
    <div className="text-[#111] font-bold">
      {label}
      <span className="text-red-600 ml-1">*</span>
    </div>
    <select className="w-full border px-5 py-2 rounded-lg outline-none">
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  </fieldset>
);

export default SelectField;
