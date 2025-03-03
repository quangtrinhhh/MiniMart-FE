interface IProps {
  setPageSize?: (value: number) => void;
}

export default function EntriesSelector({ setPageSize }: IProps) {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-[#95989D] text-xs">Showing</span>
      <select
        name="showing"
        id="showing"
        className="border rounded-xl px-3 py-1 focus:outline-none focus:ring-0"
        defaultValue="10"
        onChange={(e) => {
          const value = Number(e.target.value);
          if (!Number.isNaN(value)) setPageSize?.(value);
        }}
      >
        {[8, 10, 20, 30].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="text-[#95989D] text-xs">entries</span>
    </div>
  );
}
