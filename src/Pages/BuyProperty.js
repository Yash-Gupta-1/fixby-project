import React, { useEffect, useState } from 'react';
import './BuyProperty.css';
import { db } from '../firebase';
import {
    Drawer, DrawerBody, DrawerOverlay, DrawerContent, useDisclosure, Portal, MenuGroup
} from "@chakra-ui/react"
import {
    Menu, MenuButton, MenuList, MenuItem,
} from "@chakra-ui/react"
import Property from '../Components/Porperty'
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { Button, Input } from '@material-ui/core';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import MetaDecorator from '../Components/MetaDecorator';

const BuyProperty = () => {
    const [properties, setProperties] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [searchProp, setSearchProp] = useState('')
    const [loading, setLoading] = useState(false);
    const [slideDoor, setSlideDoor] = useState(false);
    const [scale, setScale] = useState(false);

    useEffect(() => {
        setLoading(true)
        setSlideDoor(true)
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
                                setLoading(false)
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

    const allProperty = () => {
        setLoading(true)
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
                                setLoading(false)
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
    }

    const onlyBuy = () => {
        setLoading(true)
        let isCancelled = false;
        const runAsync = async () => {
            try {
                if (!isCancelled) {
                    db
                        .collection('propertyData')
                        .orderBy('timestamp', 'desc')
                        .where("purpose", "==", "Sale")
                        .onSnapshot(
                            snapshot => {
                                setProperties(snapshot.docs.map(doc => ({
                                    id: doc.id,
                                    data: doc.data()
                                })
                                ))
                                setLoading(false)
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
    }

    const onlyRent = () => {
        setLoading(true)
        let isCancelled = false;
        const runAsync = async () => {
            try {
                if (!isCancelled) {
                    db
                        .collection('propertyData')
                        .orderBy('timestamp', 'desc')
                        .where("purpose", "==", "Rent")
                        .onSnapshot(
                            snapshot => {
                                setProperties(snapshot.docs.map(doc => ({
                                    id: doc.id,
                                    data: doc.data()
                                })
                                ))
                                setLoading(false)
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
    }

    const sortLowToHigh = () => {
        setLoading(true)
        let isCancelled = false;
        const runAsync = async () => {
            try {
                if (!isCancelled) {
                    db
                        .collection('propertyData')
                        .orderBy('price', 'asc')
                        .onSnapshot(
                            snapshot => {
                                setProperties(snapshot.docs.map(doc => ({
                                    id: doc.id,
                                    data: doc.data()
                                })
                                ))
                                setLoading(false)
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
    }

    const sortHighToLow = () => {
        setLoading(true)
        let isCancelled = false;
        const runAsync = async () => {
            try {
                if (!isCancelled) {
                    db
                        .collection('propertyData')
                        .orderBy('price', 'desc')
                        .onSnapshot(
                            snapshot => {
                                setProperties(snapshot.docs.map(doc => ({
                                    id: doc.id,
                                    data: doc.data()
                                })
                                ))
                                setLoading(false)
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
    }

    useEffect(() => {
        setInterval(() => {
            setScale(true)
        }, 400);

    }, [])

    const override = css`
    display: block;
    margin: 0 auto;
  `;


    return (
        <div className="buyprop">
            <MetaDecorator title="fixxcap - Buy or Rent Any Listed Property" description="This page has all the properties listed by the fixxcap users" />
            <div className="buypropTop p1">
                <div className="buypropFilter rawDis">
                    <div className="m1">
                        <Menu>
                            <MenuButton>
                                <SortIcon />
                                Filter
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuGroup title="Purpose">
                                        <MenuItem onClick={() => allProperty()}>All</MenuItem>
                                        <MenuItem onClick={() => onlyRent()}>For Rent</MenuItem>
                                        <MenuItem onClick={() => onlyBuy()}>For Buy</MenuItem>
                                    </MenuGroup>
                                    {/* <MenuGroup title="Price for Rent">
                                        <MenuItem>0 to 10000</MenuItem>
                                        <MenuItem>10000 to 20000</MenuItem>
                                        <MenuItem>20000 +</MenuItem>
                                    </MenuGroup>
                                    <MenuGroup title="Price for Buy">
                                        <MenuItem>5 Lakh to 20 Lakh</MenuItem>
                                        <MenuItem>20 Lakh to 50 Lakh</MenuItem>
                                        <MenuItem onClick={() => {
                                            
                                        }}>50 Lakh +</MenuItem>
                                    </MenuGroup> */}
                                </MenuList>
                            </Portal>
                        </Menu>
                    </div>

                    <div className="m1">
                        <Menu>
                            <MenuButton>
                                <ImportExportIcon />
                                Sort
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuGroup title="Price">
                                        <MenuItem onClick={() => sortHighToLow()}>High to Low</MenuItem>
                                        <MenuItem onClick={() => sortLowToHigh()}>Low to High</MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </div>

                </div>

                <div>
                    <Button onClick={onOpen} style={{ color: "#1a2c5b" }}>
                        <SearchIcon />
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement="top"
                        initialFocusRef={firstField}
                        onClose={onClose}
                    >
                        <DrawerOverlay>
                            <DrawerContent>
                                <DrawerBody className="center">
                                    <Input type="text" style={{ width: "100%" }} onChange={(e) => setSearchProp(e.target.value)} placeholder="Type here..." />
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerOverlay>
                    </Drawer>
                </div>

            </div>


            <div className={scale ? "buypropContent mt p1 scaleLarge" : "buypropContent mt p1 scaleSmall"}>
                {
                    loading ? (
                        <div className="loading rawDis" style={{ height: "70vh" }}>
                            <ClipLoader color={"#302b63"} loading={loading} css={override} size={40} />
                        </div>
                    ) : (
                        <>
                            {/* {
                                onlyBuyClicked ? (
                                    properties ? (
                                        properties
                                            .map(({ id, data }) => (
                                                <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type} />
                                            ))
                                    ) : (
                                        <Heading textAlign="center">No data found</Heading>
                                    )

                                ) : onlyRentClicked ? (
                                    properties
                                        .map(({ id, data }) => (
                                            <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type} />
                                        ))
                                ) : highToLow ? (
                                    properties
                                        .map(({ id, data }) => (
                                            <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type} />
                                        ))
                                ) : lowToHigh ? (
                                    properties
                                        .map(({ id, data }) => (
                                            <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type} />
                                        ))
                                ) : allClicked ? ( */}
                            {
                                properties
                                    .filter(({ data }) => {
                                        if (searchProp === "") {
                                            return data
                                        } else if ((data.type).toLowerCase().includes(searchProp.toLowerCase())) {
                                            return data
                                        } else if ((data.price).toLowerCase().includes(searchProp.toLowerCase())) {
                                            return data
                                        } else if ((data.purpose).toLowerCase().includes(searchProp.toLowerCase())) {
                                            return data
                                        } else if ((data.locality).toLowerCase().includes(searchProp.toLowerCase())) {
                                            return data
                                        } else if ((data.bhkInfo).toLowerCase().includes(searchProp.toLowerCase())) {
                                            return data
                                        }
                                    })
                                    .map(({ id, data }) => (
                                        <div className={!slideDoor && "doorh1Display"}>
                                            <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type} />
                                        </div>
                                    ))
                            }
                            {/* ) : (
                                    <Heading>No data found</Heading>
                                )
                            } */}
                        </>
                    )


                }

            </div>
        </div>
    )
}

export default BuyProperty
