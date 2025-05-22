"use client";

import type React from "react";

import type { Category } from "@/types/backend";
import Pagination from "../admin/pagination";
import Image from "next/image";
import { ChevronDown, ChevronUp, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  data: Category[];
  totalPagesProps: number;
  totalItemsProps: number;
  isLoading?: boolean;
  error?: unknown;
  setCurrent?: (value: number) => void;
  setPageSize?: (value: number) => void;
}

const TableCategoryList: React.FC<IProps> = ({
  data,
  totalPagesProps,
  totalItemsProps,
  isLoading,
  error,
  setCurrent,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleExpand = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-40 text-red-500">
            <p>Error loading categories. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage your product categories</CardDescription>
            </div>
            <Button size="sm">Add Category</Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : data.length > 0 ? (
            <div className="grid gap-4">
              {data.map((category) => (
                <div key={category.id} className="space-y-3">
                  <div className="bg-muted/40 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={
                            category.image ||
                            "/placeholder.svg?height=64&width=64"
                          }
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-lg">
                            {category.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={category.status ? "default" : "outline"}
                            >
                              {category.status ? "Active" : "Inactive"}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>ID: {category.id}</span>
                          <span>Slug: {category.slug}</span>
                          <span>
                            Created:{" "}
                            {new Date(category.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {category.children && category.children.length > 0 && (
                      <div className="mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-sm"
                          onClick={() => toggleExpand(category.id)}
                        >
                          {expandedCategories.includes(category.id) ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              Hide Subcategories ({category.children.length})
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              Show Subcategories ({category.children.length})
                            </>
                          )}
                        </Button>

                        {expandedCategories.includes(category.id) && (
                          <div className="mt-3 pl-6 border-l-2 border-muted space-y-3">
                            {category.children.map((child) => (
                              <div
                                key={child.id}
                                className="bg-background rounded-lg p-3"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border">
                                    <Image
                                      src={
                                        child.image ||
                                        "/placeholder.svg?height=48&width=48"
                                      }
                                      alt={child.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium">
                                        {child.name}
                                      </h4>
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant={
                                            child.status ? "default" : "outline"
                                          }
                                        >
                                          {child.status ? "Active" : "Inactive"}
                                        </Badge>
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4"
                                              >
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="12" cy="5" r="1" />
                                                <circle cx="12" cy="19" r="1" />
                                              </svg>
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="flex items-center gap-2">
                                              <Eye className="h-4 w-4" />
                                              View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex items-center gap-2">
                                              <Edit className="h-4 w-4" />
                                              Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                                              <Trash2 className="h-4 w-4" />
                                              Delete
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {child.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span>ID: {child.id}</span>
                                      <span>Slug: {child.slug}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              <p>No categories found.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Pagination
              totalPagesProps={totalPagesProps}
              totalItemsProps={totalItemsProps}
              setCurrent={setCurrent}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TableCategoryList;
