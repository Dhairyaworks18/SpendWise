import { Tabs } from "expo-router";
import { CustomTabs } from "../../components";

export default function _layout() {
  return (
    <Tabs tabBar={CustomTabs} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="Statistics" />
      <Tabs.Screen name="Wallet" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}
