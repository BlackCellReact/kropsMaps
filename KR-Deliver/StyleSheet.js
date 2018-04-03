/**
 * Created by jlmconsulting on 3/24/18.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button, Alert} from 'react-native';

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end'
    },
    form_container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    header: {
        padding: 20,
        backgroundColor: '#333',
    },
    header_text: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    origin_destination: {
        alignItems: 'center',
        padding: 10
    },
    label: {
        fontSize: 18
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    map_container: {
        flex: 9
    },
    map: {
        flex: 1
    },
});