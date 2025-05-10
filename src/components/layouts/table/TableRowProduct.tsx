import type React from "react";
import type { Product } from "@/types/backend";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";

interface IProps {
  data: Product;
  isEven: boolean;
  isLoading?: boolean;
  error?: unknown;
}

const TableRowProduct: React.FC<IProps> = ({ data, isEven }) => {
  // Get the first image from assets if available
  const getProductImage = () => {
    if (data.assets && data.assets.length > 0) {
      const imageAsset = data.assets.find(
        (asset) =>
          asset.type === "image" ||
          (asset.asset &&
            asset.asset.type &&
            asset.asset.type.includes("image"))
      );

      if (imageAsset && imageAsset.asset) {
        return imageAsset.asset.path;
      }
    }
    return "/placeholder.svg";
  };

  // Function to format price
  const formatPrice = (price: string) => {
    if (!price) return "-";
    // Try to format as currency if it's a valid number
    try {
      const numPrice = Number.parseFloat(price.replace(/[^\d.-]/g, ""));
      if (!isNaN(numPrice)) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(numPrice);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // If parsing fails, return the original string
    }
    return price;
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "-";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Get status badge based on boolean status
  const getStatusBadge = (status: boolean) => {
    return status ? (
      <Badge variant="default">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return dateString;
    }
  };

  // Format categories
  // const formatCategories = (categories: any[]) => {
  //   if (!categories || categories.length === 0) return "-";
  //   return categories.map((cat) => cat.name).join(", ");
  // };

  // Format discount
  const formatDiscount = (discount: number) => {
    if (!discount && discount !== 0) return "-";
    return `${discount}%`;
  };

  return (
    <TableRow className={isEven ? "bg-muted/30" : ""}>
      <TableCell className="min-w-[350px]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src={getProductImage() || "/placeholder.svg"}
              alt={data.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{truncateText(data.name, 30)}</div>
            {data.variants && data.variants.length > 0 && (
              <div className="text-xs text-muted-foreground">
                {data.variants.length} variants
              </div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="min-w-[100px]">{data.id}</TableCell>
      <TableCell className="min-w-[100px]">
        <div>
          {formatPrice(data.price)}
          {data.price_old && (
            <div className="text-xs text-muted-foreground line-through">
              {formatPrice(data.price_old)}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="min-w-[100px]">
        {truncateText(data.slug || "", 15)}
      </TableCell>
      <TableCell className="min-w-[100px]">
        {truncateText(data.description || "", 20)}
      </TableCell>
      <TableCell className="min-w-[100px]">{data.sold || 0}</TableCell>
      <TableCell className="min-w-[100px]">
        {getStatusBadge(data.status)}
      </TableCell>
      <TableCell className="min-w-[100px]">{data.stock || 0}</TableCell>
      <TableCell className="min-w-[100px]">
        {data.featured ? (
          <Badge variant="default">Yes</Badge>
        ) : (
          <Badge variant="secondary">No</Badge>
        )}
      </TableCell>
      <TableCell className="min-w-[100px]">
        {formatDiscount(data.discount)}
      </TableCell>
      <TableCell className="min-w-[100px]">
        {formatDate(data.created_at)}
      </TableCell>
      <TableCell className="min-w-[150px] hidden md:table-cell">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit product
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableRowProduct;
