import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { profile } = useAuth();

  return (
    <View
      className="px-4 py-12 flex-row justify-between items-center"
      style={{ backgroundColor: colors.yellow.normal }}
    >
      <View>
        <Text className="text-4xl font-bold" style={{ color: colors.yellow.darkHover }}>
          Halo, {profile?.full_name?.split(' ')[0] || 'Pengguna'}
        </Text>
        <Text className="text-sm" style={{ color: colors.grayText }}>
          {profile?.email || 'email@example.com'}
        </Text>
      </View>

      <TouchableOpacity
        className="bg-white p-2 rounded-full shadow"
      >
        <MaterialIcons name="notifications-none" size={20} color={colors.yellow.darker} />
      </TouchableOpacity>
    </View>
  );
}