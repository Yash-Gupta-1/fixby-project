import React, { useEffect, useState } from 'react';
import './SingleProperty.css';
import { Heading, Text } from '@chakra-ui/layout';
import { useParams } from 'react-router';
import { db } from '../firebase';
import MetaDecorator from '../Components/MetaDecorator';
import Carousel from 'react-bootstrap/Carousel'
import Footer from './Footer';

const SingleProperty = () => {
    const [properties, setProperties] = useState([])
    const { id } = useParams();

    useEffect(() => {
        db
            .collection('propertyData')
            .onSnapshot(
                snapshot => {
                    setProperties(snapshot.docs.map(doc => ({
                        idKey: doc.id,
                        data: doc.data()
                    })
                    ))
                })
    }, [])



    return (
        <div className="singleprop p1">
            {
                properties
                    .filter(({ idKey }) => idKey === id)
                    .map(({ idKey, data }) => (
                        <div key={idKey}>

                            <MetaDecorator title={`fixxcap - ${data.title} - ${data.discription}`} description="This page available for developer" />
                            <Heading as="h1" color="#302b63" textAlign="center" padding="1" size="lg">{data.title}</Heading>
                            <div >
                                <Text color="#514a9d" className="center">Porperty Code : {idKey.substring(0, 7)}</Text>
                                <Text color="#514a9d" className="center">Posted By : {data.userName}</Text>
                            </div>
                            <div className="singleprop_details mt3 p1">
                                <div className="left">
                                    <div>
                                        <Carousel>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={data.img1 ? data.img1 : null}
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                            {
                                                data.img2 && (
                                                    <Carousel.Item>
                                                        <img
                                                            className="d-block w-100"
                                                            src={data.img2 ? data.img2 : null}
                                                            alt="Second slide"
                                                        />
                                                    </Carousel.Item>
                                                )
                                            }
                                            {
                                                data.img3 && (
                                                    <Carousel.Item>
                                                        <img
                                                            className="d-block w-100"
                                                            src={data.img3 ? data.img3 : null}
                                                            alt="Third slide"
                                                        />
                                                    </Carousel.Item>
                                                )
                                            }

                                            {
                                                data.img4 && (
                                                    <Carousel.Item>
                                                        <img
                                                            className="d-block w-100"
                                                            src={data.img4 ? data.img4 : null}
                                                            alt="Third slide"
                                                        />
                                                    </Carousel.Item>
                                                )
                                            }

                                            {
                                                data.img5 && (
                                                    <Carousel.Item>
                                                        <img
                                                            className="d-block w-100"
                                                            src={data.img5 ? data.img5 : null}
                                                            alt="Third slide"
                                                        />
                                                    </Carousel.Item>
                                                )
                                            }
                                        </Carousel>
                                    </div>

                                    <div className="leftPrice p2 mt5 mb3">
                                        <div className="leftPrice_Inner" >
                                            <Heading as="h2">₹ {data.price}</Heading>
                                            <Text fontSize="lg" mr="3" color="gray.800" className="mt2">Price</Text>
                                        </div>
                                        <div style={{ padding: "4px" }}>
                                            <Heading as="h2">{data.bhkInfo} BHk {data.type}</Heading>
                                            <Text fontSize="lg" color="gray.800" className="mt2">Configurations</Text>
                                        </div>
                                    </div>

                                    <div className="leftDetails mt3 mb5">
                                        <Heading as="h3" className="center" color="gray.700" size="lg" mt="10" mb="3">Property Details</Heading>
                                        <hr />
                                        <div className="product_Details">
                                            <div className="product_Left">
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Posted By</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Purpose</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Type</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">BHK</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Bathrooms</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Furnishing</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Construction Status</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Builtup Area (gaj)</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Floor No.</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Parking</Text>
                                            </div>
                                            <div className="product_Right">
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">{data.listedBy}</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">{data.purpose}</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">{data.type}</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">{data.bhkInfo}</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">{data.bathrooms}</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">{data.furnishing}</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">Ready To Move</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">{data.builtupArea}</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">{data.floorNo}</Text>
                                                <Text fontSize="lg" color="gray.800" mt="3" textAlign="start">{data.parking}</Text>
                                            </div>
                                        </div>
                                        <div className="leftDescription">
                                            <hr />
                                            <Heading as="h3" className="center" color="gray.700" size="lg" mt="10" mb="3">Discription</Heading>
                                            <hr />
                                            <Text fontSize="larger" m="10" textAlign="start">{data.discription}</Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            }
            <Footer />
        </div>
    )
}

export default SingleProperty
