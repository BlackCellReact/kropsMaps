/**
 * Created by jlmconsulting on 3/24/18.
 */
import React, {Component} from 'react';
import {Text, View, Button, Alert} from 'react-native';
import MapView from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './StyleSheet'

const KDDeliver = props =>{
console.log(props)
    return (
        <View style={styles.container}>
            <Spinner
                visible={props.state.is_searching}
                textContent={"Looking for drivers..."}
                textStyle={{color: '#FFF'}}/>

            {
                !props.state.has_ride &&
                <View style={styles.form_container}>
                    <Button
                        onPress={props.bookRide}
                        title="Book a Delivery"
                        color="#103D50"
                    />
                </View>
            }

            <View style={styles.map_container}>
                {
                    props.state.origin && props.state.destination &&
                    <View style={styles.origin_destination}>
                        <Text style={styles.label}>Origin: </Text>
                        <Text style={styles.text}>{props.state.origin.name}</Text>

                        <Text style={styles.label}>Destination: </Text>
                        <Text style={styles.text}>{props.state.destination.name}</Text>
                    </View>
                }
                {
                    props.state.location &&
                    <MapView
                        style={styles.map}
                        region={props.state.location}
                    >
                        {
                            props.state.origin && !props.state.has_ridden &&
                            <MapView.Marker
                                coordinate={{
                latitude: props.state.origin.latitude, 
                longitude: props.state.origin.longitude}}
                                title={"You're here"}
                            />
                        }

                        {
                            props.state.driver &&
                            <MapView.Marker
                                coordinate={{
                latitude: props.state.driver.latitude, 
                longitude: props.state.driver.longitude}}
                                title={"Your driver is here"}
                                pinColor={"#4CDB00"}
                            />
                        }
                    </MapView>
                }
            </View>
        </View>
    );
}

export default KDDeliver