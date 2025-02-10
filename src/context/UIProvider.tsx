"use client";

import React, { createContext, useContext, useState } from "react";

// Định nghĩa kiểu cho UI Context
interface UIContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMiniCardOpen: boolean;
  toggleMiniCard: () => void;
}

// Tạo context mặc định
const UIContext = createContext<UIContextType | undefined>(undefined);

// Tạo provider để cung cấp context cho toàn bộ ứng dụng
export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMiniCardOpen, setIsMiniCardOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    console.log("Sidebar toggled");
  };

  const toggleMiniCard = () => {
    setIsMiniCardOpen((prev) => !prev);
    console.log("Mini Card toggled");
  };

  return (
    <UIContext.Provider
      value={{ isSidebarOpen, toggleSidebar, isMiniCardOpen, toggleMiniCard }}
    >
      {children}
    </UIContext.Provider>
  );
};

// Hook tiện ích để sử dụng context
export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
