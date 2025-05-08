import { QueryClient } from "@tanstack/react-query";

// Server side QueryClient
export function getQueryClient() {
  return new QueryClient();
}
