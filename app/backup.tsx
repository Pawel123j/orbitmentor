import { useState } from "react";
import { Share, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "../src/components/Screen";
import { GradientButton } from "../src/components/GradientButton";
import { colors, spacing, typography } from "../src/constants/theme";
import { exportProgress, importProgress } from "../src/store/useAppStore";

export default function BackupScreen() {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const exportBackup = () => {
    setContent(exportProgress());
    setMessage("Backup ready. Copy all the text below to a private file, or share it. Keep it safe before replacing progress.");
  };
  const restore = async () => {
    setBusy(true);
    try {
      await importProgress(content);
      setMessage("Progress restored and saved on this device.");
    } catch {
      setMessage("Could not restore. Check the OrbitMentor backup version and contents, and available storage. Your current progress is unchanged.");
    } finally { setBusy(false); }
  };
  return (
    <Screen>
      <GradientButton label="Back to profile" onPress={() => router.replace("/profile")} variant="primary" />
      <Text style={styles.title}>Backup and restore</Text>
      <Text style={styles.copy}>Your learning progress stays on this device. This readable JSON copy includes your preferences, tasks and quiz history. It is not encrypted.</Text>
      <View style={styles.actions}>
        <GradientButton label="Create backup" onPress={exportBackup} />
        <TextInput accessibilityLabel="Backup JSON" multiline editable={!busy} value={content} onChangeText={setContent} placeholder="Create a backup or paste one here" placeholderTextColor={colors.textDim} style={styles.input} />
        <GradientButton label="Share backup text" onPress={() => { void Share.share({ message: exportProgress(), title: "OrbitMentor backup" }).catch(() => setMessage("Sharing is unavailable. Create a backup and copy its text instead.")); }} />
        <Text style={styles.copy}>Replace progress overwrites your current profile and progress. Export your current progress first. Invalid or unsupported copies are rejected before anything changes.</Text>
        <GradientButton label={busy ? "Restoring…" : "Replace progress from backup"} onPress={() => { if (!busy) void restore(); }} />
        {!!message && <Text accessibilityRole="alert" style={styles.copy}>{message}</Text>}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: typography.h1, fontWeight: "900" },
  copy: { color: colors.textMuted, fontSize: typography.body, lineHeight: 24, marginTop: spacing.md },
  actions: { gap: spacing.md, marginTop: spacing.lg },
  input: { color: colors.text, borderColor: colors.textDim, borderWidth: 1, borderRadius: 12, minHeight: 180, padding: 16, textAlignVertical: "top", fontSize: 14 }
});
