import { getOnlyProduct } from "@/api/products/product.api";
import ProductDetail from "@/components/layouts/product_details/ProductDetail";
import NotFound from "@/components/ui/not-found";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const productResponse = await getOnlyProduct(slug);
    const product = productResponse.data.result;
    if (!productResponse) {
      return {
        title: "Product not found | EGA Mini Mart",
        description: "The product you're looking for does not exist.",
      };
    }

    return {
      title: `${product.name} | EGA Mini Mart`,
      description: product.description || "No description available",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      title: "Product not found | EGA Mini Mart",
      description: "The product you're looking for does not exist.",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    return <NotFound />;
  }

  try {
    return (
      <div>
        <ProductDetail slug={slug} />
      </div>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return <NotFound />; // Catch error if there are issues fetching the product
  }
}
