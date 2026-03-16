import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Launcher } from '../types/types';

const HomePage: React.FC = () => {
  const [launchers, setLaunchers] = useState<Launcher[]>([]);

  useEffect(() => {
    const fetchLaunchers = async () => {
      const response = await api.get('/launchers');
      setLaunchers(response.data);
    };
    fetchLaunchers();
  }, []);

  return (
    <div>
      <h1>Launchers</h1>
      <ul>
        {launchers.map((launcher) => (
          <li key={launcher.id}>{launcher.name} - {launcher.city}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;