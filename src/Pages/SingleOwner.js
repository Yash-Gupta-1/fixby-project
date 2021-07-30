import React, { useEffect, useState } from 'react';
import { Heading, Avatar, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';
import Property from '../Components/Porperty';
import { db } from '../firebase';
import './SingleOwner.css';


const SingleOwner = () => {
    const [properties, setProperties] = useState([])
    const { currentuserid } = useParams()

    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
            try {
                if (!isCancelled) {
                    db
                        .collection('propertyData')
                        .orderBy('timestamp', 'desc')
                        .onSnapshot(
                            snapshot => {
                                setProperties(snapshot.docs.map(doc => ({
                                    id: doc.id,
                                    data: doc.data()
                                })
                                ))
                            })
                }
            } catch (e) {
                if (!isCancelled) {
                    throw e;
                }
            }
        };

        runAsync();

        return () => {
            isCancelled = true;
        }

    }, [])

    return (
        <div className="singleowner">
            {
                properties
                    .filter(({ data }) => data.currentUserId === currentuserid)
                    .map(({ id, data }) => (
                        <>
                            <div className="">
                                <div className="singleownerTop">
                                    <img src={data.img2} alt="" />
                                </div>
                                <div className="colDis p1 singleownerProfile">
                                    <Avatar marginRight="3" className="Avatar muiavatar" src={data.photo ? data.photo : data.userName} alt={data.userName} />
                                    <div className="">
                                        <Heading as="h1" className="center" fontSize="4xl" color>{data && data.userName}</Heading>
                                        <Text as="p" className="center" fontSize="xl">{data.listedBy}</Text>
                                        <Text as="p" className="center" fontSize="xl">Business Name</Text>
                                    </div>
                                </div>
                            </div>

                            <Heading fontSize="2xl" className="colorTextTwo" marginLeft="16" marginTop="10">Properties I have</Heading>


                            <div className="mypostDiv p3">
                                <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type} />
                            </div>
                        </>
                    ))
            }
        </div>
    )
}

export default SingleOwner