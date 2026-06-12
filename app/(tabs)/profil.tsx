// Podmień zawartość pliku na:
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../constants/Config';

export default function ProfilScreen() {
    const [profil, setProfil] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/Profil`)
            .then((res) => res.json())
            .then((json) => {
                setProfil(json);
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
            {/* SEKCJA PAPORTU / HEADER */}
            <View style={styles.headerCard}>
                <View style={styles.avatarCircle}>
                    <Ionicons name="business" size={40} color="#fff" />
                </View>
                <Text style={styles.agencyName}>{profil["nazwa agencji"]}</Text>
                <Text style={styles.subBadge}>Koncesjonowana Agencja Celna</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7fafc', padding: 20, alignItems: 'center' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7fafc' },
    headerCard: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
    avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0052cc', justifyContent: 'center', alignItems: 'center', elevation: 3, marginBottom: 12 },
    agencyName: { fontSize: 20, fontWeight: 'bold', color: '#1a202c', textAlign: 'center', paddingHorizontal: 10 },
    subBadge: { fontSize: 12, color: '#4a5568', fontWeight: '500', marginTop: 4, backgroundColor: '#edf2f7', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
});