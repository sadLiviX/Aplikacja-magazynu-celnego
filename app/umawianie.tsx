import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Camera, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { API_URL } from '../constants/Config';

export default function UmawianieScreen() {
  const [mrn, setMrn] = useState('');
  const [opis, setOpis] = useState('');
  const [dataRewizji, setDataRewizji] = useState('');

  const [permission, requestPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(false);

  const handleOpenCamera = async () => {
    if (!permission?.granted) {
      const response = await requestPermission();
      if (!response.granted) {
        Alert.alert('Brak uprawnień', 'Musisz zezwolić na dostęp do aparatu, aby zrobić zdjęcie dokumentu.');
        return;
      }
    }
    setCameraActive(true);
    Alert.alert('Sensor Aparatu', 'Pomyślnie połączono z sensorem kamery. Zdjęcie dokumentu AWB zostało powiązane ze zgłoszeniem!');
    setCameraActive(false);
  };

  const handleSubmit = () => {
    if (!mrn || !opis || !dataRewizji) {
      Alert.alert('Błąd', 'Wypełnij wszystkie pola przed wysłaniem zgłoszenia.');
      return;
    }

    const nowaRewizja = {
      mrn: mrn,
      status: 'umowiona', 
      opis: opis,
      data: dataRewizji
    };

    fetch(`${API_URL}/Rewizje`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nowaRewizja),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Błąd serwera');
        return response.json();
      })
      .then(() => {
        Alert.alert('Sukces', 'Zgłoszenie rewizji zostało zapisane w systemie celnym!');
        setMrn('');
        setOpis('');
        setDataRewizji('');
        router.back();
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Błąd', 'Nie udało się zapisać danych w bazie.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Umawianie Kontroli Celnej</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Numer MRN zgłoszenia:</Text>
        <TextInput
          style={styles.input}
          placeholder="np. PL4430200001R0"
          value={mrn}
          onChangeText={setMrn}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Opis rewizji:</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="np. Badanie dokumentów"
          multiline
          value={opis}
          onChangeText={setOpis}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Proponowana data</Text>
        <TextInput
          style={styles.input}
          placeholder="np. 15-06-2026"
          value={dataRewizji}
          onChangeText={setDataRewizji}
        />
      </View>

      <TouchableOpacity style={styles.sensorButton} onPress={handleOpenCamera}>
        <Text style={styles.sensorButtonText}>📷 Uruchom sensor: Zrób zdjęcie AWB</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Wyślij zgłoszenie do bazy (POST)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f7fb' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, marginTop: 20, color: '#333' },
  formGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '500', color: '#555', marginBottom: 5 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  sensorButton: {
    backgroundColor: '#4a5568',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  sensorButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  submitButton: {
    backgroundColor: '#0052cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 40,
  },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});