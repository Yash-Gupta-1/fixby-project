import React, { useEffect } from 'react';
import './Contact.css';
import '../Utility.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import { Heading } from '@chakra-ui/layout';
import { NavLink } from 'react-router-dom';
import MetaDecorator from '../Components/MetaDecorator';
import Footer from '../Components/Footer';


const Contact = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    return (
        <div className="contact">
            <MetaDecorator title="fixxcap - Contact Us" description="Users can contact us" />

            <Heading as="h1" className="title center h1">Contact Us</Heading>

            <div className="contactContent mt5" >
                <div className="contactLeft" data-aos="fade-up">
                    <LocationOnOutlinedIcon fontSize="large" />
                    <Heading size="md" color="#514a9d" className="mt3 mb1">Address</Heading>                    <p>
                        E-180, <br />
                        Bharat Vihar Road, Uttam Nagar, <br />
                        New Delhi - 110059
                    </p>
                </div>

                <div className="contactMiddle" data-aos="fade-up">
                    <CallOutlinedIcon fontSize="large" />
                    <Heading size="md" color="#514a9d" className="mt3 mb1">Phone</Heading>                    <p>
                        Yash Gupta - +91 9354947164 <br />
                        Ashish Upadhayay - +91 8076889036 <br />
                        Utkarsh Sharma - +91 9625103997 <br />
                    </p>
                </div>

                <div className="contactRight" data-aos="fade-up">
                    <DraftsOutlinedIcon fontSize="large" />
                    <Heading size="md" color="#514a9d" className="mt3 mb1">E-mail</Heading>                    <p>
                        {/* <a href={`mailto:{email}?subject={subject}&body={content}`}>mail us</a> <br />
                        <a href={`telt0:{phone}`}>call us</a> <br /> */}
                        <NavLink className="link" to="https://mail.google.com/mail/u/2/#inbox" >support@fixxcap.com</NavLink> <br />
                    </p>
                </div>
            </div>
            <Footer />
        </div >

    )
}

export default Contact
