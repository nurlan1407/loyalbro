import { View, Text, Image, TouchableWithoutFeedback, FlatList,StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import MapView, { Marker, Region } from 'react-native-maps'
import images from '~/constants/images'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'
import { COLORS, SIZES } from '~/constants/theme'
import BottomSheet from '@gorhom/bottom-sheet';
import { EstablishmentDemo } from '~/types/Establishment'


const loans: React.FC = () => {

  const [region, setRegion] = useState<Region | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleMarkerPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('latitude ' + location.coords.latitude);
      console.log('longtitude ' + location.coords.longitude);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.008,
        
        longitudeDelta: 0.008,
      });
    })();
  }, []);
  const customMapStyle = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];



  const snapPoints = useMemo(() => ['20%', '50%', '85%'], []);
  const handleBottomSheetClose = () => {
    bottomSheetRef.current?.close()
  }



  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </View>
  );
  return (
    <>
      <MapView
        style={{ flex: 1 }}
        region={region ? region : undefined}
        showsUserLocation={true}
        followsUserLocation={true}
        customMapStyle={customMapStyle}
      >

        {EstablishmentDemo.map((est) => {
          return (
            <Marker
              coordinate={{
                latitude: est.location.latitude,
                longitude: est.location.longitude,
              }}
              onPress={() => {
                handleMarkerPress()
              }}
            >
              <Image source={est.imgs[0]} width={50} height={50} style={{ width: 50, height: 50 }}></Image>
            </Marker>
          )
        })}



        <MapViewDirections
          origin={{ latitude: 51.0951153, longitude: 71.4088265 }}
          destination={{
            latitude: 51.0851174,
            longitude: 71.3088212,
          }}
          apikey={'AIzaSyBe8AcEKed_mxcjHvZ1VhuWjmgROiQ_gwg'}
          strokeWidth={3}
          strokeColor={COLORS.primary}
        >

        </MapViewDirections>
      </MapView>

      <BottomSheet
        enableContentPanningGesture={true}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <FlatList
          data={EstablishmentDemo[0].imgs}
          renderItem={renderItem}
          horizontal
          keyExtractor={(item)=>item} 
        >

        </FlatList>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: SIZES.xLarge, padding: 50 }}>asdasdasdasdasdasds</Text>
        </View>
      </BottomSheet>
    </>

  )
}

const styles = StyleSheet.create({
  
})

export default loans