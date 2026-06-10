import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function PowiadomieniaScreen() {
  const [alerty, setAlerty] = useState([
    { id: '1', tekst: '📦 AWB: 157-4501 zostało pomyślnie zwolnione przez Urząd Celny.', data: 'Dzisiaj, 10:15' },
    { id: '2', tekst: '⚠️ Ponowna rewizja celna dla MRN: PL4430200002R0 została zaplanowana na jutro.', data: 'Wczoraj, 14:30' },
    { id: '3', tekst: '🛑 Wykryto niezgodność w wadze brutto dla AWB: 157-4502.', data: '08.06.2026' },
  ]);

  const [subscription, setSubscription] = useState<any>(null);

  const wyczyscHistorie = () => {
    setAlerty([]);
    Alert.alert('Sensor Ruchu', 'Wykryto potrząśnięcie urządzeniem! Historia powiadomień została wyczyszczona.');
  };

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const sub = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      
      const silaWypadkowa = Math.sqrt(x * x + y * y + z * z);

      if (silaWypadkowa > 2.2) {
        wyczyscHistorie();
      }
    });

    setSubscription(sub);

    return () => {
      if (sub) sub.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Centrum Powiadomień</Text>
      <Text style={styles.subHeader}>📳 Wskazówka: Potrząśnij telefonem, aby wyczyścić historię!</Text>

      {alerty.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Brak nowych powiadomień celnych.</Text>
        </View>
      ) : (
        <FlatList
          data={alerty}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.alertCard}>
              <Text style={styles.alertText}>{item.tekst}</Text>
              <Text style={styles.alertData}>{item.data}</Text>
            </View>
          )}
        />
      )}

      {alerty.length > 0 && (
        <TouchableOpacity style={styles.mockButton} onPress={wyczyscHistorie}>
          <Text style={styles.mockButtonText}>Symuluj potrząśnięcie (Dla emulatora)</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f7fb' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  header: { fontSize: 22, fontWeight: 'bold', marginTop: 20, color: '#333' },
  subHeader: { fontSize: 13, color: '#666', marginBottom: 20, fontStyle: 'italic' },
  alertCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#0052cc',
    elevation: 1,
  },
  alertText: { fontSize: 14, color: '#222', lineHeight: 20 },
  alertData: { fontSize: 11, color: '#999', marginTop: 5, textAlign: 'right' },
  emptyText: { color: '#777', fontSize: 16 },
  mockButton: {
    backgroundColor: '#e2e8f0',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  mockButtonText: { color: '#4a5568', fontSize: 13, fontWeight: '500' },
});