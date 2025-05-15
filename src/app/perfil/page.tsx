'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Usuario {
  steamId: string;
  name: string;
  profileUrl: string;
  // Añade aquí otros campos que devuelva tu DTO
}

export default function PerfilPage() {
  const searchParams = useSearchParams();
  const steamId = searchParams.get('id');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!steamId) {
      setCargando(false);
      return;
    }

    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/mongo/${steamId}`);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setUsuario(data);
      } catch (err) {
        console.error('Error cargando usuario:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setCargando(false);
      }
    };

    fetchUsuario();
  }, [steamId]);

  if (!steamId) return <p>No se ha proporcionado un Steam ID.</p>;
  if (cargando) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!usuario) return <p>No se encontró el usuario.</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Perfil de {usuario.name}</h1>
      <div className="space-y-2">
        <p><span className="font-semibold">Steam ID:</span> {usuario.steamId}</p>
        <p>
          <span className="font-semibold">URL Steam:</span> 
          <a href={usuario.profileUrl} target="_blank" rel="noopener noreferrer"
             className="text-blue-600 hover:underline ml-2">
            {usuario.profileUrl}
          </a>
        </p>
        {/* Añade más campos según tu DTO */}
      </div>
    </div>
  );
}