import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.yellow.normal,
      }}
    >
      <View>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#3b3b3b' }}>
          Halo, Indy
        </Text>
        <Text style={{ fontSize: 14, color: colors.grayText }}>
          indyeye@gmail.com
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: colors.white,
          padding: 8,
          borderRadius: 999,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <MaterialIcons name="notifications-none" size={20} color={colors.yellow.darker} />
      </TouchableOpacity>
    </View>
  );
}