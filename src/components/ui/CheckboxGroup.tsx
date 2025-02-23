interface CheckboxGroupProps {
  label: string;
  options: string[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options }) => (
  <fieldset className="flex flex-col flex-1">
    <div className="text-[#111] font-bold">{label}</div>
    <div className="flex flex-wrap gap-3">
      {options.map((option, index) => (
        <div className="flex items-center gap-1" key={index}>
          <input type="checkbox" id={option} name={label} value={option} />
          <label htmlFor={option} className="cursor-pointer">
            {option}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

export default CheckboxGroup;
