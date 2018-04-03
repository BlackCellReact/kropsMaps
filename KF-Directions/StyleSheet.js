/**
 * Created by jlmconsulting on 3/24/18.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button, Alert, Dimensions} from 'react-native';

const deviceDimes = Dimensions.get('window');

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
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    deliveryCardTop:{
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        width: deviceDimes.width-30
    },
    riderImage:{
        height:75,
        width:75,
        borderRadius:50,
        marginRight:10
    },
    riderDetails:{
        flex:1
    },
    detailsRow:{
        flexDirection:'row',
    },
    detailsContainer:{
        flex:1
    },
    detailsName:{
        fontFamily:"GothamBold",
        fontSize:16,
        color:"#000",
        marginBottom:15
    },
    detailsOptions:{
        color:'#5f9f0d'
    },
    detailsText:{
        color:'#999',
        fontFamily:"GothamBook",
        fontSize:12,
        marginBottom:15
    },
    detailsTime:{
        color:'#999',
        fontFamily:"GothamBookItalic",
        fontSize:10,
    },

    trackerCard:{
        width:deviceDimes.width,
        padding:15,
        position:'absolute',
        bottom:0,
        zIndex:2,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#ddd',
        flexDirection:'row',
        alignItems:'center'
    },
    trackerImage:{
        height:75,
        width:75,
        borderRadius:50,
        marginRight:10
    },
    trackerRow:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5
    },
    trackerIcon:{
        width:30,
        height:30,
        resizeMode:'contain',
        marginRight:5,
    },
    trackerTime:{
        fontFamily:"GothamBold",
        fontSize:16,
        color:"#5f9f0d",
    },
    trackerDetails:{
        color:'#999',
        fontFamily:"GothamBook",
        fontSize:12,
        marginRight:10,
        flex:1
    },
    messageButton: {
        backgroundColor:'#5f9f0d',
        padding:10,
        borderRadius:5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        color:'#fff',
        fontSize:12,
    },
});