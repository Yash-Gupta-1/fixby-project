import React, { useState } from 'react';
import './Login.css';
import { Input } from '@material-ui/core';
import { auth, provider, facebookProvider } from '../firebase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Box, Heading } from '@chakra-ui/layout';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';

const Login = () => {
    const [emailClicked, setEmailClicked] = useState(false);
    const [signupClicked, setSignupClicked] = useState(false);
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userResetPassword, setUserResetPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [forgotPassword, setForgotPassword] = useState(false)

    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch((error) => alert(error.message))
    }

    const facebookSignIn = () => {
        auth.signInWithPopup(facebookProvider)
            .then((result) => {
                console.log('facebook result is : ', result);
            })
            .catch((error) => {
                alert(error.message)
            });
    }

    const signInWithEmail = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(userEmail, userPassword).then((user) => {
            console.log('user login page', user);
        }).catch((err) => {
            console.log('error is : ', err);
            setError('')
            setError('Invalid password or email')
            setInterval(() => {
                setError('')
            }, 3000)
        })
    }

    const resetPassword = (e) => {
        e.preventDefault();
        auth.sendPasswordResetEmail(userEmail)
            .then((user) => {
                setMessage('')
                setMessage("Check your inbox for reset password")
                setInterval(() => {
                    setMessage('')
                }, 4000)

            }).catch((err) => {
                alert(err.message)
            })
    }

    return (
        <div className="login">
            {
                emailClicked && (
                    signupClicked ? (
                        <div className="loginBack" onClick={() => setSignupClicked(false)}><ArrowBackIcon fontSize="large" /></div>

                    ) : (
                        forgotPassword ? (
                            <div className="loginBack" onClick={() => setForgotPassword(false)}><ArrowBackIcon fontSize="large" /></div>

                        ) : (
                            <div className="loginBack" onClick={() => setEmailClicked(false)}><ArrowBackIcon fontSize="large" /></div>

                        )
                    )
                )
            }
            <div className="loginTop">
                <img src="/images/login.png" alt="logo" />
            </div>
            <div className="loginBottom p3">
                <button onClick={() => setEmailClicked(true)} className={emailClicked ? "btnOutline mt4 hide" : "btnOutline mt4"} type="submit" style={{ width: "100%", fontSize: "1.1rem" }}>Continue with Email</button>

                {
                    emailClicked ? (
                        signupClicked ? (
                            <>
                                {error && <Alert status="error">
                                    <AlertIcon />
                                    <Box flex="1">
                                        <AlertTitle>Failed!</AlertTitle>
                                        <AlertDescription display="block">
                                            {error}
                                        </AlertDescription>
                                    </Box>
                                </Alert>}


                                <SignUpForm />

                                <Heading as="h6" size="xs" className="center colorTextOne" mb="6">Already have an account ?<span onClick={() => setSignupClicked(false)} className="emailSignUp"> Login</span> </Heading>
                            </>
                        ) : (
                            forgotPassword ?
                                (
                                    <>
                                        {
                                            message && <Alert status="success">
                                                <AlertIcon />
                                                <Box flex="1">
                                                    <AlertTitle>Success ✔!</AlertTitle>
                                                    <AlertDescription display="block">
                                                        {message}
                                                    </AlertDescription>
                                                </Box>
                                            </Alert>
                                        }
                                        <form className="p3" onSubmit={resetPassword}>
                                            <div className="loginWithEmail">
                                                <Input value={userResetPassword} onChange={(e) => setUserResetPassword(e.target.value)} className="mt2" variant="filled" name="userEmail" type="email" placeholder="Type your Email" required style={{ width: "100%" }} />
                                            </div>

                                            <button className="btnOutline mt4" type="submit" style={{ width: "100%", fontSize: "1.1rem" }} >Reset Password</button>
                                        </form>
                                    </>
                                ) :
                                (
                                    <>
                                        {error && <Alert status="error">
                                            <AlertIcon />
                                            <Box flex="1">
                                                <AlertTitle>Failed!</AlertTitle>
                                                <AlertDescription display="block">
                                                    {error}
                                                </AlertDescription>
                                            </Box>
                                        </Alert>}
                                        <form className="p3">
                                            <div className="loginWithEmail">
                                                <Input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="mt2" variant="filled" name="userEmail" type="email" placeholder="Type your Email" required style={{ width: "100%" }} />

                                                <Input value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="mt2" variant="filled" name="userPassword" type="password" placeholder="Type your password" required style={{ width: "100%" }} />
                                            </div>

                                            <button className="btnOutline mt4" type="submit" style={{ width: "100%", fontSize: "1.1rem" }} onClick={signInWithEmail}>Sign In</button>

                                        </form>

                                        <div className="forgotPassword mb2 center link" onClick={() => setForgotPassword(true)}>
                                            <Link to='#'>Forgot Password ?</Link>
                                        </div>

                                        <Heading as="h6" size="xs" mt="2" className={signupClicked ? "center colorTextOne hide" : "center colorTextOne"}>Not registered yet ? <span onClick={() => setSignupClicked(true)} className="emailSignUp">Sign Up</span> </Heading>
                                    </>
                                )
                        )

                    ) : (
                        <>
                            <div className="loginConnect mt4"></div>

                            <div className="loginButtons">
                                <button onClick={facebookSignIn}>
                                    <img src="/images/facebook.png" alt="facebook-login" />
                                </button>
                                <button onClick={signIn}>
                                    <img src="/images/search.png" alt="google-login" />
                                </button>
                            </div>
                        </>
                    )
                }


            </div>

        </div >
    )
}

export default Login
