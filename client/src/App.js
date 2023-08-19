import React,{useEffect,createContext,useReducer,useContext} from 'react';

import Landing from "./Attendance/screens/Landing"

import Navbar from "./Attendance/components/Navbar"
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
// import Home from './components/screens/Home'
//  import Signin from './components/screens/SignIn'
import Signin from "./Attendance/screens/Signin"
// import Profile from './components/screens/Profile'
import Profile from "./Attendance/screens/Profile"
// import Signup from './components/screens/Signup2'
//import SignUp from './Attendance/screens/Signup';
import SignUp from "./Attendance/screens/Auth/Signup"
import TeacherSignUp from "./Attendance/screens/Auth/Tecah_regis"
//import CreatePost from './components/screens/CreatePost';
import AttenHome from "./Attendance/Home"
import AdminDashboard from "./Attendance/screens/Admin_dash"
import Footer from './Attendance/components/Footer/Footer'
// import SubjectDetails from './Attendance/components/SubjectData';




const Routing = ()=>{
  const history = useHistory()

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("currentUser"))
    console.log("user",user)
    if(user){
      // dispatch({type:"USER",payload:user})
    }else{
      history.push('/landing')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Landing />
      </Route>
      <Route exact path="/landing" >
      <Landing />
      </Route>
      <Route path="/adminlogin">
        <Signin />
      </Route>
      <Route path="/stulogin">
        <Signin />
      </Route>
      <Route path="/teclogin">
        <Signin />
      </Route> 
      <Route path="/login">
        <Signin />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/Tsignup">
        <TeacherSignUp />
      </Route>
      <Route path="/student/dashboard">
        <Profile />
      </Route>
      <Route path="/teacher/dashboard">
        <AttenHome />
      </Route>
      <Route path="/admin/dashboard">
        <AdminDashboard />
      </Route>
      {/* <Route path="/teacher/dashboard/subjectUpdate/subject/:id">
        <SubjectDetails />
      </Route> */}
      {/* <Route path="/result">
        <CreatePost/>
      </Route> */}
    </Switch>
  )
}
export const DarkModeContext = createContext();

// Dark mode reducer function to handle toggling the mode
const darkModeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return !state;
    default:
      return state;
  }
};

function App() {
  const [isDarkMode, dispatch] = useReducer(darkModeReducer, false);
  useEffect(() => {
    // Check the local storage for user preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    }
  }, []);

  useEffect(() => {
    // Apply the mode whenever isDarkMode changes
    const root = document.querySelector('html');
    if (isDarkMode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
    // Save the user preference in local storage
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
  
    <DarkModeContext.Provider value={{ isDarkMode, dispatch }}>
  <div className='app'>
  <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    <BrowserRouter>
      <Navbar />
      <Routing />
      <Footer/>
    </BrowserRouter>
    </div>
  </div>
  </DarkModeContext.Provider>
   
  );
}

export default App;