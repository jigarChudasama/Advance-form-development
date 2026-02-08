import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import { getCookie } from './utils/cookie'

const PrivateRoute = () => {
  const token = getCookie('token')
  return token ? <Outlet /> : <Navigate to="/sign-in" />
}

const PublicRoute = () => {
  const token = getCookie('token')
  return token ? <Navigate to="/" /> : <Outlet />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoute />} >
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoute />} >
          <Route path="/" element={<Home />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
