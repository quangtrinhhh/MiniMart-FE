import React from "react";

type ArrangeProps = {
  onSortChange: (value: string) => void;
};

const Arrange: React.FC<ArrangeProps> = ({ onSortChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex w-full justify-end">
      <div className="flex mt-5 justify-center items-center gap-2">
        <span className="text-neutral-500">Sắp xếp </span>
        <select
          name="sort_by"
          id="sort-mobile"
          onChange={handleChange}
          className="form-select text-sm bg-white rounded-pill border-neutral-50 p-2"
        >
          <option value="manual">Mặc định</option>
          <option value="name:asc">Tên A → Z</option>
          <option value="name:desc">Tên Z → A</option>
          <option value="price_min:asc">Giá tăng dần</option>
          <option value="price_min:desc">Giá giảm dần</option>
          <option value="created_on:desc">Mới nhất</option>
          <option value="created_on:asc">Cũ nhất</option>
        </select>
      </div>
    </div>
  );
};

export default Arrange;
