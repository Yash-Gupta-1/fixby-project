import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import '../Utility.css';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { Avatar } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { NavLink, useHistory } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import Login from '../Components/Login';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import Property from '../Components/Porperty';
import MetaDecorator from '../Components/MetaDecorator';
import NotFound from '../Components/NotFound';
// import EditIcon from '@material-ui/icons/Edit';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
// import { Spinner } from "@chakra-ui/react"
import { FormLabel, Input, FormControl, Select, FormHelperText, Button } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
import firebase from 'firebase'
import QRCode from "react-qr-code";


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
// }));

const MyAccount = () => {
    // const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const user = useSelector(selectUser);
    const [properties, setProperties] = useState([])
    const [profileClicked, setProfileClicked] = useState(true)
    const [posts, setPosts] = useState(false)
    const [saved, setSaved] = useState(false)
    const [showQrCode, setShowQrCode] = useState(false)
    const [message, setMessage] = useState('')
    const [profile, setProfile] = useState('')
    // const [spin, setSpin] = useState(false)
    const [oldUserName, setOldUserName] = useState()
    const history = useHistory()


    // const dispatch = useDispatch()

    // const handleSaveProfile = (e) => {
    //     e.preventDefault();
    //     setMessage('')
    //     setMessage("Now You are verify")
    //     setInterval(() => {
    //         setMessage("")
    //     }, 3000)
    // }

    const handleUpload = (data) => {
        console.log('data', data);
        auth.currentUser.updateProfile({
            displayName: data.userName, photoURL: profile
        }).then(() => {

            console.log('updated');
            setMessage('')
            setMessage("Now You are verified")
            setInterval(() => {
                setMessage("")
            }, 3000)

        }).catch((error) => {
            console.log('error occur', error);

        });


        db.collection("userData").add({
            listedBy: data.listedBy,
            userName: data.userName,
            userNumber: data.userNumber,
            userEmail: user.email,
            city: data.city,
            address1: data.address1,
            address2: data.address2,
            locality: data.locality,
            profile: profile,
            currentUserId: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

    }

    const handleChangeProfile = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`images/${file.name}`);
            await fileRef.put(file);
            setProfile(await fileRef.getDownloadURL());
        }
    };

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

    // const downloadQRCode = () => {
    //     // Generate download with use canvas and stream
    //     const canvas = document.getElementById("qr-gen");
    //     const pngUrl = canvas
    //         .toDataURL("image/png")
    //         .replace("image/png", "image/octet-stream");
    //     let downloadLink = document.createElement("a");
    //     downloadLink.href = pngUrl;
    //     downloadLink.download = `https://fixxcap.web.app/#/${user.uid}.png`;
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    //     document.body.removeChild(downloadLink);
    // };

    // const deleteProperty = async (id) => {
    //     try {
    //         const confirmBox = window.confirm(
    //             "Do you really want to delete this ad?"
    //         )
    //         if (confirmBox === true) {
    //             await db.collection('propertyData').doc(id).delete();
    //         }
    //     } catch (err) {
    //         alert(err.message)
    //     }
    // }


    return (
        <div className="myaccount">
            <MetaDecorator title={`FixBy - ${user && user.displayName}`} description="This page available for developer" />

            {
                user ? (
                    <>
                        <div className="myLeft box">
                            <div className="myLeftTop">
                                <Avatar className="Avatar muiavatar" src={user.photo ? user.photo : user.displayName} alt={user.displayName} />
                                <Heading as="h1" size="md" mt="5">
                                    {user.displayName}
                                </Heading>
                                <Text color="gray.600" fontSize="md" >@user{user.uid.substring(0, 7)} </Text>
                                <Text color="gray.600" fontSize="md" >{user.email}</Text>
                            </div>
                            <div className="myLeftBottom mt4">
                                <ul>
                                    <li onClick={() => {
                                        setProfileClicked(true)
                                        setPosts(false)
                                        setSaved(false)
                                    }}>
                                        <MetaDecorator title={`FixBy - ${user && user.displayName} - Profile`} description="This page available for developer" />

                                        <NavLink activeClassName={profileClicked && "myaccountActive"} to="#">My profile</NavLink>
                                    </li>
                                    <li onClick={() => {
                                        setPosts(true)
                                        setProfileClicked(false)
                                        setSaved(false)
                                    }}>
                                        <NavLink activeClassName={posts && "myaccountActive"} to="#">My posts</NavLink>
                                    </li>
                                    <li onClick={() => {
                                        setSaved(true)
                                        setProfileClicked(false)
                                        setPosts(false)
                                    }}>
                                        <NavLink activeClassName={saved && "myaccountActive"} to="#">Saved</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="myaccountLogout">
                                <button className="btnFill" onClick={() => {
                                    auth.signOut()
                                    history.replace('/')
                                }}>Logout</button>
                            </div>

                        </div>
                        <div className="myRight">
                            {
                                message &&
                                <div className="alertMessage">
                                    <Alert status="info">
                                        <AlertIcon />
                                        <Box flex="1">
                                            <AlertTitle>Success ✔!</AlertTitle>
                                            <AlertDescription display="block">
                                                {message}
                                            </AlertDescription>
                                        </Box>
                                    </Alert>
                                </div>
                            }
                            <div className="myRighTop">

                                {
                                    profileClicked && (
                                        <>
                                            <div className="box p3">
                                                <Button onClick={() => setShowQrCode(prev => !prev)} marginBottom="5" color="#302b63" variant="solid" paddingRight="10" paddingLeft="10">
                                                    Show my QR Code
                                                </Button>
                                                {
                                                    showQrCode && (
                                                        <>
                                                            <QRCode size={150} fgColor="#302b63" value={`https://fixxcap.web.app/#/${user.uid}`} />
                                                        </>
                                                    )
                                                }
                                                <Heading mt="5" mb="4" as="h1" size="md" className="center h1">Kindly provide us your details</Heading>
                                                <div className="myRighTop_leftForm mt3">
                                                    <form onSubmit={handleSubmit(handleUpload)}>
                                                        <div className="myRighTop_left">
                                                            <Avatar className="Avatar muiavatar" src={user.photo ? user.photo : user.displayName} alt={user.displayName} />
                                                            <FormControl marginTop="5" className="divCenter">
                                                                <FormLabel isRequired>
                                                                    <Input onChange={handleChangeProfile} display="none" variant="filled" name="photoThird" type="file" />
                                                                    <span className="customFile">
                                                                        <CameraAltIcon />
                                                                    </span>
                                                                </FormLabel>
                                                            </FormControl>
                                                        </div>

                                                        <FormControl marginTop="5" isRequired _fullScreen={true}>
                                                            <FormLabel>Your Name</FormLabel>
                                                            <Input variant="flushed" value={oldUserName}
                                                                onChange={(e) => setOldUserName(e.target.value)}
                                                                name="userName" type="text" {...register("userName", { required: "This information is required" })} placeholder="Type your Name" required />
                                                            <FormHelperText>
                                                                If you want to change your Name so you can change it.
                                                            </FormHelperText>
                                                        </FormControl>

                                                        <FormControl marginTop="5" isRequired _fullScreen={true}>
                                                            <FormLabel>Your Email</FormLabel>
                                                            <Input variant="flushed" value={user.email} name="userEmail" type="text" {...register("userEmail", { required: "This information is required" })} placeholder="Type your Name" required />
                                                        </FormControl>

                                                        {
                                                            user.email === "yashgupta162001@gmail.com" && (
                                                                <>
                                                                    <FormControl marginTop="5" isRequired _fullScreen={true}>
                                                                        <FormLabel>Business Name</FormLabel>
                                                                        <Input variant="flushed" name="business" type="text" {...register("business", { required: "This information is required" })} placeholder="Type your Business Name" required />
                                                                    </FormControl>

                                                                    <FormControl marginTop="5" >
                                                                        <FormLabel>Profile</FormLabel>
                                                                        <Select variant="flushed" placeholder="Select profile" {...register("listedBy", { required: "Please choose your profile" })}>
                                                                            <option>Owner</option>
                                                                            <option>Builder</option>
                                                                            <option>Agent</option>
                                                                        </Select>
                                                                        <p style={{ color: "red" }}>{errors.listedBy?.message}</p>
                                                                    </FormControl>
                                                                </>
                                                            )
                                                        }


                                                        <FormControl marginTop="5" >
                                                            <FormLabel>Phone Number</FormLabel>
                                                            <Input variant="flushed" name="userNumber" type="phone" {...register("userNumber", { required: "This information is required" })} placeholder="Type your Number" />
                                                            <p style={{ color: "red" }}>{errors.userNumber?.message}</p>
                                                            <FormHelperText>Please provide valid and currently working number</FormHelperText>
                                                        </FormControl>


                                                        <FormControl marginTop="5" id="title" isRequired>
                                                            <FormLabel>City</FormLabel>
                                                            <Input variant="flushed" name="city" type="text" {...register("city", { required: "This information is required" })} placeholder="City" required />
                                                        </FormControl>

                                                        <FormControl marginTop="5" id="title" isRequired>
                                                            <FormLabel>Address 1</FormLabel>
                                                            <Input variant="flushed" name="address1" type="text" {...register("address1", { required: "This information is required" })} placeholder="House No & Street No" required />
                                                        </FormControl>

                                                        <FormControl marginTop="5" id="title" isRequired>
                                                            <FormLabel>Address 2</FormLabel>
                                                            <Input variant="flushed" name="address2" type="text" {...register("address2", { required: "This information is required" })} placeholder="Address" />
                                                        </FormControl>

                                                        <FormControl marginTop="5" id="title" isRequired>
                                                            <FormLabel>Locality</FormLabel>
                                                            <Input variant="flushed" name="locality" type="text" {...register("locality", { required: "This information is required" })} placeholder="Locality" required />
                                                        </FormControl>

                                                        <div className="submitbtn center">
                                                            <button className="btnFill mt5 mb5 m1" type="submit">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                            <div className="box mt3">

                                                <Heading mt="16" mb="4" as="h1" size="lg" className="center h1">What do you waiting for ?</Heading>
                                                <i>
                                                    <Text className="center">Here are our few services</Text>
                                                </i>
                                                <div className="myRighTop_leftServie mt5">
                                                    <NavLink to="/buy-or-rentproperty">
                                                        <div className="serviceDiv">
                                                            <img src="/images/buy1.png" alt="Buy" />
                                                            <Heading as="h3" mt="4" size="md" fontWeight="medium" className="center">Buy</Heading>
                                                        </div>
                                                    </NavLink>
                                                    <NavLink to="/buy-or-rentproperty">
                                                        <div className="serviceDiv">
                                                            <img src="/images/rent1.png" alt="Take on Rent" />
                                                            <Heading as="h3" mt="4" size="md" fontWeight="medium" className="center">Take on Rent</Heading>
                                                        </div>
                                                    </NavLink>
                                                    <NavLink to="/sell-or-rentproperty">
                                                        <div className="serviceDiv">
                                                            <img src="/images/sale1.png" alt="Sell" />
                                                            <Heading as="h3" mt="7" size="md" fontWeight="medium" className="center">Sell</Heading>
                                                        </div>
                                                    </NavLink>
                                                    <NavLink to="/sell-or-rentproperty">
                                                        <div className="serviceDiv">
                                                            <img src="/images/onrent.png" alt="Give on Rent" />
                                                            <Heading as="h3" mt="6" size="md" fontWeight="medium" className="center">Give on Rent</Heading>
                                                        </div>
                                                    </NavLink>
                                                </div>
                                            </div>

                                        </>
                                    )

                                }

                                {
                                    posts && (
                                        properties.length !== 0 ? (
                                            <div className="myaccountPost box">
                                                <Heading className="h1 center" size="lg" mt="5">My Posts</Heading>
                                                {
                                                    properties
                                                        .filter(({ data }) => data.currentUserId === user.uid)
                                                        .map(({ id, data }) => (
                                                            <div className="mypostDiv">
                                                                <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type}
                                                                />
                                                            </div>
                                                        ))
                                                }
                                            </div>
                                        ) : (
                                            <div className="myaccountPost box">
                                                <NotFound />
                                            </div>
                                        )
                                    )
                                }

                                {
                                    saved && (
                                        <>
                                            <div className="myaccountSaved box">
                                                {/* <Heading as="h2" size="lg" className="center">No Saved posts</Heading>
                                                <img className="myaccountImg" src="/images/nosaved.png" alt="no-saved" /> */}
                                                <NotFound />
                                            </div>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </>
                ) : (
                    <Login />
                )
            }

        </div >
    )
}

export default MyAccount