import React from 'react';
import './NotFound.css';
import { Heading } from '@chakra-ui/react';

const NotFound = () => {
    return (
        <div className="notFound">
            <Heading>Not Found</Heading>
            <img src="/images/notfound.png" alt="Not Found" />
        </div>
    )
}

export default NotFound
