"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export default function CategorySelector({
  categories,
  onChange,
}: {
  categories: Category[];
  onChange: (updatedCategories: Category[]) => void;
}) {
  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <Label>Danh mục</Label>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <Badge key={c.id} variant="secondary">
              {c.name}
            </Badge>
          ))}
        </div>
        <Button>Chỉnh sửa danh mục</Button>
      </CardContent>
    </Card>
  );
}
