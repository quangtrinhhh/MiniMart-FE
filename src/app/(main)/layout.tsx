import type { Metadata } from "next";

import "@/app/styles/globals.css";
import "@/app/styles/style.css";
import AppHeader from "@/components/layouts/header/App_header";
import AppFooter from "@/components/layouts/footer/App_footer";
import Sidebar from "@/components/layouts/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import MiniCard from "@/components/layouts/mini_card/MiniCard";
import { UIProvider } from "@/context/UIProvider";
import { Bounce, ToastContainer } from "react-toastify";
import { auth } from "@/auth";
import { CartProvider } from "@/context/CartProvider";

export const metadata: Metadata = {
  title: "EAG mini mart",
  description: "EAG mini mart",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="font-mono">
      <ToastContainer
        stacked
        position="bottom-left"
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
      <CartProvider>
        <SidebarProvider>
          <UIProvider>
            <div className="absolute">
              <Sidebar session={session} />
              <MiniCard />
            </div>
            <div className="relative ml-0 transition-all duration-300">
              {/* Nội dung của bạn sẽ di chuyển sang bên phải khi sidebar mở */}
              <AppHeader />
              {children}
              <AppFooter />
            </div>
          </UIProvider>
        </SidebarProvider>
      </CartProvider>
    </div>
  );
}
