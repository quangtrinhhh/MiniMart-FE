"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";

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
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");

  const handleAdd = () => {
    const newCategory: Category = {
      id: Date.now(), // temporary id
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      image: "",
    };
    onChange([...categories, newCategory]);
    resetDialog();
  };

  const handleEdit = () => {
    if (!editingCategory) return;
    onChange(
      categories.map((cat) =>
        cat.id === editingCategory.id
          ? { ...cat, name, slug: name.toLowerCase().replace(/\s+/g, "-") }
          : cat
      )
    );
    resetDialog();
  };

  const handleDelete = (id: number) => {
    onChange(categories.filter((cat) => cat.id !== id));
  };

  const openAddDialog = () => {
    setEditingCategory(null);
    setName("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setIsDialogOpen(true);
  };

  const resetDialog = () => {
    setEditingCategory(null);
    setName("");
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <Label>Danh mục</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <Badge variant="secondary">{c.name}</Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openEditDialog(c)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(c.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" /> Thêm danh mục
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
              </DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Tên danh mục"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <DialogFooter>
              <Button variant="ghost" onClick={resetDialog}>
                Hủy
              </Button>
              <Button onClick={editingCategory ? handleEdit : handleAdd}>
                {editingCategory ? "Lưu" : "Thêm"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
