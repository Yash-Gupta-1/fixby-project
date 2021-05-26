import React from 'react';
import './Sell.css';
import { Heading, Text } from '@chakra-ui/layout';
import SellForm from '../Components/SellForm';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Login from '../Components/Login';


const Sell = () => {
    const user = useSelector(selectUser);

    return (
        <div className="sell">
            {
                user ? (
                    <>
                        <div className="sellTop">
                            <Heading as="h1" className="title center h1" marginTop="10">Post Your Property</Heading>

                            <div className="sellContent p3">
                                <Heading as="h2" className="h2 p3" size="md" mt="10" >Here you can Sell or Rent Your Property</Heading>

                                <Text fontSize="md" marginLeft="10">Advertise your property for free.</Text>
                                <Text fontSize="md" marginLeft="10">Easily contact with us through our 👉🏼 <span style={{ color: "#514a9d" }}>
                                    <i>
                                        <Link to="/contact">
                                            contact Details.
                                        </Link>
                                    </i>
                                </span>
                                </Text>
                            </div>
                        </div>

                        <div className="sellBottom">
                            <SellForm />
                            <div className="sellBottomImg">
                                <img src="/images/rocket.png" alt="rocket" />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Login />
                    </>
                )
            }

        </div>
    )
}

export default Sell
