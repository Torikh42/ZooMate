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
      onPress={() => router.push('/scanqr')}
      activeOpacity={0.85}
      style={{
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <MaterialIcons name="qr-code" size={30} color={colors.yellow.darker} />
      </View>
      <Text
        style={{
          marginTop: 4,
          fontSize: 13,
          fontWeight: '600',
          color: focused ? colors.yellow.darker : '#9b9b9b',
        }}
      >
        Scan QR
      </Text>
    </TouchableOpacity>
  );
}