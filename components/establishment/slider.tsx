import React,{useState} from 'react';
import { NativeSyntheticEvent } from 'react-native';
import { NativeScrollEvent } from 'react-native';
import { View, Text, StyleSheet, Image,FlatList,Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import { Establishment } from '~/types/Establishment';
import { SIZES,COLORS } from '~/constants/theme';

interface ImageSliderProps{
    flatlistHeight:any;
    currentEstablishMent:Establishment
    flatListOpacity?:any
}
const ImageSlider:React.FC<ImageSliderProps> = (
    {flatlistHeight,currentEstablishMent,flatListOpacity}
) => {
    const SCREEN_WIDTH = Dimensions.get("screen").width
    const [currentIndex, setCurrentIndex] = useState(0);

    
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const newIndex = Math.floor(contentOffsetX / (SCREEN_WIDTH - 10));
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    };
    return (
        <Animated.View style={{ height: flatlistHeight, }} >
            <FlatList
                data={currentEstablishMent?.imgs}
                renderItem={({ item, index }) => (
                    <View style={{ width: SCREEN_WIDTH, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{uri:item.replace("localhost","192.168.0.100")}} style={{ flex: 1, resizeMode: 'cover', width: "100%", height: "100%" }} />
                        <Animated.View style={{
                            opacity: flatListOpacity,
                            backgroundColor: 'white',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: 2
                        }} />
                    </View>
                )}
                snapToInterval={SCREEN_WIDTH}
                snapToAlignment='center'
                decelerationRate={'normal'}
                disableIntervalMomentum
                pagingEnabled
                getItemLayout={(data, index) => (
                    { length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index }
                )}
                onScroll={handleScroll}
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                keyExtractor={index => index}
                horizontal
            />
            <Animated.View style={{
                opacity: flatListOpacity,
                position: 'absolute',
                bottom: 10,
                right: 10
            }}>
                <Text style={{ color: "#FFFFFF", flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', fontSize: SIZES.medium, padding: SIZES.xSmall, borderRadius: 10 }}>{currentIndex + 1}/{currentEstablishMent?.imgs.length}</Text>
            </Animated.View>

            <View style={{ width: 30, height: 'auto', position: 'absolute', bottom: -40, right: 20, alignItems: 'center', justifyContent: 'center' }}>
                <View style={[styles.triangleCorner, { position: "absolute", bottom: -40, right: 20 }]} />
                <Text style={{ color: "#FFF", zIndex: 5, textAlign: 'center', fontSize: SIZES.medium }}>5%</Text>
                <View style={[styles.triangleLeftCorner, { position: "absolute", bottom: -40, right: 20, }]} />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 80,
        borderTopWidth: 30,
        borderRightColor: "transparent",
        borderTopColor: COLORS.primary,
        transform: [{ translateX: 45 }, { translateY: -25 }, { rotate: '90deg' }],

    },
    triangleLeftCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 30,
        borderTopWidth: 80,
        borderRightColor: "transparent",
        borderTopColor: COLORS.primary,
        transformOrigin: 'left center',
        transform: [{ translateX: 20 }, { translateY: 0 }]
    },

});

export default ImageSlider