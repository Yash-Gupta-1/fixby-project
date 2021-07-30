import { Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import './UserProfile.css';
import MetaDecorator from '../Components/MetaDecorator';

const UserProfile = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        db
            .collection('propertyData')
            .orderBy('timestamp', 'desc')
            .onSnapshot(
                snapshot => {
                    setProfile(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })
                    ))
                })
    }, [])

    return (
        <div className='userProfile'>
            <MetaDecorator title="FixBy - User Profile" description="This page available for developer" />
            <Heading as="h1" size="lg" className="center h1 mt3 mb3">User Details</Heading>
            <div className="profileBox p2 mb2">
                <table>
                    <tr>
                        <th>No.</th>
                        <th>User Id</th>
                        <th>Profile</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Phone No</th>
                        <th>User Address</th>
                        <th>Property Id</th>
                    </tr>
                    {
                        profile.map(({ id, data }, index) => (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{data.currentUserId.substring(0, 7)}</td>
                                <td>{data.listedBy}</td>
                                <td>{data.userName}</td>
                                <td>{data.userEmail}</td>
                                <td>{data.userNumber}</td>
                                <td>{data.address1}</td>
                                <td>{id.substring(0, 7)}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}

export default UserProfile
