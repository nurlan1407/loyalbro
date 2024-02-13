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
import Details from '~/components/establishment/establishmentDetails/details';
import Testimomials from '~/components/establishment/testimonials';
import { Ionicons } from '@expo/vector-icons';
import DetailedInfo from '~/components/establishment/establishmentDetails';


const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export default function Page({ navigation }) {
    const [isScrollEnabled, setIsScrollEnabled] = useState(true);
    const liked = useSharedValue(0);
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




    const scrollViewRef = useRef<ScrollView>(null)
    const scrollY = useRef(new Animated.Value(0)).current
    const flatlistHeight = scrollY.interpolate({
        inputRange: [0, 250 - 60],
        outputRange: [250, 60],
        extrapolate: 'clamp'
    })
    const backgroundColor = scrollY.interpolate({
        inputRange: [0, 100],  // Adjust these numbers to control when the color starts and finishes changing
        outputRange: ['rgba(0,0,0,0.3)', 'rgba(255,255,255,1)'], // Change from transparent to white
        extrapolate: 'clamp',  // This will clamp the output color so it doesn't go beyond the outputRange
    });
    const textColor = scrollY.interpolate({
        inputRange: [0, 110],  // Adjust these numbers to control when the color starts and finishes changing
        outputRange: ['rgba(255,255,255,1)', 'rgba(0,0,0,1)'], // Change from transparent to white
        extrapolate: 'clamp',  // This will clamp the output color so it doesn't go beyond the outputRange
    })
    const flatListOpacity = scrollY.interpolate({
        inputRange: [20, 95],  // Adjust these numbers to control when the color starts and finishes changing
        outputRange: [0, 1], // Change from transparent to white
        extrapolate: 'clamp',  // This will clamp the output color so it doesn't go beyond the outputRange
    });
    const flatListIndicatorOpacity = scrollY.interpolate({
        inputRange: [50, 110],  // Adjust these numbers to control when the color starts and finishes changing
        outputRange: [1, 0], // Change from transparent to white
        extrapolate: 'clamp',  // This will clamp the output color so it doesn't go beyond the outputRange
    });
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 70],  // Adjust these numbers to control when the color starts and finishes changing
        outputRange: [0.2, 1], // Change from transparent to white
        extrapolate: 'clamp',  // This will clamp the output color so it doesn't go beyond the outputRange
    });
    const shadowOpacity = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [1, 0], // Тень начинается полупрозрачной и становится невидимой
        extrapolate: 'clamp',
    })

    const [lastScrollY, setLastScrollY] = useState(0); // Для отслеживания последнего значения scrollY
    const [timer, setTimer] = useState<(() => void) | null>(null)
    function reset() {
        setIsScrollEnabled(true)
        setTimer(null)
    }
    function callTimer() {
        setInterval(() => {
            reset()
        }, 1000)
    }

    function handleScrollViewScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        const positionY = event.nativeEvent.contentOffset.y;

        // Если пользователь прокрутил достаточно далеко и скролл включен
        // if (positionY >= 100 && isScrollEnabled) {
        //     setIsScrollEnabled(false); // Выключаем дополнительный скролл
        //     scrollViewRef.current?.scrollTo({ y: 99, animated: true }); // Прокручиваем немного назад
        // } else if (positionY < 100 && !isScrollEnabled) {
        //     setIsScrollEnabled(true); // Включаем скролл обратно, когда пользователь прокрутил назад
        // }


        Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
        )(event);
    }

    function onTabPress(){
        Animated.timing(scrollY,{
            toValue:0,
            duration:150,
            useNativeDriver:false
        })
        scrollViewRef.current?.scrollTo({y:0})
    }
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
                    width: '100%',
                    height: 50,
                    // opacity: headerOpacity,
                    backgroundColor: backgroundColor,
                    zIndex: 8,
                    position: 'absolute',
                    top: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.large,
                    gap: SIZES.large,
                    // Стиль тени
                    shadowOpacity: shadowOpacity,
                    shadowRadius: 45, // Размер тени
                    shadowColor: '#000', // Цвет тени
                    shadowOffset: { width: 0, height: 45 },

                    elevation: 1, // Для Android
                }}>
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={30} />
                    </TouchableOpacity>
                    <Animated.Text style={{ fontSize: SIZES.large, color: textColor }}>{currentEstablishMent?.title}</Animated.Text>
                </Animated.View>
                <ScrollView
                    bounces={false}
                    ref={scrollViewRef}
                    onScrollEndDrag={(event) => {
                        setTimeout(() => {
                            /*@ts-ignore*/
                            if (scrollY._value < 110 && scrollY._value > 50) {
                                Animated.timing(scrollY, {
                                    toValue: 110,
                                    duration: 300,
                                    useNativeDriver: false
                                }).start()
                            }
                        }, 50)

                    }}
                    onScroll={handleScrollViewScroll}
                    scrollEnabled={isScrollEnabled}
                    scrollEventThrottle={16}
                >

                    <Animated.View style={{ height: flatlistHeight }} >
                        <FlatList
                            ref={flatListRef}
                            data={currentEstablishMent?.imgs}
                            renderItem={({ item, index }) => (
                                <View style={{ width: SCREEN_WIDTH, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={item} style={{ flex: 1, resizeMode: 'cover', width: "100%", height: "100%" }} />
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
                            opacity: flatListIndicatorOpacity,
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
                    <View>
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
                    </View>
                    <View
                        style={{ height: 'auto', flex: 1 }}>
                        <DetailedInfo onTabPress={onTabPress} establishment={currentEstablishMent}></DetailedInfo>

                    </View>

                    {/* Main container */}
                </ScrollView>

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