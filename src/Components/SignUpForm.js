import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert'
import { Box } from '@chakra-ui/layout'
import { Input } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from '../firebase'
import { useForm } from "react-hook-form";


const SignUpForm = () => {
    const [userPassword, setUserPassword] = useState('')
    const [userConfirmPassword, setUserConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading] = useState(true)
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const signUpWithEmail = async (data) => {
        if (userConfirmPassword !== userPassword) {
            setError("Password didn't match")
            setInterval(() => {
                setError('')
            }, 3000)
        } else {
            if (!data.userName) {
                return alert('Please enter a Fullname');
            }
            await auth.createUserWithEmailAndPassword(data.userEmail, userPassword)
                .then((userAuth) => {
                    userAuth.user.updateProfile({
                        displayName: data.userName,
                    })
                        .then(() => {
                            auth.currentUser.sendEmailVerification().then(function () {
                                history.push('/emailvarification')
                            }).catch(function (error) {
                                console.log('email error is : ', error);
                            });
                        })
                }).catch(error => alert(error))

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
            <form className="p3" onSubmit={handleSubmit(signUpWithEmail)} >
                <div className="loginWithEmail">
                    <Input {...register("userName", { required: "Please enter your name" })} className="mt2" variant="filled" name="userName" type="name" placeholder="Type your Name" style={{ width: "100%" }} required />
                    <p style={{ color: "red" }}>{errors.userName?.message}</p>

                    <Input {...register("userEmail", {
                        required: true, pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })} className="mt2" variant="filled" name="userEmail" type="email" placeholder="Type your Email" style={{ width: "100%" }} />
                    <p style={{ color: "red" }}>{errors.userEmail?.message}</p>


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
