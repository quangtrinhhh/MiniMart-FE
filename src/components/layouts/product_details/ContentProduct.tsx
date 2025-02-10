"use client";
import Heading from "./Heading";
import { useState } from "react";

const ContentProduct: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="content-product mb-5">
      <Heading />
      <div className="container lg:w-4/6 mx-auto mt-5">
        <div className={`content ${isExpanded ? "expanded" : "collapsed"}`}>
          <p className="font-bold uppercase mb-4">
            NƯỚC RỬA CHÉN BÁT SUNLIGHT 100% GỐC THỰC VẬT THIÊN NHIÊN MUỐI KHOÁNG
            VÀ LÔ HỘI CHAI 3.6KG
          </p>
          <p className="mb-4">
            Lần đầu làm ba mẹ, bạn lo rằng chất tẩy rửa còn sót lại trên chén
            dĩa, phẩm màu và các hóa chất độc hại sẽ làm tổn hại sức khỏe của
            con? Là một người theo đuổi lối sống an toàn lành tính, bạn luôn
            mong muốn tìm sản phẩm nước rửa chén không có chất tẩy rửa độc hại,
            hoàn toàn đến từ thiên nhiên, và có hiệu quả làm sạch tốt. Yêu môi
            trường, bạn chọn sử dụng loại nước rửa chén phân hủy sinh học, bảo
            vệ môi trường, với 0% thành phần làm sạch gốc dầu mỏ?
          </p>

          {isExpanded && (
            <>
              <p className="mb-4">
                Sunlight ra mắt Nước rửa chén bát Sunlight Thiên nhiên Muối
                khoáng & Lô hội 100% gốc thực vật, với 100% thành phần làm sạch
                gốc thực vật - An toàn cho chén dĩa trẻ em cùng công thức phân
                hủy sinh học đến 99%, bao bì nhựa tái sinh thân thiện với môi
                trường.
              </p>

              <ul className="list-disc pl-5 mb-4">
                <li>
                  100% thành phần làm sạch gốc thực vật. An toàn cho chén dĩa
                  trẻ em.
                </li>
                <li>
                  Đánh bay dầu mỡ cứng đầu với sức mạnh từ thiên nhiên, hiệu quả
                  vượt trội.
                </li>
                <li>0% thành phần làm sạch gốc dầu mỏ.</li>
                <li>0% màu, 0% paraben.</li>
                <li>99% Công thức phân hủy sinh học, bảo vệ môi trường.</li>
              </ul>

              <p className="mb-4">
                <strong>Hướng dẫn sử dụng:</strong>
              </p>
              <ol className="list-decimal pl-5 mb-4">
                <li>
                  Đổ trực tiếp sản phẩm vào miếng rửa chén đã được thấm nước.
                </li>
                <li>Bóp nhẹ để tạo bọt rồi rửa chén.</li>
                <li>Tráng lại bằng nước sạch.</li>
              </ol>
            </>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="btn btn-toggle border border-orange-500 flex items-center  text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white font-semibold"
            onClick={handleToggleContent}
          >
            {isExpanded ? <>Thu gọn</> : <>Xem thêm</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentProduct;
