import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { API_URL } from '../../constants/Config';

export default function PlatnosciScreen() {
  const [platnosci, setPlatnosci] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlatnosci = () => {
    fetch(`${API_URL}/Platnosci`)
      .then((res) => res.json())
      .then((json) => {
        setPlatnosci(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPlatnosci();
  }, []);

  const handlePay = (item: any) => {
    const zaktualizowanaPlatnosc = {
      ...item,
      status: 'oplacona' 
    };

    fetch(`${API_URL}/Platnosci/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(zaktualizowanaPlatnosc)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Błąd aktualizacji');
        return res.json();
      })
      .then(() => {
        Alert.alert('Sukces', `Opłata za "${item.tytul}" została zaksięgowana.`);
        fetchPlatnosci(); 
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Błąd', 'Nie udało się przetworzyć płatności.');
      });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0052cc" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Opłaty i Mandaty Celne</Text>
      
      <FlatList
        data={platnosci}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.title}>{item.tytul}</Text>
              <Text style={styles.amount}>Kwota: {item.naleznosc} PLN</Text>
              <Text style={[
                styles.status, 
                { color: item.status === 'oplacona' ? '#2e7d32' : '#c62828' }
              ]}>
                Status: {item.status}
              </Text>
            </View>

            {item.status !== 'oplacona' && (
              <TouchableOpacity 
                style={styles.payButton} 
                onPress={() => handlePay(item)}
              >
                <Text style={styles.payButtonText}>Opłać</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f7fb' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 20, color: '#333' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  title: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  amount: { fontSize: 14, color: '#555', marginVertical: 3 },
  status: { fontSize: 13, fontWeight: '500' },
  payButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  payButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});