import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Sử dụng router để chuyển hướng

interface ThankYouDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThankYouDialog: React.FC<ThankYouDialogProps> = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(isOpen);
  const router = useRouter();

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Thêm logic tự động chuyển hướng sau 10 giây
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); // Đóng Dialog
        router.push("/"); // Chuyển về trang chủ
      }, 10000); // 10 giây

      return () => clearTimeout(timer); // Dọn dẹp timeout khi component unmount
    }
  }, [isOpen, router, onClose]);

  return (
    <Dialog.Root open={open} onOpenChange={(val) => !val && onClose()}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
      >
        <Dialog.Title>
          <div className="text-xl font-semibold">Cảm ơn bạn!</div>
        </Dialog.Title>

        <p className="mt-2 text-gray-600">
          Đơn hàng của bạn đã được đặt thành công. Chúng tôi sẽ sớm liên hệ để
          xác nhận.
        </p>

        <button
          className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => {
            onClose();
            router.push("/");
          }}
        >
          Về trang chủ
        </button>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ThankYouDialog;
