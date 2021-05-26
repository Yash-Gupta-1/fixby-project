import React, { useEffect } from 'react'
import { Heading, Text } from '@chakra-ui/layout';
import './OurTeam.css';
import '../Utility.css';
import AOS from 'aos';
import 'aos/dist/aos.css'
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Link } from 'react-router-dom';
import MetaDecorator from '../Components/MetaDecorator';
import Footer from '../Components/Footer';

const OurTeam = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    return (
        <div className="ourteam" >
            <MetaDecorator title="fixxcap - fixxcap Team" description="This page has Founder & CEO and Co-Founder of fixxcap " />
            <Heading as="h1" className="title center h1">Our Team</Heading>

            <div className="teamCards" data-aos="fade-up">
                <div className="teamCard mt2" data-aos="fade-up">
                    <div className="teamTop">
                        <img src="/images/team2.jpg" alt="Co-Founder" />
                    </div>
                    <div className="teamBottomm">
                        <Heading fontSize="2xl" color="#514A9D" mt="2">ASHISH UPADHYAY</Heading>
                        <Heading size="sm" mb="2">Co-Founder</Heading>
                        <div>
                            <Link href="#"><InstagramIcon /></Link>
                            <Link href="#"><FacebookIcon /></Link>
                            <Link href="#"><TwitterIcon /></Link>
                        </div>
                        <Text mt="3">Teacher</Text>
                        <Text>Youtuber</Text>
                    </div>
                </div>
                <div className="teamCard mt5 order" data-aos="fade-up">
                    <div className="teamTop">
                        <img src="/images/team1.jpg" alt="Founder & CEO" />
                    </div>
                    <div className="teamBottomm">
                        <Heading fontSize="2xl" color="#514A9D" mt="2">YASH GUPTA</Heading>
                        <Heading size="sm" mb="2">Student & Founder</Heading>
                        <div>
                            <Link href="#"><LinkedInIcon /></Link>
                            <Link href="#"><InstagramIcon /></Link>
                            <Link href="#"><FacebookIcon /></Link>
                            <Link href="#"><TwitterIcon /></Link>
                        </div>
                        <Text mt="3">Full Stack Web Developer</Text>
                        <Text>Google Certified Digital Marketer</Text>
                    </div>
                </div>
                <div className="teamCard mt5" data-aos="fade-up">
                    <div className="teamTop">
                        <img src="/images/team4.jpg" alt="Co-Founder" />
                    </div>
                    <div className="teamBottomm">
                        <Heading fontSize="2xl" color="#514A9D" mt="2">UTKARSH SHARMA</Heading>
                        <Heading size="sm" mb="2">Co-Founder</Heading>
                        <div>
                            <Link href="#"><InstagramIcon /></Link>
                            <Link href="#"><FacebookIcon /></Link>
                            <Link href="#"><TwitterIcon /></Link>
                        </div>
                        <Text mt="3">Data Analyst</Text>
                        <Text>Dream11 Hacker</Text>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OurTeam
