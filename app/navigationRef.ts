// navigationRef.ts
import { createNavigationContainerRef } from '@react-navigation/native';

// Optional: strongly type your route names
export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  ReturningUserSignIn: { phoneNumber: string };
  // Add other routes here
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    console.warn('[navigationRef] Navigation not ready, cannot navigate to:', name);
  }
}
