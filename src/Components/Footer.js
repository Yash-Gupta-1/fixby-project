import React, { useEffect } from 'react';
import './Footer.css';
import '../Utility.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
import { Heading } from '@chakra-ui/layout';

const Footer = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    return (
        <div className="footer mt5" data-aos="fade-up">
            <div className="footerTop">
                <div className="footerTop_up">
                    <NavLink to="/">
                        <b>
                            <Heading as="h1" fontWeight="semibold"><em>fixxcap</em></Heading>
                        </b>
                    </NavLink>
                </div>

                <div className="footerTop_down">
                    <div className="footerTop_middle center">
                        <h1 className="h1 p1">About The fixxcap</h1>
                        <p>fixxcap : Deal in Properties</p>

                        <p>
                            E-180, <br />
                            Bharat Vihar Road, Uttam Nagar, <br />
                            New Delhi - 110059
                        </p>
                    </div>
                </div>
            </div>

            <div className="footerBottom center p2">
                <p >©fixxcap. All Rights Reserved <br />
                    Developed and Managed By Yash Gupta</p>
            </div>
        </div>
    )
}

export default Footer
