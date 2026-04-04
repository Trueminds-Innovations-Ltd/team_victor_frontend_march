import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./components/Global/AppLayout";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
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
        {/* <Route element={<AppLayout />}>
          <Route path='home' element={<Home />} />
          
          <Route path="dashboard" element={<Dashboard/>}/>
        </Route> */}

        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>

    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
