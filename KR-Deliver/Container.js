import React, {Component} from 'react';
import {View, Button, Alert} from 'react-native';

import Pusher from 'pusher-js/react-native';
import RNGooglePlacePicker from 'react-native-google-place-picker';
import Geocoder from 'react-native-geocoding';
import KDDeliverComponent from './Component';
import {regionFrom, getLatLonDiffInMeters} from './helpers';

Geocoder.setApiKey('AIzaSyABwo72uGqmjYtA0pH-mdJ4bIdd54g2kqU');

class KDDeliver extends Component {

    state = {
        location: null,
        error: null,
        has_ride: false,
        destination: null,
        driver: null,
        origin: null,
        is_searching: false,
        has_ridden: false
    };

    constructor() {
        super();
        this.username = 'wernancheta';
        this.available_drivers_channel = null;
        this.bookRide = this.bookRide.bind(this);
        this.user_ride_channel = null;
        
    }
    
    bookRide() {
        
        RNGooglePlacePicker.show((response) => {
            if (response.didCancel) {
                console.log('User cancelled GooglePlacePicker', response.didCancel);
            } else if (response.error) {
                console.log('GooglePlacePicker Error: ', response.error);
            } else {
                this.setState({
                    is_searching: true,
                    destination: response
                });

                let pickup_data = {
                    name: this.state.origin.name,
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude
                };

                let dropoff_data = {
                    name: response.name,
                    latitude: response.latitude,
                    longitude: response.longitude
                };

                this.available_drivers_channel.trigger('client-driver-request', {
                    username: this.username,
                    pickup: pickup_data,
                    dropoff: dropoff_data
                });

            }
        });
    }


    _setCurrentLocation() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                var region = regionFrom(
                    position.coords.latitude,
                    position.coords.longitude,
                    position.coords.accuracy
                );

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

    componentDidMount() {

        this._setCurrentLocation();

        var pusher = new Pusher('1eb038088ef8ffebce1b', {
            authEndpoint: 'https://krops-driver.herokuapp.com/',
            cluster: 'ap1',
            encrypted: true
        });


        // var channel = pusher.subscribe('krops-rider-app');
        // channel.bind('my-event', function (data) {
        //     alert(data.message);
        // });
        this.available_drivers_channel = pusher.subscribe('private-available-drivers');

        this.user_ride_channel = pusher.subscribe('private-ride-' + this.username);

        this.user_ride_channel.bind('client-driver-response', (data) => {

            let passenger_response = 'no';
            if (!this.state.has_ride) {
                passenger_response = 'yes';
            }

            // passenger responds to driver's response
            this.user_ride_channel.trigger('client-driver-response', {
                response: passenger_response
            });
        });

        this.user_ride_channel.bind('client-found-driver', (data) => {
            // found driver, the passenger has no say about this.
            // once a driver is found, this will be the driver that's going to drive the user
            // to their destination
            let region = regionFrom(
                data.location.latitude,
                data.location.longitude,
                data.location.accuracy
            );

            this.setState({
                has_ride: true,
                is_searching: false,
                location: region,
                driver: {
                    latitude: data.location.latitude,
                    longitude: data.location.longitude,
                    accuracy: data.location.accuracy
                }
            });

            Alert.alert(
                "Orayt!",
                "We found you a driver. \nName: " + data.driver.name + "\nCurrent location: " + data.location.name,
                [
                    {
                        text: 'Sweet!'
                    },
                ],
                {cancelable: false}
            );

        });

        this.user_ride_channel.bind('client-driver-location', (data) => {
            // driver location received
            let region = regionFrom(
                data.latitude,
                data.longitude,
                data.accuracy
            );

            this.setState({
                location: region,
                driver: {
                    latitude: data.latitude,
                    longitude: data.longitude
                }
            });

        });

        this.user_ride_channel.bind('client-driver-message', (data) => {
            if (data.type == 'near_pickup') {
                //remove passenger marker
                this.setState({
                    has_ridden: true
                });
            }

            if (data.type == 'near_dropoff') {
                this._setCurrentLocation();
            }

            Alert.alert(
                data.title,
                data.msg,
                [
                    {
                        text: 'Aye sir!'
                    },
                ],
                {cancelable: false}
            );
        });

    }

    render() {
        return (
            <KDDeliverComponent
                state={this.state}
                bookRide={this.bookRide}/>
        );
    }

}

export default KDDeliver