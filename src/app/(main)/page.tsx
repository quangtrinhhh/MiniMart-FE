"use client";
import HomeMain from "@/components/layouts/main/HomeMain";
import { useCheckSession } from "@/hooks/useCheckSession";
import { NextPage } from "next";

const HomePage: NextPage = ({}) => {
  useCheckSession();
  return (
    <div>
      <HomeMain />
    </div>
  );
};

export default HomePage;
