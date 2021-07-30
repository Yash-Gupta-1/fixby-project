import React from 'react';
import './Social.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import HelpIcon from '@material-ui/icons/Help';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PolicyIcon from '@material-ui/icons/Policy';
import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const Social = () => {
    return (
        <div className="social mt1">
            <div className="social__head borderr mb2">
                <Heading as="h1" className="center h1" fontSize="2xl">Find us on</Heading>
            </div>
            <div className="social__body rawDis mb1">
                <div className="social__content whatsapp">
                    <WhatsAppIcon />
                </div>
                <div className="social__content insta">
                    <InstagramIcon />
                </div>
                <div className="social__content fb">
                    <FacebookIcon />
                </div>
                <div className="social__content twitter">
                    <TwitterIcon />
                </div>
            </div>
            <hr />
            <div className="social__bodyLinks mt1">
                <Link to="/privacypolicy" className="rawDis link mt1">
                    <PolicyIcon />
                    <Heading as="h3" fontSize="md">Privacy Policy</Heading>
                </Link>
                <Link to="/termsandcondition" className="rawDis link mt1">
                    <AssignmentIcon />
                    <Heading as="h3" fontSize="md">Terms and Condition</Heading>
                </Link>
                <Link to="/contact" className="rawDis link mt1">
                    <HelpIcon />
                    <Heading as="h3" fontSize="md">Help</Heading>
                </Link>
            </div>
        </div>
    )
}

export default Social
