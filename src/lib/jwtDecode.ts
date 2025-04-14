import { jwtDecode } from "jwt-decode";

/**
 * Kiểm tra access token có hết hạn hay không
 * @param token JWT access token từ session
 * @returns boolean
 */
export function isAccessTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true; // Token không hợp lệ hoặc decode lỗi → xem như hết hạn
  }
}
