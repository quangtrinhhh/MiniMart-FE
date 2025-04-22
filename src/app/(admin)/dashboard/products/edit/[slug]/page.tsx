import { getOnlyProduct } from "@/app/api/products/product.api";
import ProductEditForm from "@/components/layouts/product/ProductEditFrom";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function AdminProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const productResponse = await getOnlyProduct(slug);
  const initialProduct = productResponse.data.result;
  console.log("initialProduct", initialProduct);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h1>
      <ProductEditForm product={initialProduct} />
    </div>
  );
}
