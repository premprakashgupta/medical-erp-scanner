import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and password required.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'scanner':'true'
        },
        body: JSON.stringify({ username, password })
      });

      const {data} = await response.json();
      console.log(data)
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        window.location.reload()
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
        alert(err)
      setError(String(err));
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
