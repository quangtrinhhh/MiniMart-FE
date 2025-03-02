const TableHeader: React.FC = () => {
  return (
    <thead className="bg-[#f6f8fbcc] text-[#111] font-bold text-sm rounded-xl">
      <tr>
        <th className="text-left px-4 py-2 min-w-[250px]">Name category</th>
        <th className="text-left px-4 py-2 min-w-[50px]">Category ID</th>
        <th className="text-left px-4 py-2 min-w-[200px]">slug</th>
        <th className="text-left px-4 py-2 min-w-[250px]">description</th>
        <th className="text-left px-4 py-2 min-w-[200px]">status</th>
        <th className="text-left px-4 py-2 min-w-[150px] hidden md:table-cell">
          created_at
        </th>
        <th className="text-left px-4 py-2 min-w-[150px] hidden md:table-cell">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
