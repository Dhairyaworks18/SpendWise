import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: "modal" }}>
      <Stack.Screen name="ProfileModal" />
      <Stack.Screen name="WalletModal" />
      <Stack.Screen name="TransactionModal" />
      <Stack.Screen name="SearchModal" />
    </Stack>
  );
}
