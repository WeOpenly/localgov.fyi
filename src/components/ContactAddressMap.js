import React from 'react';
import AddressGoogleMap from './AddressGoogleMap';

const ContactAddressMap = ({ contactAddress }) => {
    return (contactAddress ? (<AddressGoogleMap
        containerElement={
            <div style={{ height: "275px", width: "100%" }} />
        }
        mapElement={
            <div style={{ height: "275px", width: "100%" }} />
        }
        address={contactAddress}
    />) : null);
}

export default ContactAddressMap;