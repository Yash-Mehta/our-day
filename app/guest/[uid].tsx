import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';

export default function GuestProfileScreen() {
  const { uid } = useLocalSearchParams<{ uid: string }>();
  return (
    <ScreenWrapper>
      <View style={styles.center}>
        <Text style={styles.label}>Guest profile — coming soon</Text>
        <Text style={styles.uid}>{uid}</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  label: { fontSize: 16, color: theme.colors.ink3, fontFamily: theme.fonts.sans },
  uid: { fontSize: 12, color: theme.colors.ink4, marginTop: 8, fontFamily: theme.fonts.sans },
});
