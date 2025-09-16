import { Profile } from "@/types/user";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  profile: Profile | null;
};

export default function ProfileDetails({ profile }: Props) {
  const data = [
    { label: "Nama Pengguna: ", value: profile?.full_name || "-" },
    { label: "Email: ", value: profile?.email || "-" },
    { label: "No. Telepon: ", value: profile?.phone_number || "-" },
    {
      label: "Alamat: ",
      value: profile?.address || "-",
    },
  ];

  return (
    <View className="px-4 mb-5 mt-3 space-y-3">
      {data.map((item, index) => (
        <View
          key={index}
          className="flex-row justify-between items-start flex-wrap"
        >
          <Text className="text-sm text-gray-500 font-medium flex-1">
            {item.label}
          </Text>
          <Text className="text-sm text-gray-800 text-right flex-1 pl-3">
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
