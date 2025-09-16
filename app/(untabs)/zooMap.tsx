import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

const ZooMapScreen = () => {
  const initialRegion = {
    latitude: -6.2, // Example: Jakarta latitude
    longitude: 106.816666, // Example: Jakarta longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
      </MapView>
      
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Your Zoo Map</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overlayText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ZooMapScreen;