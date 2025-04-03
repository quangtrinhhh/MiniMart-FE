import CollectionsSlug from "@/components/layouts/collections/CollectionsSlug";

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <CollectionsSlug slug={params.slug}></CollectionsSlug>
    </div>
  );
};

export default CategoryPage;
