import Link from "next/link";
import FooterLogo from "./FooterLogo";
import CustomerSupport from "./CustomerSupport";
import Policy from "./Policy";
import SubscriptionForm from "./SubscriptionForm";

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-white max-w-7xl mx-auto mt-10">
      <div className="p-5">
        <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-gutter gap-y-6 pt-6 pb-3">
          <FooterLogo />
          <CustomerSupport />
          <Policy />

          <SubscriptionForm />
        </div>
        <div className="footer-copyright border-t py-3 text-center">
          <span>
            © Bản quyền thuộc về
            <Link
              href="/"
              rel="nofollow"
              target="_blank"
              className="link font-semibold"
            >
              EGANY
            </Link>
            | Cung cấp bởi
            <Link
              rel="nofollow"
              href="/"
              target="_blank"
              className="link font-semibold"
            >
              {" "}
              QuangTrinh
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
