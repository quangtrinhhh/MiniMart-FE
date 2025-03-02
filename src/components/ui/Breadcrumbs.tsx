"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <div className="bg-[#f2f6f3]">
      <ul className="max-w-7xl mx-auto p-3 py-3 flex flex-wrap items-center text-xs md:text-sm">
        {/* Trang chủ */}
        <li className="home">
          <Link className="link" href="/" title="Trang chủ">
            <span>Trang chủ</span>
          </Link>
          {pathSegments.length > 0 && (
            <span className="mx-1 md:mx-2 inline-block">&nbsp;/&nbsp;</span>
          )}
        </li>

        {/* Các breadcrumbs động */}
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          return (
            <li key={href} className="flex items-center">
              {!isLast ? (
                <>
                  <Link className="link capitalize" href={href}>
                    <span>
                      {decodeURIComponent(segment.replace(/-/g, " "))}
                    </span>
                  </Link>
                  <span className="mx-1 md:mx-2 inline-block">
                    &nbsp;/&nbsp;
                  </span>
                </>
              ) : (
                <span className="text-neutral-400 capitalize">
                  {decodeURIComponent(segment.replace(/-/g, " "))}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
