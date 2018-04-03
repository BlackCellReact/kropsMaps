import React, {Component} from 'react';
import {View, Button, Alert} from 'react-native';

import Pusher from 'pusher-js/react-native';
import RNGooglePlacePicker from 'react-native-google-place-picker';
import Geocoder from 'react-native-geocoding';
import KFDirectionsComponent from './Component';
import {regionFrom, getLatLonDiffInMeters} from './helpers';

Geocoder.setApiKey('AIzaSyABwo72uGqmjYtA0pH-mdJ4bIdd54g2kqU');

class KFDirections extends Component {

    constructor() {
        super();

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            concat: null,
            coords:[],
            x: 'false',
            cordLatitude:14.684,
            cordLongitude:120.9054654,
        };
        this.mergeLot = this.mergeLot.bind(this);

    }

    componentDidMount() {
        this._setCurrentLocation();
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                this.mergeLot();
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );

    }
    
    handleMarkerPress(){
        Alert.alert('You pressed me!')
    }

    mergeLot(){
        if (this.state.latitude != null && this.state.longitude!=null)
        {
            let concatLot = this.state.latitude +","+this.state.longitude
            this.setState({
                concat: concatLot
            }, () => {
                this.getDirections(concatLot, "-6.270565,106.759550");
            });
        }

    }

    async getDirections(startLoc, destinationLoc) {

        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            this.setState({x: "true"})
            return coords
        } catch(error) {
            console.log('masuk fungsi')
            this.setState({x: "error"})
            return error
        }
    }
    _setCurrentLocation() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                var region = regionFrom(
                    position.coords.latitude,
                    position.coords.longitude,
                    position.coords.accuracy
                );
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                })
                Geocoder.getFromLatLng(position.coords.latitude, position.coords.longitude).then(
                    (json) => {
                        var address_component = json.results[0].address_components[0];

                        this.setState({
                            origin: {
                                name: address_component.long_name,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            },
                            location: region,
                            destination: null,
                            has_ride: false,
                            has_ridden: false,
                            driver: null
                        });

                    },
                    (error) => {
                        console.log('err geocoding: ', error);
                    }
                );

            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: false, timeout: 10000, maximumAge: 3000},
        );

    }


    render() {

        return (
            <KFDirectionsComponent
                state={this.state}
                handleMarkerPress={this.handleMarkerPress.bind(this)}
               />
        );
    }

}

export default KFDirections