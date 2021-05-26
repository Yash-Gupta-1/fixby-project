import React, { useState } from 'react';
import { Heading, useDisclosure, Text } from '@chakra-ui/react';
import './Welcome.css';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Login from './Login';


function WelcomeModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [open, setOpen] = useState(true);
    const user = useSelector(selectUser)

    return (
        <>
            {
                open && (
                    <Modal isOpen={!isOpen} size="xl" onOpen={onOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>

                                <div className="rawDis p2" style={{ justifyContent: "space-between" }}>
                                    <Heading className="colorTextOne" as="h1" size="lg" textAlign="center">fixxcap </Heading>

                                    <Button onClick={() => setOpen(false)}><CloseIcon /></Button>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <div className="welcomeContent">
                                    <div className="welcomeContent_Left center">
                                        <Heading as="h2" size="md" mb="5">Hello! {user && user.displayName} </Heading>
                                        <Text mt="3">fixxcap is a Property Dealing Platform</Text>
                                        <Text mt="3">We provide some features for our User's for free</Text>
                                        <Text mt="3">Where you can Rent, Buy & Sale Properties</Text>
                                    </div>
                                    <img src="/images/welcome1.png" alt="" />
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <NavLink to="/login" className="link btnOutline">Go Further <ArrowForwardIcon /></NavLink>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )
            }

        </>
    )
}

const Welcome = () => {

    return (
        <div className="welcome p2">
            <WelcomeModal />
            {/* <SizeExample /> */}
        </div>
    )
}

export default Welcome
