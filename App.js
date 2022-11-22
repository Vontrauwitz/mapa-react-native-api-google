import * as React from 'react'
import * as Location from 'expo-location'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';


export default function App() {

  const [origin, setOrigin] = React.useState({
    latitude: 19.357927,
    longitude: -99.301353,
  });

  const [destination, setDestination] = React.useState({
    latitude: 19.39570,
    longitude: -99.21714,
  });

  React.useEffect(() => {
    getLocationPermission()
  }, [])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({})
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
    // para tiempo real necsitamos un useeffect que actualice cada 10 20 60 seg etc
    setOrigin(current)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          draggable
          coordinate={origin}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker
          draggable
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="rgba(0, 4, 252, 0.5)"
          strokeWidth={4}

        />
        {/* <Polyline
          coordinates={[origin, destination]}
          strokeColor="pink"
          strokeWidth={8}
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
