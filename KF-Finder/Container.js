import React, {Component} from 'react';
import {
    View,
    Alert
} from 'react-native';

import Geocoder from 'react-native-geocoding';
import KFFinderComponent from './Component';

import {regionFrom, getLatLonDiffInMeters} from './helpers';

Geocoder.setApiKey('AIzaSyABwo72uGqmjYtA0pH-mdJ4bIdd54g2kqU');

class KFFinder extends Component {
    state = {

        region: {
            latitude: 0,
            longitude: 0
        },
        
        // yourLocation:'',
        // mapView:''
    }

    constructor() {
        super();


    }

    componentWillMount() {

        this.setCurrentLocation()

    }

   async setCurrentLocation() {

       // Geocoder.getFromLocation("Colosseum").then(
       //     json => {
       //         var location = json.results[0].geometry.location;
       //         alert(location.lat + ", " + location.lng);
       //     },
       //     error => {
       //         alert(error);
       //     }
       // );

       // const location =  !!this.latitude && !!this.longitude
       // const mapView = <MapView.Marker
       //     coordinate={{"latitude":props.state.latitude,"longitude":props.state.longitude}}
       //     title={"Your Location"}
       // />
       
       this.setState({
           latitude:14.6849688,
           longitude:121.1054654,
           // yourLocation : location,
           // mapView: mapView

       })
       await Geocoder.getFromLocation("Colosseum").then(json => {




               console.log(json)
               var location = json.results[0].geometry.location;
               // alert(location.lat + ", " + location.lng);

               this.setState({
                   cordLatitude: location.lat,
                   cordLongitude: location.lat
               })




               var ç = regionFrom(
                   location.lat,
                   location.lat,
                   0
               );


               this.setState({
                   origin: {
                       name:regioin,
                       latitude: location.lat,
                       longitude: location.lng
                   },
                   location: region,
                   destination: null,
                   has_ride: false,
                   has_ridden: false,
                   driver: null
               });
           },
           error => {
               alert(error);
           }
       );
       // Geocoder.getFromLatLng(41.89, 12.49).then(
       //     json => {
       //         var address_component = json.results[0].address_components[0];
       //         alert(address_component.long_name);
       //     },
       //     error => {
       //         alert(error);
       //     }
       // );
       // Geocoder.getFromLocation("Colosseum").then(json => {
       //
       //         console.log(json)
       //         var location = json.results[0].geometry.location;
       //         // alert(location.lat + ", " + location.lng);
       //
       //         var region = regionFrom(
       //             location.lat,
       //             location.lng,
       //             0
       //         );
       //         this.setState({
       //             origin: {
       //                 name: '',
       //                 latitude: location.lat,
       //                 longitude: location.lng
       //             },
       //             location: region,
       //             destination: null,
       //             has_ride: false,
       //             has_ridden: false,
       //             driver: null
       //         });
       //     },
       //     error => {
       //         alert(error);
       //     }
       // );

    }
    
       

    handleMarkerPress(){
        Alert.alert('You pressed me!')
    }

    render() {
       
        return (
            <KFFinderComponent
                state={this.state}
                handleMarkerPress={this.handleMarkerPress.bind(this)}
            />
        );
    }
}

export default  KFFinder 