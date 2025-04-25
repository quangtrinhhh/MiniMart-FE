// pages/news.tsx
import SidebarNews from "@/components/layouts/sidebar/SidebarNews";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CardNews from "@/components/ui/CardNews";

const NewsData = [
  {
    title: "5 mẹo nhỏ giúp bạn làm sạch nhà cửa hiệu quả",
    description:
      "Học cách làm sạch nhanh và hiệu quả với các mẹo đơn giản. Học cách làm sạch nhanh và hiệu quả với các mẹo đơn giản.Học cách làm sạch nhanh và hiệu quả với các mẹo đơn giản.",
    image: "/asset/frame-11-2.jpg",
    link: "/news/cleaning-tips",
  },
  {
    title: "Bí quyết tiết kiệm điện trong gia đình",
    description: "Giảm chi phí điện hàng tháng với các bước đơn giản.",
    image: "/asset/frame-11-2.jpg",
    link: "/news/save-energy",
  },
  {
    title: "Công nghệ xanh đang thay đổi thế giới",
    description: "Khám phá cách công nghệ xanh góp phần bảo vệ môi trường.",
    image: "/asset/frame-11-2.jpg",
    link: "/news/green-tech",
  },
  {
    title: "Thị trường bất động sản năm 2025",
    description: "Phân tích xu hướng và cơ hội trong lĩnh vực bất động sản.",
    image: "/asset/frame-11-2.jpg",
    link: "/news/real-estate-trends",
  },
  {
    title: "Sản phẩm công nghệ mới nhất năm 2025",
    description: "Tổng hợp các sản phẩm công nghệ đáng chú ý vừa ra mắt.",
    image: "/asset/frame-11-2.jpg",
    link: "/news/new-tech-products",
  },
  {
    title: "AI và tương lai của ngành giáo dục",
    description:
      "Trí tuệ nhân tạo đang thay đổi cách chúng ta học tập như thế nào.",
    image: "/asset/frame-11-2.jpg",
    link: "/news/ai-education",
  },
];

const NewsPage: React.FC = () => {
  return (
    <div className="bg-[#f2f6f3] pb-5">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto ">
        <div className="py-5 text-5xl font-semibold text-[#016735]">
          Mẹo hay
        </div>

        <div className="flex gap-6">
          <div className="w-[80%]">
            <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">
              {NewsData.map((news, index) => (
                <CardNews
                  urlImage={news.image}
                  link={news.link}
                  description={news.description}
                  title={news.title}
                  key={index}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}

          <SidebarNews newsData={NewsData} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
