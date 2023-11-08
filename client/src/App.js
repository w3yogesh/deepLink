import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";
import Profile from "./pages/Profile"

import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={< Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<UserDetails/>}/>

      </Routes>
    </div>
  );
}

export default App;
