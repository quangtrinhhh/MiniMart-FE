interface TableHeaderProps {
  columns: { key: string; label: string; className?: string }[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead className="bg-[#f6f8fbcc] text-[#111] font-bold text-sm rounded-xl">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`text-left px-4 py-2 ${column.className || ""}`}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
