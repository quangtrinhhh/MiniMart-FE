"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

function AnimatedNotFoundIllustration(): JSX.Element {
  return (
    <div className="relative mx-auto h-64 w-64">
      {/* Animated Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10"
      />

      {/* Animated Search Icon */}
      <motion.div
        initial={{ rotate: -20, x: -50 }}
        animate={{ rotate: 0, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.3,
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <circle cx="11" cy="11" r="8" />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            d="m21 21-4.35-4.35"
          />
        </svg>
      </motion.div>

      {/* Animated Question Marks */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute right-12 top-8 text-3xl font-bold text-primary"
      >
        ?
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute right-6 top-16 text-2xl font-bold text-primary/70"
      >
        ?
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute right-16 top-20 text-xl font-bold text-primary/50"
      >
        ?
      </motion.div>
    </div>
  );
}

export default function NotFound(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center sm:max-w-lg md:max-w-2xl">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-9xl font-extrabold tracking-tight text-primary sm:text-[10rem]"
        >
          404
        </motion.div>

        {/* Animated Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          Trang không tìm thấy
        </motion.h2>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8 max-w-md text-muted-foreground"
        >
          Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có thể
          trang đã bị di chuyển hoặc URL không chính xác.
        </motion.p>

        {/* Animated Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.2,
            duration: 0.6,
          }}
          className="mb-8 w-full max-w-sm"
        >
          <AnimatedNotFoundIllustration />
        </motion.div>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>Quay về trang chủ</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
