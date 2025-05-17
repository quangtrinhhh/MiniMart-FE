import { ProductEditContent } from "@/components/layouts/product/product-edit-content";
import NotFound from "@/components/ui/not-found";

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) {
    return <NotFound />; // Ensure this is a component call
  }
  return (
    <div>
      <ProductEditContent slug={slug} />
    </div>
  );
}
