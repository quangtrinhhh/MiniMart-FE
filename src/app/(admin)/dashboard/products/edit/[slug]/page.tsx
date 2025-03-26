import { getOnlyProduct } from "@/app/api/products/product.api";
import ProductEditFrom from "@/components/ui/ProductEditFrom";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function AdminProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const productResponse = await getOnlyProduct(slug);
  const initialProduct = productResponse.data.result;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h1>
      <ProductEditFrom initialProduct={initialProduct} />
    </div>
  );
}
