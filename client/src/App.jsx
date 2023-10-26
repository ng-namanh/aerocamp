import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<Layout />}>
        <Route path='/home' element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
