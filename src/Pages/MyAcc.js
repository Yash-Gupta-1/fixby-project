// import React, { useEffect, useState } from 'react';
// import './MyAccount.css';
// import '../Utility.css';
// import { Box, Heading, Text } from '@chakra-ui/layout';
// import { Avatar } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../features/userSlice';
// import { NavLink } from 'react-router-dom';
// import { auth, db } from '../firebase';
// import Login from '../Components/Login';
// import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
// import Property from '../Components/Porperty';
// import MetaDecorator from '../Components/MetaDecorator';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import NotFound from '../Components/NotFound';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
// }));

// const MyAccount = () => {
//     const classes = useStyles();
//     const user = useSelector(selectUser);
//     const [properties, setProperties] = useState(true)
//     const [profileClicked, setProfileClicked] = useState(true)
//     const [posts, setPosts] = useState(false)
//     const [saved, setSaved] = useState(false)
//     const [message, setMessage] = useState('')

//     const handleSaveProfile = (e) => {
//         e.preventDefault();
//         setMessage('')
//         setMessage("Now You are verify")
//         setInterval(() => {
//             setMessage("")
//         }, 3000)
//     }

//     useEffect(() => {
//         let isCancelled = false;
//         const runAsync = async () => {
//             try {
//                 if (!isCancelled) {
//                     db
//                         .collection('propertyData')
//                         .orderBy('timestamp', 'desc')
//                         .onSnapshot(
//                             snapshot => {
//                                 setProperties(snapshot.docs.map(doc => ({
//                                     id: doc.id,
//                                     data: doc.data()
//                                 })
//                                 ))
//                             })
//                 }
//             } catch (e) {
//                 if (!isCancelled) {
//                     throw e;
//                 }
//             }
//         };

//         runAsync();

//         return () => {
//             isCancelled = true;
//         }

//     }, [])

//     const deleteProperty = async (id) => {
//         try {
//             const confirmBox = window.confirm(
//                 "Do you really want to delete this ad?"
//             )
//             if (confirmBox === true) {
//                 await db.collection('propertyData').doc(id).delete();
//             }
//         } catch (err) {
//             alert(err.message)
//         }
//     }

//     return (
//         <div className="myaccount">
//             <MetaDecorator title={`fixxcap - ${user && user.displayName}`} description="This page available for developer" />

//             {
//                 user ? (
//                     <>
//                         <div className="myLeft box">
//                             <div className="myLeftTop">
//                                 <Avatar className="Avatar muiavatar" src={user.photo ? user.photo : user.displayName} alt={user.displayName} />
//                                 <Heading as="h2" size="md" mt="5">
//                                     {user.displayName}
//                                 </Heading>
//                                 <Text color="gray.600" fontSize="small" >@user{user.uid.substring(0, 7)} </Text>
//                             </div>
//                             <div className="myLeftBottom mt4">
//                                 <ul>
//                                     <li onClick={() => {
//                                         setProfileClicked(true)
//                                         setPosts(false)
//                                         setSaved(false)
//                                     }}>
//                                         <MetaDecorator title={`fixxcap - ${user && user.displayName} - Profile`} description="This page available for developer" />

//                                         <NavLink activeClassName={profileClicked && "myaccountActive"} to="#">My profile</NavLink>
//                                     </li>
//                                     <li onClick={() => {
//                                         setPosts(true)
//                                         setProfileClicked(false)
//                                         setSaved(false)
//                                     }}>
//                                         <NavLink activeClassName={posts && "myaccountActive"} to="#">My posts</NavLink>
//                                     </li>
//                                     <li onClick={() => {
//                                         setSaved(true)
//                                         setProfileClicked(false)
//                                         setPosts(false)
//                                     }}>
//                                         <NavLink activeClassName={saved && "myaccountActive"} to="#">Saved</NavLink>
//                                     </li>
//                                 </ul>
//                             </div>
//                             <div className="myaccountLogout">
//                                 <button className="btnFill" onClick={() => auth.signOut()}>Logout</button>
//                             </div>
//                         </div>
//                         <div className="myRight">
//                             {
//                                 message && <Alert status="info">
//                                     <AlertIcon />
//                                     <Box flex="1">
//                                         <AlertTitle>Success ✔!</AlertTitle>
//                                         <AlertDescription display="block">
//                                             {message}
//                                         </AlertDescription>
//                                     </Box>
//                                 </Alert>
//                             }
//                             <div className="myRighTop">
//                                 {
//                                     profileClicked && (
//                                         <>
//                                             <div className="box p3">
//                                                 <div className="myRighTop_left">
//                                                     <Avatar className="Avatar" src={user.photo ? user.photo : user.picture} alt={user.displayName} />
//                                                 </div>
//                                                 <div className="myRighTop_leftForm mt3">
//                                                     <form onSubmit={handleSaveProfile} className={classes.root}>
//                                                         <Heading as="h3" size="md" fontWeight="normal" borderBottom="2px solid gray">{user.displayName}</Heading>
//                                                         <Heading as="h3" size="md" fontWeight="normal" borderBottom="2px solid gray">{user.email}</Heading>
//                                                     </form>
//                                                 </div>
//                                             </div>

//                                             <div className="box mt3">

//                                                 <Heading mt="16" mb="4" as="h1" size="lg" className="center h1">What you want to do ?</Heading>
//                                                 <i>
//                                                     <Text className="center">Here are our few services</Text>
//                                                 </i>
//                                                 <div className="myRighTop_leftServie mt5">

//                                                     <NavLink to="/buy-or-rentproperty">
//                                                         <div className="serviceDiv">
//                                                             <img src="/images/buy1.png" alt="Buy" />
//                                                             <Heading as="h3" mt="4" size="md" fontWeight="medium" className="center">Buy</Heading>
//                                                         </div>
//                                                     </NavLink>
//                                                     <NavLink to="/buy-or-rentproperty">
//                                                         <div className="serviceDiv">
//                                                             <img src="/images/rent1.png" alt="Take on Rent" />
//                                                             <Heading as="h3" mt="4" size="md" fontWeight="medium" className="center">Take on Rent</Heading>
//                                                         </div>
//                                                     </NavLink>
//                                                     <NavLink to="/sell-or-rentproperty">
//                                                         <div className="serviceDiv">
//                                                             <img src="/images/sale1.png" alt="Sell" />
//                                                             <Heading as="h3" mt="7" size="md" fontWeight="medium" className="center">Sell</Heading>
//                                                         </div>
//                                                     </NavLink>
//                                                     <NavLink to="/sell-or-rentproperty">
//                                                         <div className="serviceDiv">
//                                                             <img src="/images/onrent.png" alt="Give on Rent" />
//                                                             <Heading as="h3" mt="6" size="md" fontWeight="medium" className="center">Give on Rent</Heading>
//                                                         </div>
//                                                     </NavLink>
//                                                 </div>
//                                             </div>

//                                         </>
//                                     )

//                                 }

//                                 {
//                                     posts && (
//                                         properties ? (
//                                             <div className="myaccountPost box">
//                                                 <Heading className="h1 center" size="lg" mt="5">My Posts</Heading>

//                                                 {
//                                                     properties
//                                                         .filter(({ data }) => data.currentUserId === user.uid)
//                                                         .map(({ id, data }) => (
//                                                             <div className="mypostDiv">
//                                                                 <Property key={id} id={id} price={data.price} time={data.timestamp} title={data.title} purpose={data.purpose} img1={data.img1} locality={data.locality} bhk={data.bhkInfo} type={data.type} />
//                                                                 <button className="delete" onClick={() => deleteProperty(id)}><DeleteForeverIcon /></button>
//                                                             </div>
//                                                         ))
//                                                 }
//                                             </div>
//                                         ) : (
//                                             <div className="myaccountPost box">
//                                                 <Heading as="h2" size="lg" className="center">No posts yet</Heading>
//                                                 <img className="myaccountImg" src="/images/nopost.png" alt="no-posts" />
//                                             </div>
//                                         )
//                                     )
//                                 }

//                                 {
//                                     saved && (
//                                         <>
//                                             <div className="myaccountSaved box">
//                                                 {/* <Heading as="h2" size="lg" className="center">No Saved posts</Heading>
//                                                 <img className="myaccountImg" src="/images/nosaved.png" alt="no-saved" /> */}
//                                                 <NotFound />
//                                             </div>
//                                         </>
//                                     )
//                                 }

//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <Login />
//                 )
//             }

//         </div >
//     )
// }

// export default MyAccount



// CSS

// .myaccount {
//     display: flex;
//     align - items: flex - start;
//     justify - content: space - evenly;
//     flex - grow: 1;
//     height: fit - content;
// }
  
//   .myLeft,
//   .myRight {
//     padding: 30px 5px;
//     display: flex;
//     align - items: center;
//     justify - content: center;
//     flex - direction: column;
//     background: #fff;
// }
  
//   .myLeft {
//     flex: 0.2;
//     margin - top: 30px;
//     /* background: linear-gradient(145deg, #f0f0f0, #cacaca);
//     box-shadow: 7px 7px 14px #bebebe, -7px -7px 14px #ffffff; */
//     position: sticky;
//     top: 11 %;
//     z - index: 1;
//     border - radius: 50px;
//     background: linear - gradient(145deg, #ffffff, #d9d8e6);
//     box - shadow: 5px 5px 10px #898991, -5px - 5px 10px #ffffff;
// }
  
//   .myLeftTop {
//     display: flex;
//     align - items: center;
//     justify - content: center;
//     flex - direction: column;
//     width: 100 %;
//     margin - bottom: 10px;
//     position: relative;
// }
  
//   .myLeftTop:: after {
//     content: "";
//     position: absolute;
//     bottom: -15px;
//     background - color: #302b63;
//     height: 1px;
//     width: 100 %;
//     z - index: 1;
//     margin - top: 20px;
// }
  
//   .myLeftTop.Avatar {
//     width: 70px;
//     height: 70px;
//     object - fit: contain;
//     background: slategray;
// }
  
//   .myLeftBottom {
//     width: 90 %;
// }
  
//   .myLeftBottom ul {
//     width: 100 %;
//     text - align: center;
// }
  
//   .myLeftBottom ul li {
//     list - style: none;
//     padding: 10px;
//     margin: 15px 0;
//     position: relative;
// }
  
//   .myaccountActive:: after {
//     content: "";
//     position: absolute;
//     height: 42px;
//     width: 50 %;
//     transform: rotateY(-92deg);
//     left: -25 %;
//     top: 1px;
//     background - color: #302b63;
//     transition: all 0.5s ease;
// }
  
//   .myLeftBottom ul li: hover {
//     background: #f1f0ff;
// }
  
//   .myLeftBottom li a {
//     font - size: 1rem;
// }
  
//   .myLeftBottom ul li a: hover {
//     color: #000;
//     text - decoration: none;
// }
  
//   .myActive {
//     position: absolute;
//     left: 0;
//     border - left: 5px solid #302b63;
// }
  
//   .myRight {
//     flex: 0.5;
//     /* margin-top: 30px; */
//     /* background: linear-gradient(145deg, #f0f0f0, #cacaca);
//     box-shadow: 7px 7px 14px #bebebe, -7px -7px 14px #ffffff; */
// }
  
//   .myRighTop {
//     display: flex;
//     flex - direction: column;
//     align - items: center;
//     padding: 10px;
//     width: 100 %;
// }
  
//   .myRighTop.Avatar {
//     width: 130px;
//     height: 130px;
//     object - fit: contain;
//     background: slategray;
// }
  
//   .myRighTop form {
//     display: flex;
//     flex - direction: column;
// }
  
//   .myRighTop_left {
//     display: flex;
//     flex - direction: column;
//     align - items: center;
// }
  
//   .myRighTop_leftServie {
//     display: flex;
//     align - items: center;
//     justify - content: space - between;
//     flex - wrap: wrap;
//     padding: 10px 0;
//     width: 100 %;
// }
  
//   .myRighTop_leftServie img {
//     width: 100px;
//     object - fit: contain;
// }
  
//   .serviceDiv {
//     display: flex;
//     flex - direction: column;
//     align - items: center;
// }
  
//   .myRighTop_leftServie a {
//     text - decoration: none;
//     margin: 10px 0;
//     border - radius: 8px;
//     margin - right: 10px;
//     width: 130px;
//     height: 160px;
//     border - radius: 21px;
//     background: linear - gradient(145deg, #ffffff, #d9d8e6);
//     box - shadow: 5px 5px 10px #898991, -5px - 5px 10px #ffffff;
//     padding: 10px;
//     object - fit: contain;
// }
  
//   .myRighTop_leftServie a: hover {
//     opacity: 0.7;
//     color: #000;
// }
  
//   .myaccountImg {
//     width: 550px;
//     object - fit: contain;
// }
  
//   .myaccountPost {
//     overflow: hidden;
//     /* overflow-x: hidden;
//     overflow-y: scroll; */
// }
  
//   .myaccountPost a {
//     color: black;
// }
  
//   .myaccountPost a: hover {
//     text - decoration: none;
//     color: black;
// }
  
//   .mypostDiv {
//     position: relative;
// }
  
//   .delete {
//     position: relative;
//     top: -127px;
//     right: -290px;
// }

// @media screen and(max - width: 1024px) {
//     .myLeftTop {
//         padding: 30px;
//     }
  
//     .myRighTop_leftServie a {
//         width: 40 %;
//     }
// }

// @media screen and(max - width: 767px) {
//     .myaccount {
//         flex - direction: column;
//         width: 100 %;
//         align - items: center;
//         justify - content: center;
//     }
  
//     .myLeft {
//         width: 100vw;
//         height: 100 %;
//         background: #ffffff;
//         margin - top: 0px;
//         position: relative;
//         top: 0;
//         z - index: 0;
//     }
  
//     .myLeftTop {
//         justify - content: flex - start;
//     }
  
//     .myLeftTop.Avatar {
//         width: 130px;
//         height: 130px;
//     }
  
//     .myRight {
//         width: 100 %;
//         flex - direction: column;
//     }
  
//     .myRighTop {
//         width: 100vw;
//         flex - direction: column;
//         justify - content: center;
//     }
  
//     .myRighTop_leftServie a {
//         margin: 10px 0;
//         width: 48 %;
//     }

//     /* .myaccountPost {
//       width: 90vw;
//     } */
  
//     .delete {
//         top: -128px;
//         right: -210px;
//     }
// }
