import { getOnlyProduct } from "@/app/api/products/product.api";
import ProductDetail from "@/components/layouts/product_details/ProductDetail";
import { Metadata } from "next";
import { Product } from "@/types/backend";

// Định nghĩa kiểu PageProps
interface PageProps {
  params: Record<string, string>; // 🔥 Sửa kiểu params
  searchParams?: Record<string, string | string[] | undefined>;
}

// 🛠 Tạo metadata động cho SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  console.log("Kiểm tra slug: ", params.slug);
  try {
    const productResponse = await getOnlyProduct(params.slug);
    const product = productResponse?.data?.result as Product | undefined;

    if (!product) {
      return {
        title: "Sản phẩm không tồn tại | Tên Shop",
        description: "Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.",
      };
    }

    const title = `${product.name} | Mua giá tốt tại Tên Shop`;
    const description =
      product.description?.length > 160
        ? product.description.substring(0, 157) + "..."
        : product.description ||
          `Mua ${product.name} với giá tốt tại Tên Shop.`;

    const imageUrl =
      product.assets?.[0]?.asset.path || "/images/default-image.jpg";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `http://localhost:3000/${params.slug}`,
        images: [{ url: imageUrl, width: 800, height: 600 }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Lỗi khi lấy metadata sản phẩm:", error);
    return {
      title: "Lỗi tải dữ liệu sản phẩm | Tên Shop",
      description: `Không thể tải thông tin sản phẩm do lỗi: ${
        error instanceof Error ? error.message : "Không xác định"
      }. Vui lòng thử lại sau.`,
    };
  }
}

// 🛠 Lấy dữ liệu sản phẩm từ API
export default async function ProductPage({ params }: PageProps) {
  try {
    const productResponse = await getOnlyProduct(params.slug);
    const initialProduct = productResponse?.data?.result as Product | undefined;

    if (!initialProduct) {
      return <div>Sản phẩm không tồn tại</div>;
    }

    return <ProductDetail slug={params.slug} initialProduct={initialProduct} />;
  } catch (error) {
    console.error("Lỗi khi tải trang sản phẩm:", error);
    return <div>Đã xảy ra lỗi khi tải sản phẩm.</div>;
  }
}
