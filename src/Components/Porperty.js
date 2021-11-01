import React, { useEffect, useState } from 'react';
import './Property.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Text } from '@chakra-ui/layout';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { db } from '../firebase';
import { DeleteForever, Edit } from '@material-ui/icons'
import { Backdrop, Fade, IconButton, makeStyles, Modal } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import EditForm from './EditForm';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
        width: '50%',
        height: 'fit-content',
        [theme.breakpoints.up('xs')]: {
            width: '95%',
            height: '70%',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto'
        },
        [theme.breakpoints.up('sm')]: {
            width: '95%',
            height: '70%'
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
            height: '90%'
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '50%',
            height: '80%',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto'

        },
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

}));



const Property = (props) => {
    const [properties, setProperties] = useState([]);
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        AOS.init({ duration: 500 })
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

    useEffect(() => {
        const result = properties.filter(({ data, id }) => {
            if (id === props.id) {
                return data
            }
        })


        setData(result[0])
    }, [properties])

    const convertTimestamp = (time) => {
        // let date = time.toDate();
        // let mm = date.getMonth();
        // let dd = date.getDate();
        // let yyyy = date.getFullYear();

        // date = mm + '/' + dd + '/' + yyyy;
        // return date;
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

    function EditProperty() {
        const classes = useStyles();
        const [open, setOpen] = useState(false);


        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };


        return (
            <div className="addressModal">
                <button className="delete" onClick={() => {
                    handleOpen()
                }}><Edit /></button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <div className="singninHeader">
                                <div></div>

                                <IconButton onClick={handleClose}>
                                    <Close />
                                </IconButton>
                            </div>

                            <div className="divCenter">
                                <EditForm data={data} />
                            </div>

                        </div>
                    </Fade>


                </Modal>
            </div >
        );
    }

    return (
        <>
            <div className="property m1 mt3" data-aos="fade-up" key={props.id}>
                <div className="propertyImage"  >
                    <NavLink to={`/${props.id}`}>
                        <LazyLoadImage
                            alt={props.img1}
                            src={props.img1}
                            placeholderSrc="http://localhost:3000/images/rent1.png"
                        />
                    </NavLink>
                </div>
                <div className="propDetails" >
                    <div className="rawDis" style={{ justifyContent: "space-between" }}>
                        <Text fontSize="2xl" fontWeight="semibold" m="1">₹ {props.price}</Text>
                        <div className="savepost rawDis m1">
                            <div className="rawDis">
                                <button className="delete" onClick={() => deleteProperty(props.id)}><DeleteForever /></button>
                                <EditProperty id={props.id} />
                                {/* {
                                    saveClicked ? (
                                        <div onClick={() => setSaveClicked(false)}>
                                            <BookmarksSharpIcon />
                                        </div>
                                    ) : (
                                        <div onClick={() => setSaveClicked(true)}>
                                            <BookmarksOutlinedIcon />
                                        </div>
                                    )
                                } */}
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
