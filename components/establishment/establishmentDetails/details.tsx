import { View, Text, Image, TouchableOpacity, Linking, ViewProps } from 'react-native'
import { COLORS, SIZES } from '~/constants/theme'
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons'
import { useState, useRef } from 'react'
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { FlatList } from 'react-native'
import icons from '~/constants/icons'


const mockSchedule = [
    { day: "Monday", time: "08:32-19:00" },
    { day: "Tuesday", time: "08:41-19:00" },
    { day: "Wednesday", time: "08:56-19:00" },
    { day: "Thursday", time: "10:55-19:00" },
    { day: "Friday", time: "10:24-19:00" },
    { day: "Saturday", time: "10:26-19:00" },
    { day: "Sunday", time: "-- - --" }
]




interface DetailProps extends ViewProps {

}
const Details: React.FC<DetailProps> = () => {
    const showSchedule = useSharedValue(1)
    const [showRef, setShowRef] = useState(false)
    function onSchedulePressed() {
        showSchedule.value = withSpring(showSchedule.value ? 0 : 1)
        setShowRef(!showRef)
    }
    const start = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(showSchedule.value, [0, 1], [1, 0], Extrapolate.CLAMP),
                },
            ],
        };
    });

    const end = useAnimatedStyle(() => {
        return {
            transform: [{ scale: showSchedule.value }],
            opacity: showSchedule.value,
        };
    });


    const showFullSchedule = useAnimatedStyle(() => {
        return {
            height: interpolate(showSchedule.value, [0, 1], [0, 250])
        };
    });

    // const showNotFullSchedule = useAnimatedStyle(() => {
    //     return {
    //         display: interpolate(showSchedule.value, [1, 0], ['none', 'block'])
    //     };
    // });



    function onPhonePress(number: string) {
        Linking.openURL(`tel:${number}`)
    }

    return (
        <View style={{ padding: SIZES.medium, marginTop: 1, paddingTop: 0 }} onLayout={(e) => {
            console.log('details   ' +e.nativeEvent.layout.height);
        }}>
            <Text style={{ fontSize: SIZES.large }}>Описание</Text>
            <Text style={{ fontSize: SIZES.medium, color: 'gray' }}>Оздоровительный центр</Text>
            <View style={{ flexDirection: 'row', gap: 25, alignItems: 'center', marginTop: 10 }}>
                <Ionicons name="time-outline" size={32} color={COLORS.primary} style={{ width: 50, height: 50, paddingTop: 10 }} />
                {showRef == false ?
                    <View>
                        <Text>Сегодня</Text>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                            <Text>10:00 - 19:00</Text>
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'lightgreen' }}></View>
                        </View>
                    </View>
                    :
                    <Animated.View >
                        {mockSchedule.map((item) => (
                            <View style={{ flexDirection: 'row', gap: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ textAlign: 'left' }}>{item.day}</Text>
                                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                                    <Text >{item.time}</Text>
                                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'lightgreen' }}></View>
                                </View>
                            </View>
                        ))}
                    </Animated.View>
                }



                <TouchableOpacity onPress={onSchedulePressed} style={{ position: "absolute", width: 50, height: 50, right: 0, top: -10 }}>
                    <Animated.View style={[start, { position: 'absolute' }]} >
                        <MaterialIcons name="expand-less" size={50} color="gray" />
                    </Animated.View>
                    <Animated.View style={[end, { position: 'absolute' }]}>
                        <MaterialIcons name="expand-more" size={50} color="gray" />

                    </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: SIZES.medium }}>
                <View style={{ flexDirection: 'row', gap: SIZES.small, marginBottom: SIZES.small }}>
                    <Feather name="phone-call" size={24} color="black" />
                    <Text onPress={() => { onPhonePress('+77054753526') }} style={{ textDecorationLine: 'underline', fontSize: SIZES.medium }}>+77054753526</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: SIZES.small, marginBottom: SIZES.small }}>
                    <Feather name="phone-call" size={24} color="black" />
                    <Text onPress={() => { onPhonePress('+77054753526') }} style={{ textDecorationLine: 'underline', fontSize: SIZES.medium }}>+77777755555</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 20 }}>
                <TouchableOpacity style={{ width: 50, height: 50 }}>
                    <Image source={icons.instagram} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Details