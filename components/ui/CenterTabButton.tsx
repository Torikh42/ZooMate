import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import colors from '@/constants/Colors';

export default function CenterTabButton({ accessibilityState }: any) {
  const router = useRouter();
  const focused = accessibilityState?.selected;

  return (
    <TouchableOpacity
      onPress={() => router.push('/(tabs)/scanqr')}
      activeOpacity={0.85}
      className="absolute bottom-5 self-center items-center justify-center"
    >
      <View
        className="w-16 h-16 rounded-full bg-white justify-center items-center shadow-lg"
      >
        <MaterialIcons name="qr-code" size={30} color={colors.yellow.darker} />
      </View>
      <Text
        className="mt-1 text-sm font-semibold"
        style={{ color: focused ? colors.yellow.darker : '#9b9b9b' }}
      >
        Scan QR
      </Text>
    </TouchableOpacity>
  );
}