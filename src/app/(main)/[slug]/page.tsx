// app/(main)/[slug]/page.tsx
import { getOnlyProduct } from "@/app/api/products/product.api";
import ProductDetail from "@/components/layouts/product_details/ProductDetail";
import { Product } from "@/types/backend";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Kiểu props từ dynamic segment
interface PageProps {
  params: { slug: string };
}

// ✅ SEO metadata động
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const productResponse = await getOnlyProduct(params.slug);
    const product = productResponse?.data?.result as Product | undefined;

    if (!product) {
      return {
        title: "Sản phẩm không tồn tại | EGA Mini Mart",
        description: "Sản phẩm bạn tìm không tồn tại hoặc đã bị xóa.",
      };
    }

    const title = `${product.name} | EGA Mini Mart`;
    const description =
      product.description?.length > 160
        ? product.description.slice(0, 157) + "..."
        : product.description || `Mua ${product.name} tại EGA Mini Mart.`;

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
    console.error("Lỗi metadata:", error);
    return {
      title: "Lỗi tải sản phẩm | EGA Mini Mart",
      description: "Không thể hiển thị thông tin sản phẩm lúc này.",
    };
  }
}

// ✅ Hiển thị trang chi tiết sản phẩm
export default async function ProductPage({ params }: PageProps) {
  try {
    const productResponse = await getOnlyProduct(params.slug);
    const product = productResponse?.data?.result as Product | undefined;

    if (!product) {
      notFound(); // 🔥 Chuẩn SEO - chuyển về 404
    }

    return <ProductDetail slug={params.slug} initialProduct={product} />;
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
    notFound(); // Hoặc tạo error.tsx nếu muốn trang lỗi riêng
  }
}
