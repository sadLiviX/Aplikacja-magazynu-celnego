import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { API_URL } from '../../constants/Config';

export default function SzczegolyTowaruScreen() {
  const { id } = useLocalSearchParams();
  
  const [towar, setTowar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/Towary/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setTowar(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0052cc" />
      </View>
    );
  }

  if (!towar) {
    return (
      <View style={styles.center}>
        <Text>Nie znaleziono towaru o podanym ID.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Karta Przesyłki</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Numer AWB / ID:</Text>
        <Text style={styles.value}>{towar.id}</Text>

        <Text style={styles.label}>Nazwa towaru:</Text>
        <Text style={styles.value}>{towar.nazwa || towar["nazwa towaru"]}</Text>

        <Text style={styles.label}>Opis zawartości:</Text>
        <Text style={styles.value}>{towar.opis}</Text>

        <Text style={styles.label}>Waga brutto:</Text>
        <Text style={styles.value}>{towar.waga}</Text>

        <Text style={styles.label}>Status celny:</Text>
        <Text style={styles.value}>{towar.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f7fb' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 3 },
  label: { fontSize: 12, color: '#777', marginTop: 10 },
  value: { fontSize: 16, fontWeight: '500', color: '#111', marginBottom: 5 },
});