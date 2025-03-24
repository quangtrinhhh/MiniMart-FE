export const formatCurrency = (amount?: number) => {
  if (!amount) return "0 VND"; // Nếu không có giá trị, trả về "0 VND"
  return new Intl.NumberFormat("vi-VN").format(amount) + " vnđ";
};
