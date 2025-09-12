import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Header from '../../components/Header';
import TodaySchedule from '../../components/TodaySchedule';
import FeatureCard from '../../components/FeatureCard';
import colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 0 }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 16,
            marginTop: -24, 
          }}
        >
          <TodaySchedule />

          <View
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: '#ccc',
            }}
          >
            <Text style={{ marginBottom: 12, fontSize: 16, fontWeight: '600', color: '#4b4b4b' }}>
              Lihat Fitur Lainnya
            </Text>

            <FeatureCard
              title="ZooMap"
              description="Cek Kawasan Kebun Binatang Sekarang!"
              bgColor={colors.greenSoft}
              icon={<MaterialIcons name="map" size={22} />}
              onPress={() => router.push('/zooMap')}
            />
            <FeatureCard
              title="Lihat Semua Jadwal"
              description="Lihat Jadwal Kamu Hari Ini"
              bgColor={colors.paleYellow}
              icon={<MaterialIcons name="schedule" size={22} />}
              onPress={() => router.push('/schedule')}
            />
            <FeatureCard
              title="Data Satwa"
              description="Cek Data Satwa di Kebun Binatang Kamu"
              bgColor={colors.blueSoft}
              icon={<MaterialIcons name="pets" size={22} />}
              onPress={() => router.push('/satwaData')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}