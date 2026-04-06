import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Global/AppLayout";
import LandingPage from "./pages/Landingpage/LandingPage";
import SigninPage from "./pages/Auth/Signin";
import SignupPage from "./pages/Auth/Signup";
import { AppProvider } from "./contexts/AppContext";
import Dashboard from "./pages/Dashboard/Dashboard"; 
import Message from "./pages/Dashboard/Message";
import File from "./pages/Dashboard/File";
import { SettingsPage } from "./pages/Dashboard/Settings";
import Mo from "./pages/Dashboard/Mo";

function App() {
  return (
    <AppProvider>
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<LandingPage />} />   {/* FIX */}
        <Route path='landing' element={<LandingPage />} />
  
       <Route element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="mo" element={<Mo/>} />
        {/* <Route path="/tasks" element={<Tasks />} /> */}
        <Route path="/message" element={<Message />} />
        <Route path="/file" element={<File />} /> 
        <Route path="/settings" element={<SettingsPage />} />
      </Route>


        <Route path='signin' element={<SigninPage />} />
        <Route path='signup' element={<SignupPage />} />
      </Routes>

    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
