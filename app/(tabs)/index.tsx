import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../../constants/Config';

export default function DashboardScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/Dashboard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Błąd pobierania danych');
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Nie udało się połączyć z serwerem celnym.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0052cc" />
        <Text style={{ marginTop: 10 }}>Pobieranie danych z bazy...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>System Magazynu Celnego</Text>
    <View style={styles.Boxes}>
        <TouchableOpacity 
  style={styles.boxRevisions} 
  onPress={() => router.push('/rewizje')}
>
  <Text> Aktywne rewizje: {data.aktywneRewizje}</Text>
</TouchableOpacity>

        <View style={styles.boxGoods}>
          <Text> Numery AWB na magazynie: {data.towar}</Text>
        </View>
    </View>

    {data.powiadomienieOMandacie && (
  <TouchableOpacity 
    style={[styles.alertBox, { padding: 15, borderRadius: 10, marginTop: 15 }]} 
    onPress={() => router.push('/platnosci')}
  >
    <Text style={styles.alertText}>⚠️ UWAGA: Masz nieopłacone mandaty celne! Kliknij, aby opłacić.</Text>
  </TouchableOpacity>
)}
    

    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fb', 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  Boxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ff00ff', // tymczasowy kolor
  },
  boxRevisions: {
    flex: 1,
    margin: 5,
    backgroundColor: '#00ff00',
    },
  boxGoods: {
    flex: 1,
    margin: 5,
    backgroundColor: '#00ff00',  
    },
  alertBox: {
    backgroundColor: 'red'
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
}});