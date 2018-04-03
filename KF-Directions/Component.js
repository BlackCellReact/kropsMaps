/**
 * Created by jlmconsulting on 3/24/18.
 */
import React, {Component} from 'react';
import {Text, View, Button, Alert, Image, TouchableOpacity, ImageBackground} from 'react-native';
import MapView from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './StyleSheet'

import Icon from 'react-native-vector-icons/FontAwesome';

const KFDirections = props =>{

    console.log(props);

    return (

        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
               latitude:14.6849688,
           longitude:121.1054654,
               latitudeDelta: 1,
               longitudeDelta: 1
            }}>

                {!!props.state.latitude && !!props.state.longitude && <MapView.Marker
                    coordinate={{"latitude":props.state.latitude,"longitude":props.state.longitude}}
                    title={"Your Location"}
                />}

                {!!props.state.cordLatitude && !!props.state.cordLongitude &&
                    <MapView.Marker.Animated
                        coordinate={{"latitude":props.state.cordLatitude,"longitude":props.state.cordLongitude}}
                        title={"Your Destination"}
                        image={require('../Images/kropsMarker.png')}
                    >
                        <MapView.Callout onPress={()=>props.handleMarkerPress()}>
                            <View style={styles.deliveryCardTop}>
                                <Image
                                    source={require('../Images/rider.png')}
                                    style={styles.riderImage}
                                />
                                <View style={styles.riderDetails}>
                                    <View style={styles.detailsRow}>
                                        <View style={styles.detailsContainer}>
                                            <Text style={styles.detailsName}>Juan Dela Cruz</Text>
                                        </View>
                                    </View>
                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.detailsText}>
                                            16 Level, The Enterprise Tower 2, Paseo De Roxas, Makati, Philippines
                                        </Text>
                                    </View>
                                    <Text style={styles.detailsTime}>
                                        Today 10:00 AM
                                    </Text>
                                </View>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker.Animated>}

                {!!props.state.latitude && !!props.state.longitude && props.state.x == 'true' && <MapView.Polyline
                    coordinates={props.state.coords}
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
            <View style={styles.trackerCard}>
                <Image
                    source={require('../Images/rider.png')}
                    style={styles.trackerImage}
                />
                <View style={styles.riderDetails}>
                    <View style={styles.trackerRow}>
                        <Image
                            source={require('../Images/kropsMarker.png')}
                            style={styles.trackerIcon}
                        />
                        <Text style={styles.trackerTime}>10 mins</Text>
                    </View>
                    <Text style={styles.trackerDetails}>
                        16 Level, The Enterprise Tower 2, Paseo De Roxas, Makati, Philippines
                    </Text>
                </View>
                <TouchableOpacity style={styles.messageButton}>
                    <Text style={styles.messageText}>
                        <Icon name='envelope' size={12}/>   Message
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default KFDirections