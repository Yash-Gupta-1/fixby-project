import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert'
import { Box } from '@chakra-ui/layout'
import { Input } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from '../firebase'

const SignUpForm = () => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userConfirmPassword, setUserConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const history = useHistory();

    const signUpWithEmail = async (e) => {
        e.preventDefault();
        if (userConfirmPassword !== userPassword) {
            setError("Password do not match")
            setInterval(() => {
                setError('')
            }, 3000)
        } else {
            if (!userName) {
                return alert('Please enter a Fullname');
            }

            await auth.createUserWithEmailAndPassword(userEmail, userPassword)
                .then((userAuth) => {
                    userAuth.user.updateProfile({
                        displayName: userName,
                    })
                        .then(() => {
                            auth.currentUser.sendEmailVerification().then(function () {
                                history.push('/emailvarification')
                            }).catch(function (error) {
                                console.log('email error is : ', error);
                            });
                        })
                }).catch(error => alert(error))
            // await auth.createUserWithEmailAndPassword(userEmail, userPassword)
            //     .then((user) => {
            //         console.log('user login page', user);
            //         auth.currentUser.sendEmailVerification().then(function () {
            //             console.log('email sent to ', user);
            //             history.push('/emailvarification')
            //         }).catch(function (error) {
            //             console.log('email error is : ', error);
            //         });

            //     }).catch((err) => {
            //         console.log('error is : ', err);
            //     })
        }
    }

    return (
        <div>
            {error && <Alert status="error">
                <AlertIcon />
                <Box flex="1">
                    <AlertTitle>Failed!</AlertTitle>
                    <AlertDescription display="block">
                        {error}
                    </AlertDescription>
                </Box>
            </Alert>}
            <form className="p3" onSubmit={signUpWithEmail} >
                <div className="loginWithEmail">
                    <Input value={userName} onChange={(e) => setUserName(e.target.value)} className="mt2" variant="filled" name="userName" type="name" placeholder="Type your Name" required style={{ width: "100%" }} />

                    <Input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="mt2" variant="filled" name="userEmail" type="email" placeholder="Type your Email" required style={{ width: "100%" }} />

                    <Input value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="mt2" variant="filled" name="userPassword" type="password" placeholder="Type your password" required style={{ width: "100%" }} />

                    <Input value={userConfirmPassword} onChange={(e) => setUserConfirmPassword(e.target.value)} className="mt2" variant="filled" name="userPassword" type="password" placeholder="Confirm your password" required style={{ width: "100%" }} />

                </div>

                <button
                    disabled={!loading}
                    className="btnOutline mt4" type="submit" style={{ width: "100%", fontSize: "1.1rem" }}  >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm
