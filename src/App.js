import React from "react";
import "./App.css";
import Home from "./components/Home";
import Details from "./components/Details";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import MovieTrailers from "./components/MovieTrailers/MovieTrailers";
import ShortFilms from "./components/ShortFilms/ShortFilms";
import Awards from "./components/Awards/Awards";
import Reviews from "./components/Reviews/Reviews";
import Contest from "./components/Contest/Contest";
import GoogleAuthCallback from "./components/GoogleAuthCallback";
import ReviewInfo from "./components/Reviews/ReviewInfo";
import Blogs from "./components/Blogs/Blogs";
import TermsAndCondition from "./components/TermsAndCondition";
import Contact from "./components/Contact";
import Model from "./components/Model/Model";
import ModelDetails from "./components/Model/ModelDetails";
import ModelForm from "./components/Model/ModelForm";
import Gallery from "./components/Gallery/Gallery";
import EditModel from "./components/Model/EditModel";
import PageNotFound from "./components/PageNotFound";
import Keywords from "./components/Keywords";
import AgentForm from "./components/Model/AgentForm";
import AgentEditModel from "./components/Model/AgentEditModel";
import AgentModelDetails from "./components/Model/AgentModelDetails";
import ShortDetails from "./components/ShortFilms/ShortDetails";
 import ShortFilmPlayer from "./components/ShortFilms/ShortFilmChecking";
 import ShortFilmUpload from "./components/ShortFilms/ShortFilmUpload";
import FilmUpload from "./components/ShortFilms/UploadForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  // const isLoginPage = location.pathname === '/login';
const user = localStorage.getItem("User");
const jwt = localStorage.getItem("JwtToken");

  // return !jwt?(
  //   <>
  //      <Header />
  //      <Routes>
  //     <Route path="/login" element={<Login />} />
  //     <Route path='/' element={<Navigate to={'/login' } />} />
  //     <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
  //   </Routes>
  //   </>
  // ):
  
  return (
    <>
      <Routes>
        {!jwt?(
          <>
          <Route path="/login" element={<Login />} />
          <Route path="/modelForm" element={<Login />} />
          <Route path="/contest" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
          <Route path="/" element={<Home />} />
          <Route path="/shortflimDetails/:id" element={<ShortDetails/>}/>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/details/movieTrailer/:id" element={<Details />} />
          <Route path="/details/review/:id" element={<Details />} />
          <Route path="/review/:id" element={<ReviewInfo />} />
          <Route path="/movieTrailer" element={<MovieTrailers />} />
          <Route path="/shortFilms" element={<ShortFilms />} />
          <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/model" element={<Model />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/model/:id" element={<ModelDetails />} />
          <Route path="/model/:id/edit" element={<EditModel />} />
        <Route path="/editAgentModel" element={<AgentEditModel />} />
          <Route path="/keywords" element={<Keywords />} />
           <Route path="/shortfilmplayer/:id" element={<ShortFilmPlayer />} />
           <Route path='/shortfilmupload' element={<ShortFilmUpload />} />
             <Route path='/shortfilmuploadForm' element={<FilmUpload />} />
          </>
        ):(
        <>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/details/movieTrailer/:id" element={<Details />} />
        <Route path="/details/review/:id" element={<Details />} />
        <Route path="/review/:id" element={<ReviewInfo />} />
        <Route path="/movieTrailer" element={<MovieTrailers />} />
        <Route path="/shortFilms" element={<ShortFilms />} />
        <Route path="/shortflimDetails/:id" element={<ShortDetails/>}/>
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/model" element={<Model />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/modelForm" element={<ModelForm />} />
        <Route path="/agentModelForm" element={<AgentForm />} />
        <Route path="/model/:id" element={<ModelDetails />} />
        <Route path="/agent-model/:id" element={<AgentModelDetails />} />
        <Route path="/model/:id/edit" element={<EditModel />} />
        <Route path="/editAgentModel" element={<AgentEditModel />} />
        <Route path="/keywords" element={<Keywords />} />
       <Route path='/shortfilmupload' element={<ShortFilmUpload />} />
  <Route path='/shortfilmuploadForm' element={<FilmUpload />} />

            <Route path="/shortfilmplayer/:id" element={<ShortFilmPlayer />} />
        </>
        )}
        
      </Routes>
    </>
  );
}

export default App;
