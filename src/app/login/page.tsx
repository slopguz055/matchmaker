'use client'; // Necesario porque usamos hooks

export default function LoginPage() {
  const handleLogin = () => {
    // Redirigir directamente al endpoint de Steam en tu backend
    window.location.href = 'http://localhost:8080/auth/steam/login';
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh'
    }}>
      <h1>Iniciar sesión con Steam</h1>
      <button onClick={handleLogin} style={{ cursor: 'pointer' }}>
        <img 
          src="https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_01.png" 
          alt="Login con Steam" 
          width={180}
        />
      </button>
    </div>
  );
}