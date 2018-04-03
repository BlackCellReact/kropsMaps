/**
 * Created by jlmconsulting on 3/24/18.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button, Alert, Dimensions} from 'react-native';

const deviceDimes = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    findButton:{
        backgroundColor:'#5f9f0d',
        padding:15,
        alignItems:'center',
        justifyContent:'center',
        width:deviceDimes.width-60,
        position:'absolute',
        zIndex:2,
        bottom:30,
        left:30,
        borderRadius:5
    },
    findButtonText:{
        color:'#fff',
        fontFamily:"GothamBook",
        fontSize:16
    }
});