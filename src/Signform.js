import React, { useState } from 'react';
import './SellForm.css';
import '../Utility.css'
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import {
    FormControl, FormLabel, HStack, RadioGroup, Radio, Select, Input, Alert, AlertTitle, AlertDescription, AlertIcon, Box, Textarea, Heading, Text, FormHelperText
} from "@chakra-ui/react"
import { db, storage } from '../firebase';
import firebase from "firebase";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import MetaDecorator from '../Components/MetaDecorator';
import HouseOutlinedIcon from '@material-ui/icons/HouseOutlined';
import { Spinner } from "@chakra-ui/react"

// const schema = yup.object().shape({
//     userName: yup.string().required(),
//     price: yup.string().min("5000").required(),
// });

const SellForm = () => {
    const user = useSelector(selectUser)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [listedBy, setListedBy] = useState('');
    const [userName, setUserName] = useState(user.displayName);
    const [userNumber, setUserNumber] = useState('');
    const [purpose, setPurpose] = useState('');
    const [type, setType] = useState('');
    const [bhkInfo, setBhkInfo] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [furnishing, setFurnishing] = useState('');
    const [parking, setParking] = useState('');
    const [builtupArea, setBuiltupArea] = useState('');
    const [floorNo, setFloorNo] = useState('');
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [city, setCity] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [locality, setLocality] = useState('');
    const [price, setPrice] = useState('');
    const [imageFirst, setImageFirst] = useState('');
    const [imageSecond, setImageSecond] = useState('');
    const [imageThird, setImageThird] = useState('');
    const [imageFourth, setImageFourth] = useState('');
    const [imageFifth, setImageFifth] = useState('');
    const [published, setPublished] = useState(false);
    const [spin1, setSpin1] = useState(false);
    const [spin2, setSpin2] = useState(false);
    const [spin3, setSpin3] = useState(false);
    const [spin4, setSpin4] = useState(false);
    const [spin5, setSpin5] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUpload = (data) => {
        console.log('Form Data', data);

        // setLoading(true)
        // db.collection("propertyData").add({
        //     listedBy: listedBy,
        //     userName: userName,
        //     userNumber: userNumber,
        //     userEmail: user.email,
        //     purpose: purpose,
        //     type: type,
        //     bhkInfo: bhkInfo,
        //     bathrooms: bathrooms,
        //     furnishing: furnishing,
        //     parking: parking,
        //     builtupArea: builtupArea,
        //     floorNo: floorNo,
        //     title: title,
        //     discription: discription,
        //     city: city,
        //     address1: address1,
        //     address2: address2,
        //     locality: locality,
        //     price: price,
        //     img1: imageFirst,
        //     img2: imageSecond,
        //     img3: imageThird,
        //     img4: imageFourth,
        //     img5: imageFifth,
        //     currentUserId: user.uid,
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // });

        // setTimeout(() => {
        //     setPublished(true)
        //     setLoading(false)
        // }, 2000)

        // setInterval(() => {
        //     setPublished(false)
        // }, 6000)

        // setPurpose("")
        // setListedBy("")
        // setType("")
        // setBhkInfo("")
        // setBathrooms("")
        // setFurnishing("")
        // setBuiltupArea("")
        // setParking("")
        // setFloorNo("")
        // setTitle("")
        // setDiscription("")
        // setPrice("")
        // setImageFirst("")
        // setImageSecond("")
        // setImageThird("")
        // setImageFourth("")
        // setImageFifth("")
    };


    const handleChangeFirst = async (e) => {
        setSpin1(true)
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`images/${file.name}`);
            await fileRef.put(file);
            setImageFirst(await fileRef.getDownloadURL());
            setSpin1(false)
        }
    };

    const handleChangeSecond = async (e) => {
        setSpin2(true)
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`images/${file.name}`);
            await fileRef.put(file);
            setImageSecond(await fileRef.getDownloadURL());
            setSpin2(false)
        }
    };

    const handleChangeThird = async (e) => {
        setSpin3(true)
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`images/${file.name}`);
            await fileRef.put(file);
            setImageThird(await fileRef.getDownloadURL());
            setSpin3(false)
        }
    };

    const handleChangeFourth = async (e) => {
        setSpin4(true)
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`images/${file.name}`);
            await fileRef.put(file);
            setImageFourth(await fileRef.getDownloadURL());
            setSpin4(false)
        }
    };

    const handleChangeFifth = async (e) => {
        setSpin5(true)
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`images/${file.name}`);
            await fileRef.put(file);
            setImageFifth(await fileRef.getDownloadURL());
            setSpin5(false)
        }
    };

    return (
        <div className="sellform">
            <MetaDecorator title="FixBuy - Sell or Rent Your Property" description="This page available for developer" />

            <form onSubmit={handleSubmit(handleUpload)}>
                {/* <div className="personalDetail">
                    <Heading className="h2 center" size="md" mt="10">Personal Details</Heading>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Listed By</FormLabel>
                        <Select variant="filled" placeholder="Select profile" {...register("listedBy", { required: "This information is required" })}>
                            <option>Owner</option>
                            <option>Builder</option>
                            <option>Agent</option>
                        </Select>
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Your Name</FormLabel>
                        <Input variant="filled" name="userName" type="text" {...register("userName", { required: "This information is required" })} placeholder="Type your Name" required />
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Phone Number</FormLabel>
                        <Input variant="filled" name="userNumber" type="phone" {...register("userNumber", { required: "This information is required" })} placeholder="Type your Number" />
                        <FormHelperText>Please provide valid and currently used number</FormHelperText>
                    </FormControl>
                </div> */}

                <div className="propertyDetails">
                    <Heading className="h2 center" size="md" mt="10">Property Details</Heading>

                    <FormControl marginTop="5" as="fieldset" isRequired>
                        <FormLabel as="legend">Purpose</FormLabel>
                        <RadioGroup defaultValue="">
                            <HStack display="flex" alignItems="center" spacing="24px" name="purpose" {...register("purpose", { required: "This information is required" })} >
                                <div className="btnOutline">
                                    <Radio value="Sale">Sale</Radio>
                                </div>
                                <div className="btnOutline">
                                    <Radio value="Rent">Rent</Radio>
                                </div>
                            </HStack>
                        </RadioGroup>
                    </FormControl>


                    <FormControl marginTop="5" isRequired >
                        <FormLabel>Type</FormLabel>
                        <Select variant="filled" name="type" placeholder="Select property type" {...register("type", { required: "This information is required" })} required>
                            <option>House</option>
                            <option>Flats</option>
                            <option>Land</option>
                            <option>Villa</option>
                            <option>Farm House</option>
                        </Select>
                        {/* <Input type="floorNo" value={type} onChange
                                    ={(e) => setType(e.target.value)} placeholder="Exp-(House, flat, )" /> */}
                    </FormControl>


                    <FormControl marginTop="5" isRequired>
                        <FormLabel>BHK</FormLabel>
                        <Select variant="filled" name="bhkinfo" placeholder="BHK Detail" {...register("bhkinfo", { required: "This information is required" })}>
                            <option >1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>4 +</option>
                        </Select>
                        {/* <p style={{ color: "red" }}>{errors.bhkinfo?.message}</p> */}
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Bathrooms</FormLabel>
                        <Select variant="filled" name="bathrooms" placeholder="No. of Bathrooms" {...register("bathrooms", { required: "This information is required" })}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>4 +</option>
                        </Select>
                    </FormControl>


                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Furnishing</FormLabel>
                        <Select variant="filled" name="furnishing" placeholder="Furnishing Type" {...register("furnishing", { required: "This information is required" })}>
                            <option>Furnished</option>
                            <option>Semi-Furnished</option>
                            <option>Unfurnished</option>
                        </Select>
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Parking</FormLabel>
                        <Select variant="filled" name="parking" placeholder="Parking Avaibility" {...register("parking", { required: "This information is required" })}>
                            <option>Yes</option>
                            <option>No</option>
                        </Select>
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Builtup Area (in gaj)</FormLabel>
                        <Input variant="filled" name="builtupArea" type="text" {...register("builtupArea", { required: "This information is required" })} placeholder="exp: 100" required />
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Floor No</FormLabel>
                        <Input variant="filled" name="floorNo" type="text" {...register("floorNo", { required: "This information is required" })} placeholder="No. of floors" />
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input variant="filled" name="title" type="text" {...register("title", { required: "This information is required" })} placeholder="Title for you post" required />
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea variant="filled" name="discription" type="text" {...register("discription", { required: "This information is required" })} placeholder="Description about your property" required />
                    </FormControl>
                </div>

                <div className="propertyLocation">
                    <Heading className="h2 center" size="md" mt="5">Property Location</Heading>

                    <FormControl marginTop="5" id="title" isRequired>
                        <FormLabel>City</FormLabel>
                        <Input variant="filled" name="city" type="text" {...register("city", { required: "This information is required" })} placeholder="City" required />
                    </FormControl>

                    <FormControl marginTop="5" id="title" isRequired>
                        <FormLabel>Address 1</FormLabel>
                        <Input variant="filled" name="address1" type="text" {...register("address1", { required: "This information is required" })} placeholder="House No & Street No" required />
                    </FormControl>

                    <FormControl marginTop="5" id="title" isRequired>
                        <FormLabel>Address 2</FormLabel>
                        <Input variant="filled" name="address2" type="text" {...register("address2", { required: "This information is required" })} placeholder="Address" />
                    </FormControl>

                    <FormControl marginTop="5" id="title" isRequired>
                        <FormLabel>Locality</FormLabel>
                        <Input variant="filled" name="locality" type="text" {...register("locality", { required: "This information is required" })} placeholder="Locality" required />
                    </FormControl>
                </div>

                <div className="propertyPriceandPhotos">

                    <Heading className="h2 center" size="md" mt="5">Price</Heading>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input {...register("price", { required: true })} variant="filled" name="price" type="text" placeholder="Price in Rupees" />
                        <FormHelperText>Price should be greater than 2000</FormHelperText>
                    </FormControl>
                    <p style={{ color: "red" }}>{errors.price?.message}</p>

                    <div className="sellorrentPics mt4">
                        <div className="sellorrentPics_Top">
                            <Heading className="h2 center" size="md" mt="20">Photos</Heading>
                            <Text color="dodgerblue">Post best 5 photos</Text>
                        </div>

                        <div className="sellorrentPics_Bottom mt5">

                            <FormLabel isRequired>
                                <Input display="none" variant="filled" name="photoFirst" type="file" onChange={handleChangeFirst} required />
                                <span className="customFile">
                                    {
                                        imageFirst ? (
                                            <img src={imageFirst} alt="First" />
                                        ) : (
                                            spin1 ? <Spinner /> : <HouseOutlinedIcon />
                                        )
                                    }
                                </span>
                            </FormLabel>

                            <FormLabel isRequired>
                                <Input display="none" variant="filled" name="photoSecond" type="file" onChange={handleChangeSecond} />
                                <span className="customFile">
                                    {
                                        imageSecond ? (
                                            <img src={imageSecond} alt="Second" />
                                        ) : (
                                            spin2 ? <Spinner /> : <HouseOutlinedIcon />
                                        )
                                    }
                                </span>
                            </FormLabel>

                            <FormLabel isRequired>
                                <Input display="none" variant="filled" name="photoThird" type="file" onChange={handleChangeThird} />
                                <span className="customFile">
                                    {
                                        imageThird ? (
                                            <img src={imageThird} alt="Third" />
                                        ) : (
                                            spin3 ? <Spinner /> : <HouseOutlinedIcon />
                                        )
                                    }
                                </span>
                            </FormLabel>

                            <FormLabel isRequired>
                                <Input display="none" variant="filled" name="photoFourth" type="file" onChange={handleChangeFourth} />
                                <span className="customFile">
                                    {
                                        imageFourth ? (
                                            <img src={imageFourth} alt="Fourth" />
                                        ) : (
                                            spin4 ? <Spinner /> : <HouseOutlinedIcon />
                                        )
                                    }
                                </span>
                            </FormLabel>

                            <FormLabel isRequired>
                                <Input display="none" variant="filled" name="photoFifth" type="file" onChange={handleChangeFifth} />
                                <span className="customFile">
                                    {
                                        imageFifth ? (
                                            <img src={imageFifth} alt="Fith" />
                                        ) : (
                                            spin5 ? <Spinner /> : <HouseOutlinedIcon />
                                        )
                                    }
                                </span>
                            </FormLabel>
                        </div>

                    </div>

                </div>

                <div className="submitbtn center">
                    <button style={{ cursor: !imageFirst ? "not-allowed" : "pointer" }} className="btnFill mt5 mb5 m1" type="submit">
                        {
                            loading ? <Spinner /> : "Submit"
                        }
                    </button>
                </div>
            </form >

            {
                published && (
                    <div className="published">
                        <Alert status="info">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Success!</AlertTitle>
                                <AlertDescription display="block">
                                    Your post has been uploaded.
                                </AlertDescription>
                            </Box>
                        </Alert>
                    </div>
                )
            }
        </div >
    )

}

export default SellForm
