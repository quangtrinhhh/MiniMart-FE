"use client";
import CheckoutForm from "@/components/layouts/checkout/CheckoutForm";
import PaymentMethods from "@/components/layouts/checkout/PaymentMethods";
import ShippingMethod from "@/components/layouts/checkout/ShippingMethod";
import SidebarCheckout from "@/components/layouts/checkout/SidebarCheckout";
import { useState } from "react";

const CheckoutPage = ({}) => {
  const [fullAddress, setFullAddress] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");
  console.log(fullAddress, PaymentMethod);
  return (
    <div className="h-screen flex max-w-7xl mx-auto max-md:flex-col">
      <div className="checkout-left flex-1 p-5 ">
        <h2 className="text-[#2a9dcc] cursor-pointer text-3xl font-semibold">
          EGA Mini Mart
        </h2>
        <div className="mt-3 flex gap-5 max-md:flex-col">
          <CheckoutForm setFullAddress={setFullAddress} />
          <div className="flex-1 flex-col">
            <ShippingMethod address={fullAddress} />
            <PaymentMethods setPaymentMethod={setPaymentMethod} />
          </div>
        </div>
      </div>
      <div className="checkout-right w-1/3 max-md:w-full   border-l-2 bg-[#FAFAFA]">
        <SidebarCheckout />
      </div>
    </div>
  );
};

export default CheckoutPage;
