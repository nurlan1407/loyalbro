import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { View, Text, Animated, ScrollView, Dimensions, LayoutChangeEvent, TouchableOpacity } from "react-native"
import { Establishment } from '~/entities/establishment/types'
import { SIZES } from '~/constants/theme'
import Details from './details'
import Testimomials from '../testimonials'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Fade from '~/shared/ui/Fade'
import { FlatList } from 'react-native-gesture-handler'
import Bonuses from './bonuses'
// import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming, SharedValue } from 'react-native-reanimated'

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

type SubPage = {
    name: string
    title: string
    Node: ReactNode
}
const subPages: SubPage[] = [
    {
        name: 'details',
        title: "Детали",
        Node: <Details></Details>
    },
    {
        name: 'testimonials',
        title: "Отзывы",
        Node: <Testimomials ></Testimomials>
    },
    {
        name: 'bonuses',
        title: "Бонусы",
        Node: <Bonuses></Bonuses>
    },
    {
        name: 'map',
        title: "Карта",
        Node: <Text>Monuses</Text>
    }
]
const Tab = createMaterialTopTabNavigator();

interface DetailedInfoProps {
    establishment: Establishment | null,
    onTabPress: () => void
}

const DetailedInfo: React.FC<DetailedInfoProps> = ({ onTabPress }) => {

    const [currentPage, setCurrentPage] = useState(subPages[0]);
    const [isVisible, setIsVisible] = useState(true);

    const changePage = (newPage: SubPage) => {
        if (newPage !== currentPage) {
            setIsVisible(false); 
            setTimeout(() => {
                setCurrentPage(newPage);
                setIsVisible(true); 
            }, 300);
        }
    };

  

    return (
        <>
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                padding: SIZES.medium,
            }}>
                {subPages.map((page, index) => (
                    <TouchableOpacity
                        onPress={() => { onTabPress(); changePage(page) }}

                    >
                        <Text
                            key={index}
                            style={{ fontWeight: '600',fontSize:SIZES.medium, color: currentPage.name == page.name ? 'black' : 'gray' }}
                        >
                            {page.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Fade isVisible={isVisible}>
                {currentPage.Node}
            </Fade>
        </>
    );
};


export default DetailedInfo