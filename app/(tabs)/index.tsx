import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../constants/Config';

export default function DashboardScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/Dashboard`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0052cc" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* BANER POWITALNY */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeText}>Witaj, Agent Celny 👋</Text>
        <Text style={styles.subWelcomeText}>System Nadzoru Granicznego • Izba Celna</Text>
      </View>

      {/* STATYSTYKI W FORMIE KAFELKÓW */}
      <Text style={styles.sectionTitle}>Bieżące podsumowanie</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="cube-outline" size={24} color="#0052cc" />
          <Text style={styles.statValue}>{data.paczkiWMagazynie}</Text>
          <Text style={styles.statLabel}>W magazynie</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="document-text-outline" size={24} color="#dd6b20" />
          <Text style={styles.statValue}>{data.aktywneRewizje}</Text>
          <Text style={styles.statLabel}>Do rewizji</Text>
        </View>
      </View>

      {/* SZYBKIE AKCJE / SKRÓTY MIGRACYJNE */}
      <Text style={styles.sectionTitle}>Szybkie akcje</Text>
      
      <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/rewizje')}>
        <View style={styles.actionIconWrapper}>
          <Ionicons name="shield-checkmark" size={20} color="#fff" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.actionTitle}>Zarządzaj Rewizjami</Text>
          <Text style={styles.actionDesc}>Lista odpraw, statusy i harmonogram</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#cbd5e0" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/powiadomienia')}>
        <View style={[styles.actionIconWrapper, { backgroundColor: '#4a5568' }]}>
          <Ionicons name="notifications" size={20} color="#fff" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.actionTitle}>Centrum Powiadomień</Text>
          <Text style={styles.actionDesc}>Historia alertów i sensor wstrząsów</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#cbd5e0" />
      </TouchableOpacity>

      {/* CZERWONY ALERT O MANDATACH */}
      {data.powiadomienieOMandacie && (
        <TouchableOpacity 
          style={styles.alertBox} 
          onPress={() => router.push('/platnosci')}
        >
          <Ionicons name="warning" size={24} color="#fff" />
          <Text style={styles.alertText}>
            ⚠️ Masz nieopłacone należności celne! Kliknij, aby przejść do płatności.
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeBanner: {
    backgroundColor: '#0052cc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 10,
    elevation: 3,
  },
  welcomeText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subWelcomeText: { color: '#e2e8f0', fontSize: 13, marginTop: 4, opacity: 0.9 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2d3748', marginBottom: 12, marginTop: 8 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#edf2f7',
    elevation: 2,
  },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#1a202c', marginVertical: 6 },
  statLabel: { fontSize: 12, color: '#718096', fontWeight: '500' },
  actionRow: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#edf2f7',
    elevation: 1,
  },
  actionIconWrapper: { backgroundColor: '#0052cc', padding: 10, borderRadius: 8 },
  actionTitle: { fontSize: 15, fontWeight: 'bold', color: '#2d3748' },
  actionDesc: { fontSize: 12, color: '#718096', marginTop: 2 },
  alertBox: {
    backgroundColor: '#e53e3e',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 30,
    elevation: 3,
  },
  alertText: { color: '#fff', fontSize: 13, fontWeight: 'bold', flex: 1, marginLeft: 10 },
});