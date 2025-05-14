"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  showSpinner?: boolean;
}

function AnimatedLoadingIllustration(): JSX.Element {
  return (
    <div className="relative mx-auto h-64 w-64">
      {/* Animated Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10"
      />

      {/* Animated Loader Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
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
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Animated Dots */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute right-12 top-12"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="h-4 w-4 rounded-full bg-primary"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute right-6 top-20"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.3,
          }}
          className="h-3 w-3 rounded-full bg-primary/70"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute right-16 top-24"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.6,
          }}
          className="h-2 w-2 rounded-full bg-primary/50"
        />
      </motion.div>
    </div>
  );
}

export function Loading({
  text = "Đang tải...",
  size = "md",
  showSpinner = true,
}: LoadingProps): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[200px] bg-background" />;
  }

  // Kích thước dựa trên prop size
  const containerClasses = {
    sm: "max-w-xs py-6",
    md: "max-w-md py-8",
    lg: "w-full py-12",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div
      className={`flex items-center justify-center bg-background px-4 ${containerClasses[size]}`}
    >
      <div className="mx-auto flex w-full flex-col items-center text-center">
        {/* Animated Text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`mb-6 font-bold tracking-tight text-foreground ${textClasses[size]}`}
        >
          {text}
        </motion.h2>

        {/* Spinner for small size or when illustration is disabled */}
        {size === "sm" || !showSpinner ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Loader2 className="h-10 w-10 text-primary" />
            </motion.div>
          </motion.div>
        ) : (
          /* Animated Illustration for medium and large sizes */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2,
              duration: 0.6,
            }}
            className="mb-4 w-full"
          >
            <AnimatedLoadingIllustration />
          </motion.div>
        )}

        {/* Animated Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="mt-4 h-1 w-full max-w-xs rounded-full bg-primary/20"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="h-full rounded-full bg-primary"
          />
        </motion.div>
      </div>
    </div>
  );
}
