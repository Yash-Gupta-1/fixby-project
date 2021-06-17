import React from 'react';
import '../Utility.css';
import './Header.css';
import { NavLink, Link, useHistory } from 'react-router-dom';
// import { HashLink as  } from 'react-router-hash-link';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import {
    Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Tooltip, Heading, Menu, MenuList, MenuGroup, MenuItem, MenuButton, Text, DrawerFooter,
} from "@chakra-ui/react"
import ScrollIndicator from './ScrollIndicator';
import { Button } from '@material-ui/core';
import { auth } from '../firebase'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody
} from "@chakra-ui/react"
import Login from './Login';


function DrawerOne() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const history = useHistory()

    const user = useSelector(selectUser);

    return (
        <>
            {/* <Button onClick={onOpen} className="btnOutline" smooth> */}
            <div className="" onClick={onOpen}>
                <MenuOutlinedIcon className="svgIcon" />
            </div>
            {/* </Button> */}
            <Drawer
                isOpen={isOpen}
                placement="right"
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px" className="mobileHead">
                            {
                                user ? (
                                    <div className="mobileUserInfo">
                                        <Link to='/myaccount'>
                                            <Avatar onClick={onClose} className="moblieAvtaar" alt={user.displayName} src={user.photo} />
                                        </Link>
                                        <div>
                                            <Text fontSize="medium">Hello,</Text>
                                            <Link to='/myaccount' className="link" onClick={onClose}>
                                                <Heading as="h2" size="md" > {user.displayName} </Heading>
                                                <Text fontSize="small">view profile</Text>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mobileUserInfo">
                                        <Link to='/myaccount'>
                                            <Avatar onClick={onClose} className="moblieAvtaar" alt="nouser" src="" />
                                        </Link>
                                    </div>
                                )
                            }
                            <Button onClick={onClose}><CloseIcon /></Button>
                        </DrawerHeader>

                        <DrawerBody>
                            <ul className="mobileMenu">
                                <li onClick={onClose}>
                                    <NavLink smooth to="/sell-or-rentproperty" style={{ fontSize: "1.7rem", borderRadius: "50px" }} className="btnFill">
                                        +
                                    </NavLink>
                                </li>
                                <li onClick={onClose}>
                                    <NavLink activeClassName="headerActive" to={"/"} exact>Home</NavLink>
                                </li>
                                <li onClick={onClose}>
                                    <NavLink activeClassName="headerActive" to={"/buy-or-rentproperty"}>Buy/Rent</NavLink>
                                </li>
                                <li onClick={onClose}>
                                    <NavLink activeClassName="headerActive" to={"/ourteam"}>Our Team</NavLink>
                                </li>
                                <li onClick={onClose}>
                                    <NavLink activeClassName="headerActive" to={"/contact"}>Contact</NavLink>
                                </li>
                            </ul>
                        </DrawerBody>

                        <DrawerFooter>
                            {
                                user ? (
                                    <button onClick={() => {
                                        auth.signOut();
                                        history.push("/")

                                    }} className="btnOutline" style={{ fontSize: "1.2rem" }}>
                                        <ExitToAppIcon />
                                        Logout
                                    </button>
                                ) : (
                                    <NavLink to="/myaccount">
                                        <button onClick={onClose} className="btnOutline" style={{ fontSize: "1.2rem" }}>
                                            <LockOpenOutlinedIcon />
                                            Login
                                        </button>
                                    </NavLink>
                                )
                            }

                        </DrawerFooter>

                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}


function LoginModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen} style={{ marginRight: "6px" }} className="btnOutline">
                <AccountCircleRoundedIcon className="svgIcon" style={{ marginRight: "4px" }} />
                Login
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <div className="rawDis p2" style={{ justifyContent: "space-between" }}>
                        <ModalHeader>Login </ModalHeader>
                        <Button onClick={onClose}><CloseIcon /></Button>
                    </div>
                    <ModalBody>
                        <Login />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

function SellModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <button onClick={onOpen} className="btnFill">
                SELL
            </button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <div className="rawDis p2" style={{ justifyContent: "space-between" }}>
                        <ModalHeader>Login </ModalHeader>
                        <Button onClick={onClose}><CloseIcon /></Button>
                    </div>
                    <ModalBody>
                        <Login />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

const Header = () => {
    const user = useSelector(selectUser);
    const history = useHistory()

    return (
        <div className="header_main">
            <div className="header">
                <div className="headerLeft">
                    <NavLink to="/">
                        <b>
                            {/* <img src="/images/logo1.png" alt="fixxcap logo" /> */}
                            <Heading as="h1" fontWeight="semibold"><em>fixxcap</em></Heading>
                        </b>
                    </NavLink>
                </div>
                <div className="headerRight">
                    <ul className="menuLeft">
                        <li>
                            <NavLink activeClassName="headerActive" to={"/"} exact>Home</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="headerActive" to={"/buy-or-rentproperty"}>Buy/Rent</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="headerActive" to={"/ourteam"}>Our Team</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="headerActive" to={"/contact"}>Contact</NavLink>
                        </li>

                        <li>
                            {
                                user && (
                                    (user.email === "yashgupta162001@gmail.com" && <NavLink activeClassName="headerActive" to={"/userprofile"}>User Details</NavLink>
                                    )
                                )
                            }
                        </li>

                        <li>
                            {
                                user ? (
                                    <Menu>
                                        <MenuButton as={Button}>
                                            <abbr title={user.displayName}>
                                                <Avatar style={{ background: "slategray" }} alt={user.displayName} src={user.photo ? user.photo : user.displayName} />
                                            </abbr>
                                        </MenuButton>
                                        <MenuList mt="2">
                                            <MenuGroup title="Profile">
                                                <Link style={{ color: "black" }} to={"/myaccount"}>
                                                    <MenuItem>
                                                        My Account
                                                    </MenuItem>
                                                </Link>
                                                <MenuItem onClick={() => {
                                                    auth.signOut();
                                                    history.push("/")

                                                }}>Logout </MenuItem>
                                            </MenuGroup>
                                        </MenuList>
                                    </Menu>
                                ) : (
                                    <>
                                        <LoginModal />
                                    </>
                                )
                            }
                        </li>



                        <li>
                            {
                                user ? (
                                    <Tooltip hasArrow margin="3" label="Post Your Porperty" bg="#302b63">
                                        <NavLink style={{ fontSize: "1.4rem", borderRadius: "50px" }} smooth to="/sell-or-rentproperty" className="btnFill">
                                            +
                                        </NavLink>
                                    </Tooltip>
                                ) : (

                                    <SellModal />

                                )
                            }

                        </li>
                    </ul>

                    <div className="menuRight">
                        <DrawerOne />
                    </div>
                </div>
            </div>

            <ScrollIndicator />
        </div>
    )
}

export default Header
