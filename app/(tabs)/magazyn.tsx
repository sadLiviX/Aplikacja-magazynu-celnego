import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../../constants/Config';

export default function MagazynScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/Towary`)
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
    <View style={styles.container}>
      <Text style={styles.header}>Aktualny Stan Magazynowy</Text>
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.goodsCard}
            onPress={() => router.push(`/towar/${item.id}`)}
          >
            <Text style={styles.awbText}>AWB: {item.numer_AWB}</Text>
            <Text style={styles.titleText}>{item.nazwa || item["nazwa towaru"]}</Text>
            <Text style={styles.statusText}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f7fb' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, marginTop: 40 },
  goodsCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  awbText: { fontWeight: 'bold', color: '#0052cc', fontSize: 14 },
  titleText: { fontSize: 16, marginVertical: 4, color: '#333' },
  statusText: { color: '#666', fontSize: 13 },
});