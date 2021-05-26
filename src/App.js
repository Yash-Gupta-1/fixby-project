import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, theme, ColorModeProvider, CSSReset } from "@chakra-ui/react"
import Home from './Home';
import Header from './Components/Header';
import OurTeam from './Pages/OurTeam';
import BuyProperty from './Pages/BuyProperty';
import Sell from './Pages/Sell';
import ScrollToTop from './Components/ScrollToTop';
import Contact from './Pages/Contact';
import { useDispatch } from 'react-redux';
import { logins, logout } from './features/userSlice';
import { auth } from './firebase';
import MyAccount from './Pages/MyAccount';
import EmailVerify from './Pages/EmailVerify';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import SingleProperty from './Components/SingleProperty';
import UserProfile from './Pages/UserProfile';
import Login from './Components/Login';

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('user is ', authUser);
      if (authUser) {
        dispatch(logins({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const override = css`
  display: block;
  margin: 0 auto;
`;


  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider options={{
        useSystsemColorMode: true
      }}>
        <CSSReset />
        {
          loading ? (
            <div className="loading rawDis" style={{ height: "100vh" }}>
              <ClipLoader color={"#302b63"} loading={loading} css={override} size={40} />
            </div>
          ) :
            <BrowserRouter>
              <Header />
              <ScrollToTop />
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/navbar">
                  <Header />
                </Route>
                <Route component={BuyProperty} path="/buy-or-rentproperty" />
                <Route component={OurTeam} path="/ourteam" />
                <Route component={Contact} path="/contact" />
                <Route path="/myaccount">
                  <MyAccount />
                </Route>
                <Route component={Sell} path="/sell-or-rentproperty" />
                <Route component={EmailVerify} path="/emailvarification" />
                <Route path="/property/:id">
                  <SingleProperty />
                </Route>
                <Route component={Login} path="/login" />
                <Route component={UserProfile} path="/fixxcapuserprofile" />
              </Switch>
            </BrowserRouter>
        }
      </ColorModeProvider>
    </ThemeProvider >
  );
}

export default App;
