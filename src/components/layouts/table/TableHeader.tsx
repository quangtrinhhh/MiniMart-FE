const TableHeader: React.FC = () => {
  return (
    <thead className="bg-[#f6f8fbcc] text-[#111] font-bold text-sm rounded-xl">
      <tr>
        <th className="text-left px-4 py-2 min-w-[400px]">Product</th>
        <th className="text-left px-4 py-2 min-w-[100px]">Product ID</th>
        <th className="text-left px-4 py-2 min-w-[100px]">Price</th>
        <th className="text-left px-4 py-2 min-w-[100px]">Quantity</th>
        <th className="text-left px-4 py-2 min-w-[150px]">Sale</th>
        <th className="text-left px-4 py-2 min-w-[150px] hidden md:table-cell">
          Stock
        </th>
        <th className="text-left px-4 py-2 min-w-[150px] hidden md:table-cell">
          Start date
        </th>
        <th className="text-left px-4 py-2 min-w-[150px] hidden md:table-cell">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
