import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
const windowGlobal = typeof window !== 'undefined' && window

class AddressGoogleMap extends Component {
    constructor(props) {
        super(props);
        this.geocoder = undefined;
        this.state = {
            lat: '',
            lng: ''
        }
    }

    componentDidMount() {
        if (typeof window === 'undefined') {
            return
        }
        // grab our googleMaps obj from whever she may lay
        var googleMaps = this.props.googleMaps ||
(windowGlobal.google && // eslint-disable-line no-extra-parens
            windowGlobal.google.maps) ||
            this.googleMaps

        if (!googleMaps) {
            console.error(// eslint-disable-line no-console
                'Google map api was not found in the page.')
            return
        }
        // now grab the services we need
        this.googleMaps = googleMaps
        this.geocoder = new googleMaps.Geocoder()
        const address = this.props.address;
        const that = this;
        this.geocoder.geocode({ 'address': address }, function (results, status) {
            if (results && results.length > 0) {
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                that.setState({
                    lat,
                    lng
                });
            } else {
                console.error("Geocode was not successful for the following reason: " + status);
            }
        });
    }


    render() {
        if (this.state.lat === '' && this.state.lng === '') {
            return null;
        }

        const marker = {
            position: {
                lat: this.state.lat,
                lng: this.state.lng,
            },
            defaultAnimation: 2,
        }

        return (<GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
            onClick={() => { }}
        >
            <Marker
                {...marker}
                onRightClick={() => { }}
            />
        </GoogleMap>);
    }
}


export default withScriptjs(withGoogleMap(AddressGoogleMap))
// const mapComp = (
//     <AGMP
//     isMarkerShown
//     googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC1d6ej2p77--6Wf8m6dzdrbvKhfBnb3Ks&libraries=places"
// />)
// export default mapComp