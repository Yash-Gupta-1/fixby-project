import React, { useEffect, useState } from 'react';
import './Property.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Text } from '@chakra-ui/layout';
import { NavLink } from 'react-router-dom';
import BookmarksSharpIcon from '@material-ui/icons/BookmarksSharp';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';

const Property = ({ id, title, purpose, price, img1, time, locality, bhk, type }) => {
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

    return (
        <>
            <div className="property m1 mt3" data-aos="fade-up" key={id}>
                <div className="propertyImage" >
                    <NavLink to={`/property/${id}`}>
                        <img
                            src={img1}
                            alt={title}
                        />
                    </NavLink>
                </div>
                <div className="propDetails mt1">
                    <div className="rawDis" style={{ justifyContent: "space-between" }}>
                        <Text fontSize="2xl" fontWeight="semibold" m="1">₹ {price}</Text>
                        <div className="savepost rawDis m1" onClick={() => saveProperty()}>
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
                    <div className="rawDis">
                        <Text fontSize="lg" m="1" mr="2">{bhk} BHK</Text>
                        <Text fontSize="lg" m="1" mr="2">{type}</Text>
                        <Text fontSize="lg" m="1" > For {purpose}</Text>
                    </div>
                </div>
                <div className="propDetails_date rawDis mt1" style={{ justifyContent: "space-between" }}>
                    <Text fontSize="sm" fontWeight="normal" m="2">{locality}</Text>
                    <Text fontSize="sm" fontWeight="normal" m="2">{convertTimestamp(time)}</Text>
                </div>
            </div>
        </>

    )
}

export default Property
