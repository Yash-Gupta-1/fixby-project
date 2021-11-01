import React from 'react'
import './BottomTabs.css'
import { HomeOutlined, BookmarksOutlined, AddOutlined, AccountCircleOutlined, SearchOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom';

const BottomTabs = () => {
    return (
        <div className="bottomTabsContainr mt-2">
            <div className="bottomTabs">
                <div className="tpCircle"></div>
                <Link to="/" className="bottomTab">
                    <HomeOutlined />
                    <p>Home</p>
                </Link>
                <Link to="#" className="bottomTab mr">
                    <BookmarksOutlined />
                    <p>Saved</p>
                </Link>
                <Link to="/sell-or-rentproperty" className="tpCircle">
                    <AddOutlined />
                    {/* <p>Sell</p> */}
                </Link>
                <Link to="/sell-or-rentproperty" className="bottomTab ml">
                    <SearchOutlined />
                    <p>Search</p>
                </Link>
                <Link to="/myaccount" className="bottomTab">
                    <AccountCircleOutlined />
                    <p>Account</p>
                </Link>
            </div>
        </div>

    )
}

export default BottomTabs
