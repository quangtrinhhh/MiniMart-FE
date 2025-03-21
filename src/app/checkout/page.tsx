"use client";
import CheckoutForm from "@/components/layouts/checkout/CheckoutForm";
import PaymentMethods from "@/components/layouts/checkout/PaymentMethods";
import ShippingMethod from "@/components/layouts/checkout/ShippingMethod";
import SidebarCheckout from "@/components/layouts/checkout/SidebarCheckout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCheckout } from "../api/order/order.api";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ThankYouDialog from "@/components/layouts/checkout/ThankYouDialog";

const CheckoutPage = ({}) => {
  const [fullAddress, setFullAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [fullName, setFullName] = useState<string>("");
  const [homeAddress, setHomeAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const { mutate, isPending, isError, error, isSuccess } = useCheckout();
  const handleCheckout = () => {
    const missingFields: string[] = [];

    if (!fullName) missingFields.push("Họ và tên");
    if (!homeAddress) missingFields.push("Địa chỉ nhà");
    if (!fullAddress) missingFields.push("Địa chỉ đầy đủ");
    if (!paymentMethod) missingFields.push("Phương thức thanh toán");

    if (missingFields.length > 0) {
      toast.error(
        `Vui lòng nhập đầy đủ thông tin: ${missingFields.join(", ")}`
      );
      return;
    }

    const orderData = {
      shipping_address: `${homeAddress}, ${fullAddress}`,
      payment_method: paymentMethod,
      consignee_name: fullName,
      shipping_fee: shippingFee,
      note: note || "",
    };

    mutate(orderData);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Đặt hàng thành công!");
      setIsOrderSuccess(true);
    }
  }, [isSuccess]);

  return (
    <div className="h-screen flex max-w-7xl mx-auto max-md:flex-col">
      <div className="checkout-left flex-1 p-5 ">
        <Link
          href="/"
          className="text-[#2a9dcc] cursor-pointer text-3xl font-semibold"
        >
          EGA Mini Mart
        </Link>
        <div className="mt-3 flex gap-5 max-md:flex-col">
          <CheckoutForm
            setFullAddress={setFullAddress}
            setFullNameProp={setFullName}
            setHomeAddressProp={setHomeAddress}
            setNoteProp={setNote}
          />
          <div className="flex-1 flex-col">
            <ShippingMethod
              address={fullAddress}
              setShippingFee={setShippingFee}
            />
            <PaymentMethods setPaymentMethod={setPaymentMethod} />
          </div>
        </div>
      </div>
      <div className="checkout-right w-1/3 max-md:w-full   border-l-2 bg-[#FAFAFA]">
        <SidebarCheckout
          handleCheckout={handleCheckout}
          isPending={isPending}
          isError={isError}
          error={error?.message}
          isSuccess={isSuccess}
        />
      </div>
      <ToastContainer
        stacked
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <ThankYouDialog
        isOpen={isOrderSuccess}
        onClose={() => setIsOrderSuccess(false)}
      />
    </div>
  );
};

export default CheckoutPage;
