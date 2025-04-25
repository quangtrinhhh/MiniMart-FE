"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Gửi form:", form);
    // TODO: Gửi qua API hoặc email service
  };

  return (
    <div className="bg-muted min-h-screen">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thông tin công ty và form */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Liên hệ với chúng tôi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span>70 Lữ Gia, Q.11, TP.HCM</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-1" />
                <a
                  href="tel:19006750"
                  className="text-foreground font-medium hover:underline"
                >
                  19006750
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-1" />
                <a href="mailto:support@sapo.vn" className="hover:underline">
                  support@sapo.vn
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Họ tên</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nhập họ tên"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Nhập email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Nội dung</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Nhập nội dung liên hệ..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Gửi liên hệ
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Bản đồ Google */}
        <div className="rounded-2xl shadow-lg overflow-hidden">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0128508225144!2d105.81630167502934!3d21.03229798061454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab6b7a715e45%3A0xb20de402b71635cd!2zUGjDoW4gbcOqbSBxdWFuIGzhuqNpIGLDoW4gaOG6rW5nIC0gU2FwbyBQT1M!5e0!3m2!1svi!2s!4v1713953533830!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 550 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
