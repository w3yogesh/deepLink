import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";
import Profile from "./pages/Profile"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={< Profile />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </div>
  );
}

export default App;
