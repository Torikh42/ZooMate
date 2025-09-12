import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

export default function FeatureCard({
  title,
  description,
  icon,
  bgColor,
  onPress,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  bgColor?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        backgroundColor: bgColor || '#fff',
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
      }}
      onPress={onPress}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', color: '#3b3b3b' }}>{title}</Text>
        <Text style={{ color: '#6b6b6b', marginTop: 4, fontSize: 13 }}>{description}</Text>
      </View>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          backgroundColor: 'rgba(0,0,0,0.06)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {icon}
      </View>
    </TouchableOpacity>
  );
}