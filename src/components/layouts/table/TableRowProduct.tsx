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
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/ulils/currency";
import Link from "next/link";
import { useDeleteProduct } from "@/api/products/useProducts";

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

  // Format discount
  const formatDiscount = (discount: number) => {
    if (!discount && discount !== 0) return "-";
    return `${discount}%`;
  };
  const deleteMutation = useDeleteProduct();

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
          {formatCurrency(Number(data.price))}
          {Number(data.price_old) > 0 && (
            <div className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(data.price_old))}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="min-w-[100px]">
        {truncateText(data.slug || "", 15)}
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
                <Link
                  href={`/dashboard/products/edit/${data.slug}`}
                  className="flex items-center"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit product
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => deleteMutation.mutate(data.id)}
              >
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
