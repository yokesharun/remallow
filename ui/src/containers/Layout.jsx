import React from 'react';
import Navigation from '../components/Navigation';
import List from '../components/List';
import './style.css';

const Layout  = () => {
    return (
        <div className="container is-max-widescreen">
            <Navigation />
            <List />
        </div>
    )
}

export default Layout;