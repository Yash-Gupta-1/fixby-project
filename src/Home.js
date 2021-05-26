import React, { useEffect, useState } from 'react';
import './Utility.css';
import './Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Services from './Pages/Services';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Button, Tooltip } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Types from './Components/Types';
import Footer from './Components/Footer';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import 'react-typed/dist/animatedCursor.css';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import MetaDecorator from './Components/MetaDecorator';
import Welcome from './Components/Welcome';
import { auth, db } from './firebase';

const Home = () => {
    const user = useSelector(selectUser);
    const [showTopButton, setShowTopButton] = useState(false)
    const [showWelcome, setShowWelcome] = useState(false)

    useEffect(() => {
        AOS.init({ duration: 1000 })
        window.onscroll = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                setShowTopButton(true)
            } else {
                setShowTopButton(false)
            }
        }
        setInterval(() => {
            // setShowWelcome(true)
        }, 5000);
    }, [])


    return (
        <div className="home">
            {
                (!user && showWelcome) && <Welcome />
            }
            <MetaDecorator title="fixxcap" description="This is Home page with all information of what fixxcap is about" />

            <div className="homeTopBtn">
                <button onClick={() => {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }} className={showTopButton ? 'myBtn btnShow' : 'myBtn'} title="Go to top"><ExpandLessOutlinedIcon fontSize="large" /></button>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#D9D7E9" fillOpacity="1" d="M0,288L8.3,282.7C16.6,277,33,267,50,245.3C66.2,224,83,192,99,176C115.9,160,132,160,149,165.3C165.5,171,182,181,199,176C215.2,171,232,149,248,165.3C264.8,181,281,235,298,240C314.5,245,331,203,348,181.3C364.1,160,381,160,397,186.7C413.8,213,430,267,447,282.7C463.4,299,480,277,497,256C513.1,235,530,213,546,218.7C562.8,224,579,256,596,261.3C612.4,267,629,245,646,229.3C662.1,213,679,203,695,181.3C711.7,160,728,128,745,117.3C761.4,107,778,117,794,154.7C811,192,828,256,844,234.7C860.7,213,877,107,894,74.7C910.3,43,927,85,943,90.7C960,96,977,64,993,74.7C1009.7,85,1026,139,1043,144C1059.3,149,1076,107,1092,96C1109,85,1126,107,1142,96C1158.6,85,1175,43,1192,64C1208.3,85,1225,171,1241,224C1257.9,277,1274,299,1291,256C1307.6,213,1324,107,1341,69.3C1357.2,32,1374,64,1390,106.7C1406.9,149,1423,203,1432,229.3L1440,256L1440,0L1431.7,0C1423.4,0,1407,0,1390,0C1373.8,0,1357,0,1341,0C1324.1,0,1308,0,1291,0C1274.5,0,1258,0,1241,0C1224.8,0,1208,0,1192,0C1175.2,0,1159,0,1142,0C1125.5,0,1109,0,1092,0C1075.9,0,1059,0,1043,0C1026.2,0,1010,0,993,0C976.6,0,960,0,943,0C926.9,0,910,0,894,0C877.2,0,861,0,844,0C827.6,0,811,0,794,0C777.9,0,761,0,745,0C728.3,0,712,0,695,0C678.6,0,662,0,646,0C629,0,612,0,596,0C579.3,0,563,0,546,0C529.7,0,513,0,497,0C480,0,463,0,447,0C430.3,0,414,0,397,0C380.7,0,364,0,348,0C331,0,314,0,298,0C281.4,0,265,0,248,0C231.7,0,215,0,199,0C182.1,0,166,0,149,0C132.4,0,116,0,99,0C82.8,0,66,0,50,0C33.1,0,17,0,8,0L0,0Z"></path></svg>

            <div className="banner" data-aos="fade-up">
                <div className="bannerLeft" data-aos="fade-up">
                    {
                        user ? (
                            <>
                                <i>
                                    <Heading fontSize="md" mb="2">Welcome {user.displayName}</Heading>
                                </i>
                                <Heading as="h1" className="active" fontSize={{ fontSize: "4vw" }} color="#302b63" objectFit="cover" textTransform="uppercase">Do Invest not spend <br />
                                    Select ✔ platform</Heading>
                            </>
                        ) : (
                            <>
                                <Heading as="h1" className="active" fontSize={{ fontSize: "4vw" }} color="#302b63" objectFit="cover" textTransform="uppercase">properties <br /> for buy or rent & <br /> post for sale</Heading>
                                <Text fontSize="lg" color="gray">As per your Choice</Text>
                            </>
                        )
                    }

                    <Stack direction="row" spacing={4} marginTop="10">
                        <Link to={"buy-or-rentproperty"} className="href">
                            <Tooltip hasArrow margin="3" label="Buy or Rent Porperty" bg="#302b63">
                                <Button marginRight="1" color="#302b63" variant="solid">
                                    BUY
                                </Button>
                            </Tooltip>
                        </Link>
                        <Link to={"sell-or-rentproperty"} className="href">
                            <Tooltip hasArrow margin="3" label="Post Your Porperty" bg="#302b63">
                                <Button color="#302b63" variant="solid">
                                    SELL
                                </Button>
                            </Tooltip>
                        </Link>
                    </Stack>
                </div>

                <div className="bannerRight">
                    <img src="/images/banner.png" alt="House" />
                </div>
            </div>

            <Services />

            <Types />

            <div className="benefits" data-aos="fade-up">
                <Heading color="#302b63" textAlign="center" padding="10" size="lg" mt="32">Why you should use this Platform ?</Heading>

                <div className="benefit center mt5" >
                    <div className="benefitImg" data-aos="fade-up">
                        <img loading="lazy" src="/images/benefit.png" alt="benefit image" />
                    </div>
                    <div className="benefitContent" >
                        <ul className="benefitLists">
                            <li className="benefitList" data-aos="fade-up">Advertise your property for free in just simple steps</li>
                            <li className="benefitList" data-aos="fade-up">Post any type of property for Rent</li>
                            <li className="benefitList" data-aos="fade-up"> Directly Contact with us for get any type of property on Rent</li>
                            <li className="benefitList" data-aos="fade-up">Show your property to our visitors for selling in free</li>
                            <li className="benefitList" data-aos="fade-up">Sell your property on half brokerage rate in comparision to the outside</li>
                            <li className="benefitList" data-aos="fade-up">Buy any type of property you want to buy after selecting from <br /> our collections on half brokerage rate in comparision to the outside</li>
                            <li className="benefitList" data-aos="fade-up">Directly contact us for buying property in which you are interested to buy</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />

        </div >
    )
}

export default Home
