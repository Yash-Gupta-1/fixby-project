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
import MetaDecorator from '../Components/MetaDecorator';
import Footer from '../Components/Footer';

const OurTeam = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    return (
        <div className="ourteam" >
            <MetaDecorator title="FixBy - FixBy Team" description="This page has Founder & CEO and Co-Founder of FixBy " />
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
                            <a target="_blank" rel="noreferrer" href="https://instagram.com/ashish_upadhyay7926?utm_medium=copy_link" ><InstagramIcon /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=100012838808775"><FacebookIcon /></a>
                            <a target="_blank" rel="noreferrer" href="https://twitter.com/YashGup02731446"><TwitterIcon /></a>
                        </div>
                        <Text mt="3">Partner with <br /> The Right Guru</Text>
                        {/* <Text>Youtuber</Text> */}
                    </div>
                </div>
                <div className="teamCard mt5 order" data-aos="fade-up">
                    <div className="teamTop">
                        <img src="/images/team1.jpg" alt="Founder and CEO" />
                    </div>
                    <div className="teamBottomm">
                        <Heading fontSize="2xl" color="#514A9D" mt="2">YASH GUPTA</Heading>
                        <Heading size="sm" mb="2">Founder</Heading>
                        <div>
                            <a target="_blank" rel="noreferrer" href="https://www.Linkedin.com/in/yash-gupta-8b1981175/"><LinkedInIcon /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/_yashgupta1/"><InstagramIcon /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=100012838808775"><FacebookIcon /></a>
                            <a target="_blank" rel="noreferrer" href="https://twitter.com/YashGup02731446"><TwitterIcon /></a>
                        </div>
                        <Text mt="3">Full Stack Web Developer</Text>
                        <Text>Digital Marketer</Text>
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
                            <a target="_blank" rel="noreferrer" href="https://instagram.com/utkarrsh.sharma?utm_medium=copy_link"><InstagramIcon /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=100012838808775"><FacebookIcon /></a>
                            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/utkarsh-sharma-648a52214"><LinkedInIcon /></a>
                        </div>
                        <Text mt="3">Data Analyst</Text>
                        {/* <Text>Dream11 Hacker</Text> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OurTeam
