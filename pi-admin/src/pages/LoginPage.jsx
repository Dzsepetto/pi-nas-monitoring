import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../api/authApi'
import { useAuth } from '../hooks/useAuth'
import './style/loginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleLogin(e) {
    e.preventDefault()

    try {
      setLoginLoading(true)
      setError(null)

      const data = await loginRequest(username)

      login(data.token)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoginLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Pi Admin</h1>
        <p>Jelentkezz be a Raspberry Pi admin felülethez.</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            placeholder="Felhasználónév"
            onChange={(e) => setUsername(e.target.value)}
          />

          <button disabled={loginLoading || !username.trim()}>
            {loginLoading ? 'Belépés...' : 'Belépés'}
          </button>
        </form>

        {error && <div className="login-error">{error}</div>}
      </section>
    </main>
  )
}

export default LoginPage