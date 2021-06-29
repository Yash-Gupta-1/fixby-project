import React, { useEffect } from 'react';
import './Footer.css';
import '../Utility.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
import { Heading } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';

const Footer = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    return (
        <div className="footer mt5" data-aos="fade-up">
            <div className="footerbody">
                <div className="footerTop">
                    <div className="footerTop_up">
                        <NavLink to="/">
                            <b>
                                <Heading as="h1" fontWeight="semibold"><em>FixBuy</em></Heading>
                            </b>
                        </NavLink>
                    </div>

                    <div className="footerTop_down">
                        <div className="footerTop_middle center">
                            <h1 className="h1 p1">About FixBuy</h1>
                            <p>FixBuy : Deal in Properties</p>

                            <p>
                                E-180, <br />
                                Bharat Vihar Road, Uttam Nagar, <br />
                                New Delhi - 110059
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footerRight">
                    <div className="footerRightHeader">
                        <Heading className="center" fontSize="2xl">All our Partners</Heading>
                    </div>
                    <div className="footerRightBody">
                        <Avatar marginRight="5" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <div className="footerRightContent">
                            <Heading fontSize="lg" color>Name</Heading>
                            <p>Details</p>
                        </div>
                    </div>
                    <div className="footerRightBody">
                        <Avatar marginRight="5" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <div className="footerRightContent">
                            <Heading fontSize="lg" color>Name</Heading>
                            <p>Details</p>
                        </div>
                    </div>
                    <div className="footerRightBody">
                        <Avatar marginRight="5" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <div className="footerRightContent">
                            <Heading fontSize="lg" color>Name</Heading>
                            <p>Details</p>
                        </div>
                    </div>
                    <div className="footerRightBody">
                        <Avatar marginRight="5" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <div className="footerRightContent">
                            <Heading fontSize="lg" color>Name</Heading>
                            <p>Details</p>
                        </div>
                    </div>
                    <div className="footerRightBody">
                        <Avatar marginRight="5" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <div className="footerRightContent">
                            <Heading fontSize="lg" color>Name</Heading>
                            <p>Details</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="footerBottom center p2">
                <p>FixBuy. All Rights Reserved <br />
                    Developed and Managed By Yash Gupta</p>
            </div>
        </div>
    )
}

export default Footer
