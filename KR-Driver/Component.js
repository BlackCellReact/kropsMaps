/**
 * Created by jlmconsulting on 3/24/18.
 */
import React, { Component } from 'react';
import {
    View,
    Alert
} from 'react-native';
import MapView from 'react-native-maps';
import styles from './StyleSheet'

const KDDriver = props =>{

    return (
        <View style={styles.container}>
            {
                props.state.region &&
                <MapView
                    style={styles.map}
                    region={props.state.region}
                >
                    <MapView.Marker
                        coordinate={{
                latitude: props.state.region.latitude, 
                longitude: props.state.region.longitude}}
                        title={"You're here"}
                    />

                    {
                        props.state.passenger && !props.state.has_ridden &&
                        <MapView.Marker
                            coordinate={{
                  latitude: props.state.passenger.pickup.latitude, 
                  longitude: props.state.passenger.pickup.longitude}}
                            title={"Your passenger is here"}
                            pinColor={"#4CDB00"}
                        />
                    }
                </MapView>
            }
        </View>
    );
}

export default KDDriver