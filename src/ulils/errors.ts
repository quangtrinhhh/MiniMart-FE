/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  type: string;

  constructor(message?: any) {
    super(message); // Pass message to the super class constructor if required by AuthError

    this.type = message ?? "Unknown Error"; // Set a default type or handle appropriately
  }
}

export class InvalidEmailPasswordError extends CustomAuthError {
  static type = "Email hoặc Password không hợp lệ";

  constructor() {
    super(InvalidEmailPasswordError.type);
  }
}

export class InActiveAccountError extends CustomAuthError {
  static type = "Tài khoản chưa được kích hoạt";

  constructor() {
    super(InActiveAccountError.type);
  }
}
