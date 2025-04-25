// app/(your-layout)/introduce/page.tsx

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IntroducePage: React.FC = () => {
  return (
    <div className="bg-[#f2f6f3] pb-10 min-h-screen">
      <Breadcrumbs />

      <Card className="max-w-6xl mx-auto p-6 mt-6 ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Giới thiệu</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-gray-800 leading-relaxed text-justify">
          <section>
            <h2 className="font-semibold text-lg mb-2">1. Giới thiệu chung</h2>
            <p>
              EGA Minimart là một thương hiệu siêu thị mini uy tín và chất
              lượng, cam kết mang đến cho khách hàng những trải nghiệm mua sắm
              tiện lợi, hiện đại và phong phú. Với sứ mệnh “Phục vụ gia đình
              Việt,” EGA Minimart không ngừng nỗ lực cung cấp sản phẩm thiết yếu
              và dịch vụ tốt nhất, đáp ứng mọi nhu cầu sinh hoạt hàng ngày.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              2. Tầm nhìn và Sứ mệnh
            </h2>
            <p>
              <strong>Tầm nhìn:</strong> Trở thành hệ thống siêu thị mini hàng
              đầu tại Việt Nam, mang đến sự tiện lợi, tin cậy và giá trị vượt
              trội.
            </p>
            <p>
              <strong>Sứ mệnh:</strong> Cung cấp sản phẩm và dịch vụ tốt nhất,
              tạo môi trường mua sắm an toàn, thân thiện, hiện đại và góp phần
              phát triển cộng đồng bền vững.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. Sản phẩm đa dạng</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Thực phẩm tươi sống: Rau củ quả, thịt, cá, hải sản được tuyển
                chọn kỹ.
              </li>
              <li>
                Thực phẩm khô và đóng gói: Gạo, mì, bún, đồ hộp, đồ ăn nhanh.
              </li>
              <li>Đồ uống: Nước giải khát, sữa, nước trái cây, nước ngọt.</li>
              <li>
                Sản phẩm chăm sóc cá nhân: Sữa tắm, dầu gội, kem đánh răng, v.v.
              </li>
              <li>
                Sản phẩm chăm sóc gia đình: Nước giặt, nước rửa chén, nước lau
                sàn.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">4. Dịch vụ vượt trội</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Chất lượng đảm bảo:</strong> Sản phẩm được kiểm tra kỹ
                lưỡng về nguồn gốc và chất lượng.
              </li>
              <li>
                <strong>Tiện lợi tối đa:</strong> Hệ thống cửa hàng phân bố rộng
                khắp.
              </li>
              <li>
                <strong>Tiết kiệm chi phí:</strong> Nhiều chương trình khuyến
                mãi, giảm giá hấp dẫn.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              5. Không gian mua sắm thân thiện
            </h2>
            <p>
              Không gian mua sắm hiện đại, bố trí khoa học giúp khách hàng dễ
              dàng tìm kiếm sản phẩm. Đội ngũ nhân viên nhiệt tình, chuyên
              nghiệp luôn sẵn sàng hỗ trợ khách hàng tận tình.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">6. Cam kết cộng đồng</h2>
            <p>
              EGA Minimart thường xuyên tổ chức các hoạt động xã hội, chương
              trình từ thiện, góp phần xây dựng cộng đồng phát triển bền vững.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Kết luận</h2>
            <p>
              Với những nỗ lực không ngừng nghỉ, EGA Minimart khẳng định vị thế
              trong ngành siêu thị mini tại Việt Nam. Hãy đến với EGA Minimart
              để trải nghiệm không gian mua sắm hiện đại, nơi gia đình bạn luôn
              được phục vụ chu đáo và tận tâm.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntroducePage;
