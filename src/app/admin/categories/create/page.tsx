import { NextPage } from "next";
import { GoChevronRight } from "react-icons/go";

const Page: NextPage = ({}) => {
  return (
    <div>
      <div className="p-[30px]">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3 className="text-2xl text-black font-bold">Category infomation</h3>
          <ul className="text-sm flex items-center flex-wrap justify-start gap10">
            <li>
              <a href="index.html">
                <div className="text-tiny">Dashboard</div>
              </a>
            </li>
            <li>
              <GoChevronRight />
            </li>
            <li>
              <a href="#">
                <div className="text-tiny">Categries</div>
              </a>
            </li>
            <li>
              <GoChevronRight />
            </li>
            <li>
              <div className="text-tiny">New category</div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-md  p-5 mt-5 flex flex-col  gap-5">
          <fieldset className="flex items-center">
            <div className="text-[#111] font-bold flex-0 max-w-[300px] w-full">
              Category name
              <span className="text-red-600 ml-1">*</span>
            </div>
            <input
              type="text"
              placeholder="category name"
              className="border rounded-lg px-5 py-2 outline-none flex-1"
            />
          </fieldset>
          <fieldset className="flex items-center">
            <div className="text-[#111] font-bold flex-0 max-w-[300px] w-full">
              Upload images
              <span className="text-red-600 ml-1">*</span>
            </div>
            <label className="border border-dashed border-blue-500 h-[200px] flex-1 rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition">
              <input type="file" accept="image/*" className="hidden" />
              <span className="text-gray-600">
                Click to upload or drag & drop
              </span>
              <span className="text-sm text-gray-400">JPG, PNG (Max 5MB)</span>
            </label>
          </fieldset>
          <div className="flex ">
            <div className="max-w-[300px] w-full"></div>
            <button className="btn-custome ">Seve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
