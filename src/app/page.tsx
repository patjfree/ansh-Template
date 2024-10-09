import { AuthProvider } from '../lib/contexts/AuthContext';
import { DeepgramContextProvider } from '../lib/contexts/DeepgramContext';
import HomeScreen from '../components/HomeScreen';

export default function Home() {
  return (
    <AuthProvider>
      <DeepgramContextProvider>
        <main className="flex min-h-screen flex-col items-center justify-between p-8">
          <HomeScreen />
        </main>
      </DeepgramContextProvider>
    </AuthProvider>
  );
}
