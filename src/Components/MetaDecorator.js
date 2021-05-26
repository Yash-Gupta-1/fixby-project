import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

// const metaDecorator = require("../../data/metaDecorator");

const MetaDecorator = ({ title, description }) => (
    <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
    </Helmet>
);

MetaDecorator.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default MetaDecorator;