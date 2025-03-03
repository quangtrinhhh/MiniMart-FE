"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoChevronRight } from "react-icons/go";
import { useMemo } from "react";

export default function BreadcrumbAdmin() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        label: decodeURIComponent(
          segment.charAt(0).toUpperCase() + segment.slice(1)
        ),
        href,
      };
    });
  }, [pathname]);

  return (
    <ul
      className="text-sm flex items-center flex-wrap gap-3 text-gray-500"
      aria-label="Breadcrumb"
    >
      <li>
        <Link href="/" className=" hover:underline">
          Dashboard
        </Link>
      </li>
      {breadcrumbs.map((item, index) => (
        <li key={index} className="flex items-center">
          <GoChevronRight className="mx-1 text-gray-500" />
          <div className=" hover:underline">{item.label}</div>
        </li>
      ))}
    </ul>
  );
}
