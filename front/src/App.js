import "./App.css"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/pages/Login";
import Register from "./components/pages/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import RestrictedRoute from "./RestrictedRoute";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "./components/pages/pages/ErrorPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route element={<RestrictedRoute />}>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path='*' element={<ErrorPage />} />
          </Route>
          <Route element={<ProtectedRoute/>}>
             <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;





