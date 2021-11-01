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
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import MetaDecorator from './Components/MetaDecorator';
// import { db } from './firebase';

export const PropertyData = async () => {
    const result = await fetch('https://firestore.googleapis.com/v1/projects/fixxcap/databases/(default)/documents/propertyData')
        .then((res) => res.json())
        .then((res) => res)

    return result
}

const Home = () => {
    const user = useSelector(selectUser);
    const emails = ["yashgupta162001@gmail.com",]
    const [showTopButton, setShowTopButton] = useState(false)
    console.log('email array', emails);




    useEffect(() => {
        AOS.init({ duration: 1000 })
        window.onscroll = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                setShowTopButton(true)
            } else {
                setShowTopButton(false)
            }
        }

        PropertyData()
    }, [])


    return (
        <div className="home">
            <MetaDecorator title="FixBy" description="This is Home page with all information of what FixBy is about" />

            <div className="homeTopBtn">
                <button onClick={() => {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }} className={showTopButton ? 'myBtn btnShow' : 'myBtn'} title="Go to top"><ExpandLessOutlinedIcon fontSize="large" /></button>
            </div>

            <div className="homeSvg">
                <img src="/images/wave.svg" alt="home background" />
            </div>

            <div className="banner" data-aos="fade-up">
                <div className="bannerLeft" data-aos="fade-up">
                    {
                        user ? (
                            <>
                                <i>
                                    <Heading fontSize="lg" mb="2">Welcome <span className="colorTextOne">{user.displayName}</span></Heading>
                                </i>
                                <Heading as="h1" className="active" fontSize={{ fontSize: "4vw" }} color="#302b63" objectFit="cover" textTransform="uppercase" >This is <br /> The Right Time <br /> for Right Platform</Heading>
                                <Text fontSize="lg" color="gray">Trust is Our First Responsibility</Text>
                            </>
                        ) : (
                            <>
                                <Heading as="h1" className="active" fontSize={{ fontSize: "4vw" }} color="#302b63" objectFit="cover" textTransform="uppercase">Do Invest not spend <br />
                                    Select ✔ platform</Heading>
                            </>
                        )
                    }
                    {
                        user ? (
                            <Stack direction="row" spacing={4} marginTop="10">
                                {
                                    emails.includes(user.email) ? (
                                        <>
                                            <Link to={"buy-or-rentproperty"} className="href">
                                                <Tooltip hasArrow margin="3" label="Buy or Rent Porperty" bg="#302b63">
                                                    <Button marginRight="1" color="#302b63" variant="ghost" paddingRight="10" paddingLeft="10">
                                                        BUY
                                                    </Button>
                                                </Tooltip>
                                            </Link>

                                            <Link to={"sell-or-rentproperty"} className="href">
                                                <Tooltip hasArrow margin="3" label="Post Your Porperty" bg="#302b63" >
                                                    <Button color="#302b63" variant="solid" paddingRight="10" paddingLeft="10">
                                                        SELL
                                                    </Button>
                                                </Tooltip>
                                            </Link>

                                        </>
                                    ) : (
                                        <Link to={"buy-or-rentproperty"} className="href">
                                            <Tooltip hasArrow margin="3" label="Buy or Rent Porperty" bg="#302b63">
                                                <Button width="xs-s" marginRight="1" color="#302b63" variant="solid" paddingRight="10" paddingLeft="10">
                                                    BUY
                                                </Button>
                                            </Tooltip>
                                        </Link>
                                    )
                                }
                            </Stack>
                        ) : (
                            <Stack direction="row" spacing={4} marginTop="10">
                                <Link to={"buy-or-rentproperty"} className="href">
                                    <Tooltip hasArrow margin="3" label="Buy or Rent Porperty" bg="#302b63">
                                        <Button width="10" marginRight="1" color="#302b63" variant="solid" paddingRight="10" paddingLeft="10">
                                            BUY
                                        </Button>
                                    </Tooltip>
                                </Link>
                            </Stack>

                        )
                    }


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
                        <img loading="lazy" src="/images/benefit.png" alt="benefit" />
                    </div>
                    <div className="benefitContent" >
                        <ul className="benefitLists">
                            <li className="benefitList" data-aos="fade-up">Post property for Rent and Sale</li>
                            <li className="benefitList" data-aos="fade-up">Advertise your property for free in just simple steps</li>
                            <li className="benefitList" data-aos="fade-up">Advertise and grow your business from our platform</li>
                            <li className="benefitList" data-aos="fade-up">We can help you in scaling your business</li>
                            <li className="benefitList" data-aos="fade-up"> Directly Contact us to get any type of property on Rent and Buy</li>
                            <li className="benefitList" data-aos="fade-up">Show your property to our visitors</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />

        </div >
    )
}

export default Home
