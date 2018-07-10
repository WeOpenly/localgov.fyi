import React from 'react';
import Spinner from 'react-spinkit';

import AddressGoogleMap from './AddressGoogleMap';

const ContactAddressMap = ({ contactAddress }) => {
    return (contactAddress ? (<AddressGoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC1d6ej2p77--6Wf8m6dzdrbvKhfBnb3Ks&libraries=places"
        loadingElement={<div style={{ height: "275px", width: "100%" }} />}
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