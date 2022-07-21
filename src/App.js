import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Breakfast from "./pages/Breakfast/Breakfast";
import Brunch from "./pages/Brunch/Brunch";
import Lunch from "./pages/Lunch/Lunch";
import Dinner from "./pages/Dinner/Dinner";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser/CreateUser";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import MyProfile from "./pages/MyProfile/MyProfile";
import AddRecipe from "./pages/AddRecipe/AddRecipe";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import { CurrentUserProvider } from "./Helpers/userContext";

function App() {
  return (
    <CurrentUserProvider>
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/breakfast" element={<Breakfast />} />
              <Route path="/brunch" element={<Brunch />} />
              <Route path="/lunch" element={<Lunch />} />
              <Route path="/dinner" element={<Dinner />} />
              <Route path="/register" element={<CreateUser />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/add" element={<AddRecipe />} />
              <Route path="/edit" element={<EditRecipe />} />
              <Route path="/myRecipes" element={<MyRecipes />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </CurrentUserProvider>
  );
}

export default App;