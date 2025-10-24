import { useEffect, useState } from 'react';
import api from '@/lib/api';

export function useBackend() {
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    // Test backend connection
    fetch('http://localhost:8000')
      .then(() => setIsBackendConnected(true))
      .catch(() => setIsBackendConnected(false));
  }, []);

  return { api, isBackendConnected };
}
