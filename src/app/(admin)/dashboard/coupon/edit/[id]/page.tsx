import UpdateCouponForm from "@/components/layouts/coupon/update-coupon-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <UpdateCouponForm couponId={Number(id)} />; // Convert id to number
}
