"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";
import { useUsers } from "@/app/api/users/users.api";
import Pagination from "@/components/ui/Pagination";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER";
}

const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(""); // Ô tìm kiếm
  const itemsPerPage = 5;

  const { users, totalPages, isLoading, isError } = useUsers(
    search,
    currentPage,
    itemsPerPage
  );

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
      console.log("Xóa người dùng với ID:", id);
      // Gọi API xóa người dùng tại đây
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quản lý người dùng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Tìm kiếm theo tên/email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => setOpen(true)}>Thêm người dùng</Button>
        </div>
        {isLoading ? (
          <p>Đang tải...</p>
        ) : isError ? (
          <p>Lỗi khi tải dữ liệu!</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => handleEdit(user)}>
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              totalItemsProps={currentPage}
              setCurrent={setCurrentPage}
              totalPagesProps={totalPages}
            />
          </>
        )}
      </CardContent>
      {/* Dialog thêm/chỉnh sửa người dùng */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Họ"
              defaultValue={editingUser?.first_name || ""}
            />
            <Input
              placeholder="Tên"
              defaultValue={editingUser?.last_name || ""}
            />
            <Input
              placeholder="Email"
              type="email"
              defaultValue={editingUser?.email || ""}
            />
            <Button onClick={() => setOpen(false)}>Lưu</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserManagement;
