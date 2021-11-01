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
import { PropertyData } from '../Home';

const BuyProperty = () => {
    const [properties, setProperties] = useState([]);
    const [filterProperties, setFilterProperties] = useState([]);
    const [test] = useState(PropertyData());
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [loading, setLoading] = useState(false);
    const [scale, setScale] = useState(false);
    const [searchText, setSearchText] = useState("")
    // const [testerprop, setTesterProp] = useState([])

    const teest = async () => {
        // test.then((res) => {
        //     // setTesterProp(res).
        //     console.log('teest res', res);

        // })
    }

    console.log('tester', test);
    // console.log('tester obj', testerprop);

    useEffect(() => {
        teest()
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
    }, [scale])

    const override = css`
    display: block;
    margin: 0 auto;
  `;

    const searchedProperty = () => {
        const newResult = properties.filter(({ data, id }) => {
            if ((data.purpose).toLowerCase().includes(searchText.toLowerCase())) {
                return data
            } else if ((id).toLowerCase().includes(searchText.toLowerCase())) {
                return data
            } else if ((data.price).toLowerCase().includes(searchText.toLowerCase())) {
                return data
            } else if ((data.bhkInfo).toLowerCase().includes(searchText.toLowerCase())) {
                return data
            } else if ((data.type).toLowerCase().includes(searchText.toLowerCase())) {
                return data
            } else if ((data.locality).toLowerCase().includes(searchText.toLowerCase())) {
                return data
            }

            // return data
        })

        if (searchText === "") {
            setFilterProperties([])
        } else (
            setFilterProperties(newResult)
        )
    }

    return (
        <div className="buyprop">
            <MetaDecorator title="FixBy - Buy or Rent Any Listed Property" description="This page has all the properties listed by the FixBy users" />
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
                                    <Input type="text" onKeyUp={searchedProperty} style={{ width: "100%" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="search (exp: house, flat, 1000000)" />
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerOverlay>
                    </Drawer>
                </div>

            </div>

            {/* <div>
                {testerprop.map((item) => (
                    <h1>{item.fields.city}</h1>
                ))}
            </div> */}


            <div className={scale ? "buypropContent mt p1 scaleLarge" : "buypropContent mt p1 scaleSmall"}>
                {
                    loading ? (
                        <div className="loading rawDis" style={{ height: "70vh" }}>
                            <ClipLoader color={"#302b63"} loading={loading} css={override} size={40} />
                        </div>
                    ) : (
                        <>

                            {
                                filterProperties.length !== 0 && (
                                    filterProperties.map(({ id, data }) => (
                                        <div key={id} data-aos="fade-up">
                                            <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type}
                                            />
                                        </div>
                                    ))
                                )
                            }

                            {
                                filterProperties.length === 0 && (
                                    properties.map(({ id, data }) => (
                                        <div key={id} data-aos="fade-up">
                                            <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type}
                                            />
                                        </div>
                                    ))
                                )
                            }

                        </>
                    )


                }

            </div>
        </div>
    )
}

export default BuyProperty
