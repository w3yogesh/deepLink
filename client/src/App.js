import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";
import Profile from "./pages/Profile"

import MyProfile from "./pages/MyProfile";
import Feed from "./pages/Feed";

import MyNetwork from "./pages/MyNetwork";
import Chat from "./pages/Chat";
import UserProfileView from './pages/UserProfileView';
import CompanyForm from './pages/CompanyForm';

import CompanyList from './pages/CompanyList';
import MyCompany from './pages/MyCompany';
import Company from './pages/Company';
import AllJobs from "./pages/AllJobs";
import MyCompaniesList from "./pages/MyCompaniesList";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={< Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myprofile" element={<MyProfile/>}/>

        <Route path="/mynetwork" element={<MyNetwork/>}/>

        <Route path="/feed" element={<Feed />} />
        <Route path="/chat" element={<Chat />} />


        <Route path="/userprofileview/:userId" element={<UserProfileView/>}/>

        <Route path="/company" element={<CompanyForm/>}/>
        <Route path="/companylist" element={<CompanyList/>}/>
        <Route path="/mycompany/:companyId" element={<MyCompany/>}/>
        <Route path="/company/:companyId" element={<Company/>}/>
        <Route path="/jobs" element={<AllJobs/>}/>

        <Route path="/mycompanies" element={<MyCompaniesList/>}/>
  
      </Routes>
    </div>
  );
}

export default App;
