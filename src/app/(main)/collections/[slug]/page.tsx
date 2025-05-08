import CollectionsSlug from "@/components/layouts/collections/CollectionsSlug";

type PageProps = {
  params: Promise<{ slug: string }>;
};
export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div>
      <CollectionsSlug slug={slug}></CollectionsSlug>
    </div>
  );
}
