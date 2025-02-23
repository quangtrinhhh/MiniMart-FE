import { CiSearch } from "react-icons/ci";

export default function SearchInput() {
  return (
    <div className="max-w-[458px] w-full relative border border-gray-300 rounded-xl flex items-center px-3 py-2 focus-within:border-blue-500">
      <fieldset className="flex-1">
        <input
          type="text"
          name="inputSearch"
          placeholder="Search here..."
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          required
        />
      </fieldset>
      <button className="text-gray-500 hover:text-blue-500 transition">
        <CiSearch size={22} />
      </button>
    </div>
  );
}
