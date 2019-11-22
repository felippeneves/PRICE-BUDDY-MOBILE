import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps'

export default class EstablishmentsMap extends Component {

  render() {

    let latitudeTest = -21.184076
    let longitudeTest = -47.794764
    
    return (

      <View style={styles.container}>

        <MapView
          style={styles.map}
          loadingEnabled={true}
          region={{
            latitude: latitudeTest,
            longitude: longitudeTest,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
        
            <Marker
                coordinate={{
                    latitude: latitudeTest,
                    longitude: longitudeTest,
                }}
                title={'Petshop A'}
                description={'Teste'}/> 

            <Marker
                coordinate={{
                    latitude: -21.184133,
                    longitude: -47.794822,
                }}
                title={'Petshop B'}
                description={'Teste'}/> 
            
            <Marker
                coordinate={{
                    latitude: -21.194044,
                    longitude: -47.811211,
                }}
                title={'Petshop C'}
                description={'Teste'}/> 

            <Marker
                coordinate={{
                    latitude: -21.198789,
                    longitude: -47.798062,
                }}
                title={'Petshop D'}
                description={'Teste'}/> 

        </MapView>
        
      

      </View>

    );
  }
}

const styles = StyleSheet.create({
  
  container: {
  
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },

  map: {

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },

});