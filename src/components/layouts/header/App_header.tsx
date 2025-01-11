"use client";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import HeaderCenter from "./HeaderCenter";
import HeaderBottom from "./HeaderBottom";

const AppHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div
        className={`${
          isScrolled ? "hidden opacity-0" : "opacity-100"
        } transition-opacity duration-300 ease-in-out `}
      >
        <HeaderTop />
      </div>
      <div
        className={`${
          isScrolled
            ? "fixed top-0 left-0 w-full z-40 opacity-100 shadow-sm"
            : "opacity-100"
        } transition-all duration-300 ease-in-out`}
      >
        <HeaderCenter />
      </div>
      <div
        className={`${
          isScrolled ? "hidden opacity-0" : "opacity-100"
        } transition-opacity duration-300 ease-in-out max-xl:hidden`}
      >
        <HeaderBottom />
      </div>
    </header>
  );
};

export default AppHeader;
