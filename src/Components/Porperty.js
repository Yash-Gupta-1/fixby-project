import React, { useEffect, useState } from 'react';
import './Property.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Text } from '@chakra-ui/layout';
import { NavLink } from 'react-router-dom';
import BookmarksSharpIcon from '@material-ui/icons/BookmarksSharp';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { db } from '../firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const Property = (props) => {
    const [saveClicked, setSaveClicked] = useState(false)

    useEffect(() => {
        AOS.init({ duration: 500 })
    }, [])


    const convertTimestamp = (time) => {
        let date = time.toDate();
        let mm = date.getMonth();
        let dd = date.getDate();
        let yyyy = date.getFullYear();

        date = mm + '/' + dd + '/' + yyyy;
        return date;
    }

    const saveProperty = () => {
        console.log('Save fire');
    }

    const deleteProperty = async (id) => {
        try {
            const confirmBox = window.confirm(
                "Do you really want to delete this ad?"
            )
            if (confirmBox === true) {
                await db.collection('propertyData').doc(id).delete();
            }
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <>
            <div className="property m1 mt3" data-aos="fade-up" key={props.id}>
                <div className="propertyImage"  >
                    <NavLink to={`/${props.id}`}>
                        <LazyLoadImage
                            alt={props.img1}
                            src={props.img1}
                            placeholderSrc="https://i0.wp.com/reviveyouthandfamily.org/wp-content/uploads/2016/11/house-placeholder.jpg?ssl=1"
                        // effect="opacity"
                        />
                    </NavLink>
                </div>
                <div className="propDetails" >
                    <div className="rawDis" style={{ justifyContent: "space-between" }}>
                        <Text fontSize="2xl" fontWeight="semibold" m="1">₹ {props.price}</Text>
                        <div className="savepost rawDis m1" onClick={() => saveProperty()}>
                            <div className="rawDis">
                                <button className="delete" onClick={() => deleteProperty(props.id)}><DeleteForeverIcon /></button>
                                {
                                    saveClicked ? (
                                        <div onClick={() => setSaveClicked(false)}>
                                            <BookmarksSharpIcon />
                                        </div>
                                    ) : (
                                        <div onClick={() => setSaveClicked(true)}>
                                            <BookmarksOutlinedIcon />
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                    <div className="rawDis">
                        <Text fontSize="lg" m="1" mr="2">{props.bhk} BHK</Text>
                        <Text fontSize="lg" m="1" mr="2">{props.type}</Text>
                        <Text fontSize="lg" m="1" > For {props.purpose}</Text>
                    </div>
                </div>
                <div className="propDetails_date rawDis mt1" style={{ justifyContent: "space-between" }}>
                    <Text fontSize="sm" fontWeight="normal" m="2">{props.locality}</Text>
                    <Text fontSize="sm" fontWeight="normal" m="2">{convertTimestamp(props.time)}</Text>
                </div>
            </div>
        </>

    )
}

export default Property
