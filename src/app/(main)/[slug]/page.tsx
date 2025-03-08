import { getOnlyProduct } from "@/app/api/products/product.api";
import ProductDetail from "@/components/layouts/product_details/ProductDetail";
import { Metadata } from "next";

// Tạo metadata động cho SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getOnlyProduct(params.slug);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
    };
  }

  return {
    title: `${product.data.result.name} | Tên Shop Của Bạn`,
    description: product.data.result.description.substring(0, 160),
    openGraph: {
      images: [
        {
          url: product.data.result.assets[0].asset.path,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

// Lấy dữ liệu ban đầu ở server
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const productResponse = await getOnlyProduct(params.slug);
  const initialProduct = productResponse?.data?.result; // ✅ Lấy đúng kiểu Product

  if (!initialProduct) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  return <ProductDetail slug={params.slug} initialProduct={initialProduct} />;
}
