export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}
export enum CouponType {
  PERCENT = "percent",
  FIXED_AMOUNT = "fixed_amount",
}

export enum CouponStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  DISABLED = "disabled",
}
export enum PaymentMethod {
  COD = "cod", // Thanh toán khi nhận hàng
  BANK_TRANSFER = "bank_transfer", // Chuyển khoản ngân hàng
}
