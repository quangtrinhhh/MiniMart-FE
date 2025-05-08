import { getOnlyProduct } from "@/api/products/product.api";
import ProductDetail from "@/components/layouts/product_details/ProductDetail";
// import { productQueryOptions } from "@/app/api/products/useProducts";
// import ProductDetail from "@/components/layouts/product_details/ProductDetail";
// import { getQueryClient } from "@/lib/react-query";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const productResponse = await getOnlyProduct(slug);
  return {
    title: `${productResponse.data.result.name} | EGA Mini Mart`,
    description: productResponse.data.result.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div>
      <ProductDetail slug={slug} />
    </div>
  );
}
