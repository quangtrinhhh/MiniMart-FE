"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Location {
  id: string;
  name: string;
}

interface AddressSelectProps {
  onChange: (fullAddress: string) => void;
}

export default function AddressSelect({ onChange }: AddressSelectProps) {
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  // Lấy danh sách tỉnh/thành
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
        const data = await response.json();
        setProvinces(data.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh/thành:", error);
      }
    };
    fetchProvinces();
  }, []);

  // Lấy danh sách quận/huyện khi chọn tỉnh
  useEffect(() => {
    if (!selectedProvince) return;

    const fetchDistricts = async () => {
      try {
        const response = await fetch(
          `https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`
        );
        const data = await response.json();
        setDistricts(data.data || []);
        setSelectedDistrict("");
        setWards([]);
        setSelectedWard("");
      } catch (error) {
        console.error("Lỗi khi lấy danh sách quận/huyện:", error);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // Lấy danh sách phường/xã khi chọn quận
  useEffect(() => {
    if (!selectedDistrict) return;

    const fetchWards = async () => {
      try {
        const response = await fetch(
          `https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`
        );
        const data = await response.json();
        setWards(data.data || []);
        setSelectedWard("");
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phường/xã:", error);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  // Cập nhật chuỗi địa chỉ
  const updateFullAddress = useCallback(() => {
    const provinceName =
      provinces.find((p) => p.id === selectedProvince)?.name || "";
    const districtName =
      districts.find((d) => d.id === selectedDistrict)?.name || "";
    const wardName = wards.find((w) => w.id === selectedWard)?.name || "";

    const fullAddress = [wardName, districtName, provinceName]
      .filter(Boolean)
      .join(", ");
    onChange(fullAddress);
  }, [
    selectedProvince,
    selectedDistrict,
    selectedWard,
    provinces,
    districts,
    wards,
    onChange,
  ]);

  useEffect(() => {
    updateFullAddress();
  }, [updateFullAddress]);

  return (
    <div className="space-y-4">
      {/* Tỉnh / Thành phố */}
      <Select onValueChange={setSelectedProvince}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Chọn tỉnh/thành" />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((province) => (
            <SelectItem key={province.id} value={province.id}>
              {province.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Quận / Huyện */}
      <Select onValueChange={setSelectedDistrict} disabled={!selectedProvince}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Chọn quận/huyện" />
        </SelectTrigger>
        <SelectContent>
          {districts.map((district) => (
            <SelectItem key={district.id} value={district.id}>
              {district.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Phường / Xã */}
      <Select onValueChange={setSelectedWard} disabled={!selectedDistrict}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Chọn phường/xã" />
        </SelectTrigger>
        <SelectContent>
          {wards.map((ward) => (
            <SelectItem key={ward.id} value={ward.id}>
              {ward.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
