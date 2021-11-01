import React, { useEffect, useState } from 'react';
import './SellForm.css';
import '../Utility.css'
// import { useForm } from 'react-hook-form';
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


const EditForm = (props) => {
    const user = useSelector(selectUser)
    const [editId] = useState(props.data.id)
    const [edit] = useState(props.data.data)
    const [listedBy, setListedBy] = useState(edit.listedBy);
    const [userName] = useState(user.displayName);
    const [purpose, setPurpose] = useState(edit.purpose);
    const [type, setType] = useState(edit.type);
    const [bhkInfo, setBhkInfo] = useState(edit.bhkInfo);
    const [bathrooms, setBathrooms] = useState(edit.bathrooms);
    const [furnishing, setFurnishing] = useState(edit.furnishing);
    const [parking, setParking] = useState(edit.parking);
    const [builtupArea, setBuiltupArea] = useState(edit.builtupArea);
    const [floorNo, setFloorNo] = useState(edit.floorNo);
    const [title, setTitle] = useState(edit.title);
    const [discription, setDiscription] = useState(edit.discription);
    const [city, setCity] = useState(edit.city);
    const [address1, setAddress1] = useState(edit.address1);
    const [address2, setAddress2] = useState(edit.address2);
    const [locality, setLocality] = useState(edit.locality);
    const [price, setPrice] = useState(edit.price);
    const [imageFirst, setImageFirst] = useState(edit.img1);
    const [imageSecond, setImageSecond] = useState(edit.img2);
    const [imageThird, setImageThird] = useState(edit.img3);
    const [imageFourth, setImageFourth] = useState(edit.img4);
    const [imageFifth, setImageFifth] = useState(edit.img5);
    const [published, setPublished] = useState(false);
    const [spin1, setSpin1] = useState(false);
    const [spin2, setSpin2] = useState(false);
    const [spin3, setSpin3] = useState(false);
    const [spin4, setSpin4] = useState(false);
    const [spin5, setSpin5] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUpload = (e) => {
        e.preventDefault()
        setLoading(true)

        db.collection("propertyData").doc(editId).update({
            listedBy: listedBy,
            userName: userName,
            userEmail: user.email,
            purpose: purpose,
            type: type,
            bhkInfo: bhkInfo,
            bathrooms: bathrooms,
            furnishing: furnishing,
            parking: parking,
            builtupArea: builtupArea,
            floorNo: floorNo,
            title: title,
            discription: discription,
            city: city,
            address1: address1,
            address2: address2,
            locality: locality,
            price: price,
            img1: imageFirst,
            img2: imageSecond,
            img3: imageThird,
            img4: imageFourth,
            img5: imageFifth,
            currentUserId: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setTimeout(() => {
            setPublished(true)
            setLoading(false)
        }, 2000)

        setInterval(() => {
            setPublished(false)
        }, 6000)
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
            <MetaDecorator title="FixBy - Sell or Rent Your Property" description="This page available for developer" />

            <form onSubmit={handleUpload}>
                <div className="propertyDetails">
                    <Heading className="h2 center" size="md" mt="10">Property Details</Heading>

                    <FormControl marginTop="5" as="fieldset" isRequired>
                        <FormLabel as="legend">Purpose</FormLabel>
                        <RadioGroup defaultValue="">
                            <HStack display="flex" alignItems="center" spacing="24px" name="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} >
                                <div className="btnOutline">
                                    <Radio value="Sale">Sale</Radio>
                                </div>
                                <div className="btnOutline">
                                    <Radio value="Rent">Rent</Radio>
                                </div>
                            </HStack>
                        </RadioGroup>
                    </FormControl>


                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Type</FormLabel>
                        <Select variant="filled" name="type" placeholder="Select property type" value={type} onChange
                            ={(e) => setType(e.target.value)} required>
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
                        <Select variant="filled" name="bhkinfo" placeholder="BHK Detail" value={bhkInfo} onChange
                            ={(e) => setBhkInfo(e.target.value)}>
                            <option >1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>4 +</option>
                        </Select>
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Bathrooms</FormLabel>
                        <Select variant="filled" name="bathrooms" placeholder="No. of Bathrooms" value={bathrooms} onChange
                            ={(e) => setBathrooms(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>4 +</option>
                        </Select>
                    </FormControl>


                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Furnishing</FormLabel>
                        <Select variant="filled" name="furnishing" placeholder="Furnishing Type" value={furnishing} onChange
                            ={(e) => setFurnishing(e.target.value)}>
                            <option>Furnished</option>
                            <option>Semi-Furnished</option>
                            <option>Unfurnished</option>
                        </Select>
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Parking</FormLabel>
                        <Select variant="filled" name="bathrooms" placeholder="Parking Avaibility" value={parking} onChange
                            ={(e) => setParking(e.target.value)}>
                            <option>Open</option>
                            <option>Close</option>
                        </Select>
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Builtup Area (in gaj)</FormLabel>
                        <Input variant="filled" name="builtupArea" type="text" value={builtupArea} onChange
                            ={(e) => setBuiltupArea(e.target.value)} placeholder="exp: 100" required />
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Floor No</FormLabel>
                        <Input variant="filled" name="floorNo" type="text" value={floorNo} onChange
                            ={(e) => setFloorNo(e.target.value)} placeholder="No. of floors" />
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input variant="filled" name="title" type="text" value={title} onChange
                            ={(e) => setTitle(e.target.value)} placeholder="Title for you post" required />
                    </FormControl>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Discription</FormLabel>
                        <Textarea variant="filled" type="text" value={discription} onChange
                            ={(e) => setDiscription(e.target.value)} placeholder="Discription about your property" required />
                    </FormControl>
                </div>

                <div className="propertyLocation">
                    <Heading className="h2 center" size="md" mt="5">Property Location</Heading>

                    <FormControl marginTop="5" id="title" isRequired>
                        <FormLabel>City</FormLabel>
                        <Input variant="filled" name="city" type="text" value={city} onChange
                            ={(e) => setCity(e.target.value)} placeholder="City" required />
                    </FormControl>

                    <FormControl marginTop="5" id="title" isRequired>
                        <FormLabel>Address 1</FormLabel>
                        <Input variant="filled" name="address1" type="text" value={address1} onChange
                            ={(e) => setAddress1(e.target.value)} placeholder="House No & Street No" required />
                    </FormControl>

                    <FormControl marginTop="5" id="title" isRequired>
                        <FormLabel>Address 2</FormLabel>
                        <Input variant="filled" name="address2" type="text" value={address2} onChange
                            ={(e) => setAddress2(e.target.value)} placeholder="Address" />
                    </FormControl>

                    <FormControl marginTop="5" id="title" isRequired>
                        <FormLabel>Locality</FormLabel>
                        <Input variant="filled" name="locality" type="text" value={locality} onChange
                            ={(e) => setLocality(e.target.value)} placeholder="Locality" required />
                    </FormControl>
                </div>

                <div className="propertyPriceandPhotos">

                    <Heading className="h2 center" size="md" mt="5">Price</Heading>

                    <FormControl marginTop="5" isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input value={price} onChange={(e) => setPrice(e.target.value)} variant="filled" name="price" type="text" placeholder="Price in Rupees" />
                        <FormHelperText>Price should be greater than 2000</FormHelperText>
                    </FormControl>

                    {/* {
                        purpose === "Sale" ? (
                            <div className="sellorrentPics mt4">
                                <div className="sellorrentPics_Top">
                                    <Heading className="h2 center" size="md" mt="20">Photos</Heading>
                                    <Text color="dodgerblue">Post best 5 photos</Text>
                                </div>

                                <div className="sellorrentPics_Bottom mt5">

                                    <FormLabel isRequired>
                                        <Input display="none" variant="filled" name="First" type="file" onChange={handleChangeFirst} required />
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
                                        <Input display="none" variant="filled" name="Second" type="file" onChange={handleChangeSecond} />
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
                                        <Input display="none" variant="filled" name="Third" type="file" onChange={handleChangeThird} />
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
                                        <Input display="none" variant="filled" name="Fourth" type="file" onChange={handleChangeFourth} />
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
                                        <Input display="none" variant="filled" name="Fifth" type="file" onChange={handleChangeFifth} />
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
                        ) : (
                            <div className="sellorrentPics mt4">
                                <div className="sellorrentPics_Top">
                                    <Heading className="h2 center" size="md" mt="20">Photos</Heading>
                                    <Text color="dodgerblue">Post best 2 photos</Text>
                                </div>

                                <div className="sellorrentPics_Bottom mt5">

                                    <FormLabel isRequired>
                                        <Input display="none" variant="filled" type="file" onChange={handleChangeFirst} required />
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
                                </div>

                            </div>
                        )
                    } */}

                </div>

                <div className="submitbtn center">
                    <button className="btnFill mt5 mb5 m1" type="submit">
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
                                    Your post has been updated.
                                </AlertDescription>
                            </Box>
                        </Alert>
                    </div>
                )
            }
        </div >
    )

}

export default EditForm
