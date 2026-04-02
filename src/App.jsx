import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='landing' element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path='home' element={<Home />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
