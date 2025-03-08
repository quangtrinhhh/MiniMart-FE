export const formatCurrency = (amount?: number) => {
  if (!amount) return "₫0"; // Nếu không có giá trị, trả về "₫0"
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
