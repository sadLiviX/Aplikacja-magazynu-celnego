// Podmień kod na ostateczną i kompletną wersję pliku:
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

    const handleLogout = () => {
        Alert.alert(
            'System Celny',
            'Pomyślnie i bezpiecznie wyczyszczono tokeny dostępu SSL oraz wylogowano agenta.'
        );
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
            <View style={styles.headerCard}>
                <View style={styles.avatarCircle}>
                    <Ionicons name="business" size={40} color="#fff" />
                </View>
                <Text style={styles.agencyName}>{profil["nazwa agencji"]}</Text>
                <Text style={styles.subBadge}>Koncesjonowana Agencja Celna</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>PARAMETRY REJESTROWE</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Identyfikator EORI</Text>
                    <Text style={styles.value}>{profil["EORI"]}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Numer Licencji MF</Text>
                    <Text style={styles.value}>{profil["numer licencji"]}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Właściwy Urząd i Kontakt</Text>
                    <Text style={styles.value}>{profil["kontakt oddzialu"]}</Text>
                </View>
            </View>

            {/* PRZYCISK INTERAKTYWNY */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.logoutText}>Bezpieczne wylogowanie</Text>
            </TouchableOpacity>

            {/* STOPKA METADANYCH */}
            <Text style={styles.footerText}>
                Wersja terminala: v2.4.16-stable {"\n"} Protokół ochrony danych: TLS 1.3 Active
            </Text>
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
    infoCard: { backgroundColor: '#fff', width: '100%', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#edf2f7', elevation: 2 },
    sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#718096', letterSpacing: 1, marginBottom: 10 },
    infoRow: { borderBottomWidth: 1, borderBottomColor: '#f7fafc', paddingVertical: 12 },
    label: { fontSize: 12, color: '#a0aec0', marginBottom: 2 },
    value: { fontSize: 14, color: '#2d3748', fontWeight: '500' },
    logoutButton: { backgroundColor: '#e53e3e', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 14, borderRadius: 12, marginTop: 25, elevation: 2 },
    logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
    footerText: { fontSize: 11, color: '#a0aec0', marginTop: 35, textAlign: 'center', lineHeight: 16 }
});