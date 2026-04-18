import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppLayout from "./components/Global/AppLayout";
import { AppProvider } from "./contexts/AppContext";
import SigninPage from "./pages/Auth/Signin";
import SignupPage from "./pages/Auth/Signup";
import Courses from "./pages/Dashboard/Courses";
import Dashboard from "./pages/Dashboard/Dashboard";
import CourseDetails from "./pages/Dashboard/DashboardDetails/CoursesDetail";
import File from "./pages/Dashboard/File";
import Message from "./pages/Dashboard/Message";
import { SettingsPage } from "./pages/Dashboard/Settings";
import LandingPage from "./pages/Landingpage/LandingPage";
import Community from "./pages/Dashboard/Community";
import { CommunityProvider } from "./contexts/CommunityContext";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SignupSuccess from "./pages/Auth/SignupSuccess";
import ProtectedRoute from "./components/Global/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 2 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} /> {/* FIX */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='/courses' element={<Courses />} />
              <Route
                path='/community'
                element={
                  <CommunityProvider>
                    <Community />
                  </CommunityProvider>
                }
              />
              <Route path='/courses/:id' element={<CourseDetails />} />
              {/* <Route path="/tasks" element={<Tasks />} /> */}
              <Route path='/message' element={<Message />} />
              <Route path='/file' element={<File />} />
              <Route path='/settings' element={<SettingsPage />} />
            </Route>
            <Route path='signin' element={<SigninPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='signup/success' element={<SignupSuccess />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <ToastContainer
          position='top-center'
          autoClose={3000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
