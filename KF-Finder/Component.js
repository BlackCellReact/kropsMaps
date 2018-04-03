/**
 * Created by jlmconsulting on 3/24/18.
 */
import React, { Component } from 'react';
import {
    View,
    Alert,
    TouchableOpacity,
    Text
} from 'react-native';
import MapView from 'react-native-maps';

import styles from './StyleSheet'

const KDDriver = props =>{

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
       latitude:props.state.latitude,
       longitude:props.state.longitude,
       latitudeDelta: 1,
       longitudeDelta: 1
      }}>


                {!!props.state.latitude && !!props.state.longitude && <MapView.Marker
                    coordinate={{"latitude":props.state.latitude,"longitude":props.state.longitude}}
                    title={"Your Location"}
                />}

                {!!props.state.cordLatitude && !!props.state.cordLongitude && <MapView.Marker
                    coordinate={{"latitude":props.state.cordLatitude,"longitude":props.state.cordLongitude}}
                    title={"Your Destination"}
                />}


                {!!props.state.latitude && !!props.state.longitude && props.state.x == 'true' && <MapView.Polyline
                    coordinate={{"latitude":props.state.cordLatitude,"longitude":props.state.cordLongitude}}
                    strokeWidth={2}
                    strokeColor="red"/>
                }

                {!!props.state.latitude && !!props.state.longitude && props.state.x == 'error' && <MapView.Polyline
                    coordinates={[
              {latitude: props.state.latitude, longitude: props.state.longitude},
              {latitude: props.state.cordLatitude, longitude: props.state.cordLongitude},
          ]}
                    strokeWidth={2}
                    strokeColor="red"/>
                }
            </MapView>
            <TouchableOpacity style={styles.findButton} onPress={()=>props.handleMarkerPress()}>
                <Text style={styles.findButtonText}>Find Products</Text>
            </TouchableOpacity>
        </View>
    );
}

export default KDDriver