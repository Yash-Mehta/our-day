import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';

export default function ProfileScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.center}>
        <Text style={styles.label}>Profile — coming soon</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 16, color: theme.colors.ink3, fontFamily: theme.fonts.sans },
});
