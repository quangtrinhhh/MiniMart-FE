"use client"; // Đảm bảo đây là client-side component

import React, { createContext, useContext, useState } from "react";

// Định nghĩa kiểu cho context
interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Tạo context mặc định
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Tạo provider để cung cấp context cho toàn bộ ứng dụng
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Thay đổi trạng thái mở/đóng sidebar
    console.log("đã click");
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook tiện ích để sử dụng context
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
