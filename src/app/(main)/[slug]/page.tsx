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
  try {
    const productResponse = await getOnlyProduct(params.slug);
    const product = productResponse?.data?.result as Product | undefined;

    if (!product) {
      return { title: "Sản phẩm không tồn tại" };
    }

    return {
      title: `${product.name} | Tên Shop`,
      description: product.description?.substring(0, 160) || "",
      openGraph: {
        images: product.assets?.length
          ? [{ url: product.assets[0].asset.path, width: 800, height: 600 }]
          : [],
      },
    };
  } catch (error) {
    console.error("Lỗi khi lấy metadata sản phẩm:", error);
    return { title: "Lỗi tải dữ liệu sản phẩm" };
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
