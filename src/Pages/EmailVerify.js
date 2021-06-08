import React from 'react';
import { Heading } from '@chakra-ui/layout'
import './EmailVerify.css';
import { NavLink } from 'react-router-dom';


const EmailVerify = () => {
    return (
        <div className="email p2">
            <div className="box mt3">
                <Heading as="h1" size="lg" className="rawDis center"> Please verify your email we just sent to you a verification link <br /> it should be reach in a few seconds </Heading>

                <NavLink to="/" className="link btnOutline mt5">Go to Home</NavLink>

            </div>
        </div>
    )
}

export default EmailVerify
