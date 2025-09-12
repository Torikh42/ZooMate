import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';
import { useRouter } from 'expo-router';

export default function TodaySchedule() {
  const router = useRouter();
  const [checked, setChecked] = useState([false, false, false]);
  const schedules = ['Cek Kandang Singa', 'Cek Kandang Singa', 'Cek Kandang Singa'];

  const toggleCheck = (idx: number) => {
    setChecked(prev =>
      prev.map((val, i) => (i === idx ? !val : val))
    );
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontWeight: '700', color: '#3b3b3b', marginBottom: 8 }}>
        Cek Jadwal Hari Ini
      </Text>

      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 12,
          padding: 12,
          borderWidth: 2,
          borderColor: 'rgba(183, 142, 33, 0.15)',
        }}
      >
        {schedules.map((t, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <TouchableOpacity
              onPress={() => toggleCheck(i)}
              style={{
                width: 22,
                height: 24,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: colors.yellow.darkActive,
                marginRight: 10,
                backgroundColor: checked[i] ? colors.yellow.darkActive : '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {checked[i] && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: '#fff',
                    borderRadius: 3,
                  }}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                height: 22,
                backgroundColor: colors.yellow.light,
                borderRadius: 6,
                justifyContent: 'center',
                paddingHorizontal: 8,
              }}
            >
              <Text style={{ fontSize: 12, color: '#6b6b6b' }}>{t}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            marginTop: 6,
            backgroundColor: colors.yellow.darkActive,
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => router.push("../(untabs)/editSchedule")}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Cek Jadwal Saya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}