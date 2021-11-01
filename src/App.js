import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch, HashRouter } from 'react-router-dom';
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
import PropagateLoader from "react-spinners/PropagateLoader";
import SingleProperty from './Components/SingleProperty';
import UserProfile from './Pages/UserProfile';
import Login from './Components/Login';
import SingleOwner from './Pages/SingleOwner';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndCondition from './Pages/TermsAndCondition';
import BottomTabs from './Components/BottomTabs';

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
    }, 1000)
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
              <PropagateLoader color={"#302b63"} loading={loading} css={override} size={25} />
            </div>
          ) :
            <HashRouter>
              <div className="app">
                <Header />
                <ScrollToTop />
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>

                  <Route path="/buy-or-rentproperty">
                    <BuyProperty />
                  </Route>

                  <Route path="/ourteam">
                    <OurTeam />
                  </Route>

                  <Route path="/contact">
                    <Contact />
                  </Route>

                  <Route path="/myaccount">
                    <MyAccount />
                  </Route>

                  <Route path="/sell-or-rentproperty">
                    <Sell />
                  </Route>

                  <Route path="/emailvarification">
                    <EmailVerify />
                  </Route>

                  <Route path="/userprofile">
                    <UserProfile />
                  </Route>

                  <Route path="/login">
                    <Login />
                  </Route>

                  <Route path="/privacypolicy">
                    <PrivacyPolicy />
                  </Route>

                  <Route path="/termsandcondition">
                    <TermsAndCondition />
                  </Route>

                  <div>
                    <Route path="/:currentuserid">
                      <SingleOwner />
                    </Route>

                    <Route path="/:id">
                      <SingleProperty />
                    </Route>
                  </div>
                </Switch>
                <BottomTabs />
              </div>
            </HashRouter>
        }
      </ColorModeProvider>
    </ThemeProvider >
  );
}

export default App;
