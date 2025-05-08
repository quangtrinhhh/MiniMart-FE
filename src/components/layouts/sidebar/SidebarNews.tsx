"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Newspaper, Sparkles, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface NewsItem {
  image: string;
  title: string;
  link: string;
}

interface SidebarNewsProps {
  newsData: NewsItem[];
  className?: string;
}

const categories = [
  { name: "Mẹo hay", icon: Sparkles },
  { name: "Tin nổi bật", icon: Zap },
  { name: "Tin công nghệ", icon: Newspaper },
];

export function SidebarNews({ newsData, className }: SidebarNewsProps) {
  return (
    <Card className={cn("bg-white shadow-md", className)}>
      <CardContent className="p-2 md:p-6">
        {/* Categories Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Danh mục</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 transition-colors text-slate-800 hover:text-blue-600"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="font-medium">{category.name}</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* Featured News Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Tin tức nổi bật</h3>
            <Badge variant="outline" className="text-xs">
              Mới nhất
            </Badge>
          </div>

          <div className="space-y-4">
            {newsData.slice(0, 3).map((news, index) => (
              <Link
                href={news.link}
                key={index}
                className="group flex gap-3 items-start hover:bg-slate-50 p-2 rounded-md transition-colors"
              >
                <div className="relative min-w-[70px] h-[50px] overflow-hidden rounded-md">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {news.title}
                </h4>
              </Link>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium inline-flex items-center"
            >
              Xem tất cả
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SidebarNews;
