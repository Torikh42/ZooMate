// src/components/TabBarBackground.tsx
import React from 'react';
import { View } from 'react-native';
import colors from '../../constants/Colors';

export default function TabBarBackground() {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: -20,
        height: 120,
        backgroundColor: colors.yellow.normal,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
      }}
    />
  );
}
