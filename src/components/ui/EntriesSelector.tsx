export default function EntriesSelector() {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-[#95989D] text-xs">Showing</span>
      <select
        name="showing"
        id="showing"
        className="border rounded-xl px-3 py-1 focus:outline-none focus:ring-0"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      <span className="text-[#95989D] text-xs">entries</span>
    </div>
  );
}
