import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../constants/Config';

export default function ProfilScreen() {
  const [profil, setProfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0052cc" />
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Text>Ekran Profilu Agencji</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7fafc' },
});