import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='landing' element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path='home' element={<Home />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
