import { useState } from 'react';
import { useExpenseStore } from '../store/useExpenseStore';

const AuthForm = () => {
  const { login, register } = useExpenseStore();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    if (isLogin) {
      const success = login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } else {
      const success = register(username, password);
      if (!success) {
        setError('Username already exists');
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => { setError(''); setIsLogin(!isLogin); }}>
        {isLogin ? 'Create an account' : 'Have an account? Login'}
      </button>
    </div>
  );
};

export default AuthForm;
