import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { API_URL } from '../constants/Config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

export default function RevisionScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/Rewizje`)
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

const getStatusStyle = (status: string): any => {
  switch (status) {
    case 'zakonczona':
      return { color: '#2e7d32', fontWeight: 'bold' }; 
    case 'w trakcie':
      return { color: '#ef6c00', fontWeight: 'bold' }; 
    case 'umowiona':
      return { color: '#0052cc', fontWeight: 'bold' }; 
    default:
      return { color: '#666' };
  }
};

return(
  <>
<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.revisionCard}>
      <Text style={{ fontWeight: 'bold' }}>MRN: {item.mrn}</Text>
      <Text>Status: <Text style={getStatusStyle(item.status)}>{item.status}</Text></Text>
      <Text>Opis: {item.opis}</Text>
      <Text>Data rewizji: {item.data} </Text>
    </View>
  )}
/>

  <TouchableOpacity style={{
    backgroundColor: '#0052cc',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center'
  }}
  onPress={() => router.push('/umawianie')}>
    <Text style={{color: '#fff', fontWeight: 'bold'}}> Umów nowa rewizję </Text>
</TouchableOpacity>
</>
);

}
const styles = StyleSheet.create({
center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
revisionCard: {
  backgroundColor: '#fff',
  padding: 15,
  marginBottom: 10,  
  borderRadius: 8,   
  marginHorizontal: 10, 
  marginTop: 5,
}  
});