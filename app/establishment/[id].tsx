import { View, Text, SafeAreaView, StatusBar, Dimensions, FlatList, Image, Animated, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Establishment, EstablishmentDemo } from '~/types/Establishment';
import { NativeSyntheticEvent } from 'react-native';
import { NativeScrollEvent } from 'react-native';
import { COLORS, SIZES } from '~/constants/theme';
import icons from '~/constants/icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReAnimated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import Details from '~/components/establishment/details';
import Testimomials from '~/components/establishment/testimonials';
import { Ionicons } from '@expo/vector-icons';


const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export default function Page({ navigation }) {
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 64);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 64],
        outputRange: [0, -64],
    });
    const headerOpacity = diffClamp.interpolate({
        inputRange: [0, 200],
        outputRange: [0.5, 1],
        extrapolate: 'clamp'
    })


    const HEADER_EXPANDED_HEIGHT = 250
    const HEADER_COLLAPSED_HEIGHT = 60
    const liked = useSharedValue(0);
    // const [liked, setIsLiked] = useState(false)
    function onLikePressed() {
        liked.value = withSpring(liked.value ? 0 : 1)
    }
    const outlineStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
                },
            ],
        };
    });

    const fillStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: liked.value }],
            opacity: liked.value,
        };
    });


    const [headerBg, setHeaderBg] = useState<string | null>(null);
    // const scrollY = new Animated.Value(0)
    const scrolling = useRef(new Animated.Value(0)).current;
    const headerHeight = scrolling.interpolate({
        inputRange: [0, 60],
        outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT - 60],
        extrapolate: 'clamp'
    })
    const padding = scrolling.interpolate(({
        inputRange: [0, 60],
        outputRange: [HEADER_EXPANDED_HEIGHT, 0],
        extrapolate: 'clamp'
    }))


    const { id } = useLocalSearchParams();
    const [currentEstablishMent, setCurrentEstablishMent] = useState<Establishment | null>(null)

    const [isAtTop, setIsAtTop] = useState(true);
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const newIndex = Math.floor(contentOffsetX / (SCREEN_WIDTH - 10));
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    };
    useEffect(() => {
        const est = EstablishmentDemo.find(establishment => establishment.id === parseInt(id as string))

        if (!est) {
            return
        }
        setCurrentEstablishMent(est)
    }, [currentEstablishMent])
    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={"#00000000"} translucent={false}></StatusBar>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack.Screen options={{
                    headerTitle: currentEstablishMent?.title,
                    headerTransparent: false,
                    headerShown: false,
                }} />
                <Animated.View style={{

                    backgroundColor: `rgba(0, 0,0 , 0.5)`,
                    width: '100%',
                    //for animation
                    height: 50,
                    position: 'absolute',
                    top: translateY,
                    right: 0,
                    left: 0,
                    zIndex: 8,

                }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#232121', "transparent"]}
                        style={{
                            flex: 1, height: "100%", flexDirection: 'row',
                            alignItems: 'center',
                            gap: 20, paddingLeft: SIZES.small,
                            paddingRight: SIZES.small
                        }}>
                        <TouchableOpacity>
                            <Ionicons name="arrow-back" size={30} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: SIZES.large, color: "#FFF" }}>{currentEstablishMent?.title}</Text>
                    </LinearGradient>
                </Animated.View>
                {/* ptoto slider*/}
                <Animated.View style={{ height: headerHeight, width: SCREEN_WIDTH, position: 'absolute', top: translateY, left: 0, zIndex: 3 }}>
                    <FlatList
                        ref={flatListRef}
                        data={currentEstablishMent?.imgs}
                        renderItem={({ item, index }) => (
                            <View style={{ width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={item} style={{ flex: 1, resizeMode: 'cover', width: "100%", height: "100%" }} />
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
                    <View style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10
                    }}>
                        <Text style={{ color: "#FFFFFF", flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', fontSize: SIZES.medium, padding: SIZES.xSmall, borderRadius: 10 }}>{currentIndex + 1}/{currentEstablishMent?.imgs.length}</Text>
                    </View>

                    <View style={{ width: 30, height: 'auto', position: 'absolute',bottom: -40, right: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[styles.triangleCorner, { position:"absolute", bottom: -40, right: 20 }]} />
                        <Text style={{ color: "#FFF", zIndex: 5, textAlign: 'center', fontSize: SIZES.medium }}>5%</Text>
                        <View style={[styles.triangleLeftCorner, { position:"absolute",bottom: -40, right: 20, }]} />
                    </View>
                </Animated.View>

                {/*Main container */}
                <Animated.ScrollView
                    style={{ paddingTop: padding }}
                    onScroll={(e) => {
                        scrollY.setValue(e.nativeEvent.contentOffset.y)
                        scrolling.setValue(e.nativeEvent.contentOffset.y)
                    }}
                >
                    <View style={{ padding: SIZES.small }}>
                        <Text style={{ fontSize: SIZES.large }}>{currentEstablishMent?.title}</Text>
                        <Text style={{ fontSize: SIZES.medium, fontWeight: '400', color: 'gray' }}>Пр. Алии Молдагуловой 46 "Капитал плаза" (цокольный этаж)</Text>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: "space-between", paddingLeft: SIZES.small, paddingRight: SIZES.small }}>
                        <TouchableOpacity style={{ width: 30, height: 30, borderColor: 'gray', borderRadius: 15, borderWidth: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 5 }}>
                            <Image source={icons.share} style={{ width: 20, height: 20, tintColor: COLORS.primary, marginRight: 2 }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onLikePressed} style={{ position: 'relative', width: 32, height: 32 }}>
                            <ReAnimated.View
                                style={[outlineStyle, {
                                    width: 32, height: 32
                                }]}
                            >
                                <MaterialCommunityIcons name={"heart-outline"} size={32} color={"gray"} />
                            </ReAnimated.View>

                            <ReAnimated.View style={[fillStyle, {
                                width: 32, height: 32, position: 'absolute'
                            }]}>
                                <MaterialCommunityIcons name={"heart"} size={32} color={"red"} />
                            </ReAnimated.View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        padding: SIZES.medium,
                    }}>
                        <Text style={{ color: '#000', fontWeight: '600', }}>Детали</Text>
                        <Text style={{ color: 'gray', fontWeight: '600', }}>Отзывы</Text>
                        <Text style={{ color: 'gray', fontWeight: '600', }}>Бонусы</Text>
                        <Text style={{ color: 'gray', fontWeight: '600', }}>Гости</Text>
                    </View>
                    {/* <Details></Details> */}
                    <Testimomials></Testimomials>
                </Animated.ScrollView>

            </SafeAreaView >
        </>


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