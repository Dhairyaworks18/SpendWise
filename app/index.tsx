import { Redirect } from "expo-router";

// This acts as the entry. The AuthProvider in _layout.tsx
// will call router.replace() once auth state is resolved,
// so this redirect just picks the guest default.
export default function Index() {
  return <Redirect href="/(auth)/Welcome" />;
}
