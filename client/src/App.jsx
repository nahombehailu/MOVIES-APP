import {Route,Routes,BrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import PrivateRoute from "./pages/Auth/PrivateRoute"
import Profile from "./pages/User/Profile"
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}
