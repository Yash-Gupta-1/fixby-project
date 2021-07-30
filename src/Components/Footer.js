import React, { useEffect, useState } from 'react';
import './Footer.css';
import '../Utility.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
import { Heading, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { db } from '../firebase';
import Social from './Social'

const Footer = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    const [userInfo, setUserInfo] = useState([])
    // const [userProfile, setUserProfile] = useState([])

    useEffect(() => {
        db
            .collection('userData')
            .orderBy('timestamp', 'desc')
            .onSnapshot(
                snapshot => {
                    setUserInfo(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })
                    ))
                })
    }, [])

    return (
        <div className="footer mt5" data-aos="fade-up">
            <div className="footerBackground">
                <img src="/images/footerWave.svg" alt="Footer Background" />
            </div>
            <div className="footerbody">
                <div className="footerTop">
                    <div className="footerTop_up">
                        <NavLink to="/">
                            <b>
                                <Heading as="h1" fontWeight="semibold"><em>FixBy</em></Heading>
                            </b>
                        </NavLink>
                    </div>


                    <div className="footerTop_down">
                        <div className="footerTop_middle center">
                            <h1 className="h1 p1">About FixBy</h1>
                            <p>FixBy : Platform for Properties</p>

                            <p>
                                FixBy is a all new platform for your properties. <br /> We have all trusted and verified Sellers and Buyers.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footerRight">
                    <div className="footerRightHeader">
                        <Heading className="center h1" fontSize="2xl">Our Partners</Heading>
                    </div>

                    {
                        userInfo.map(({ id, data }) => (
                            <NavLink to={`/${data.currentUserId}`} key={id} className="footerRightBody">
                                <Avatar marginRight="3" className="Avatar muiavatar" src={data.profile} alt={data.userName} />
                                <div className="footerRightContent">
                                    <Heading fontSize="md" color>{data && data.userName}</Heading>
                                    <Text as="p" fontSize="lg">{data.listedBy}</Text>
                                </div>
                            </NavLink>
                        ))
                    }

                </div>

                <div className="">
                    <Social />
                </div>
            </div>

            <div className="footerBottom center p2">
                <p>FixBy. All Rights Reserved <br />
                    Developed and Managed By Yash Gupta</p>
            </div>
        </div >
    )
}

export default Footer
