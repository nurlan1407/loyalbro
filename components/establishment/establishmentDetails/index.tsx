import React, { ReactNode, useState, useEffect } from 'react'
import { View, Text, Animated } from "react-native"
import { Establishment } from '~/types/Establishment'
import { SIZES } from '~/constants/theme'
import Details from './details'
import Testimomials from '../testimonials'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Fade from '~/shared/ui/Fade'
// import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming, SharedValue } from 'react-native-reanimated'


type SubPage = {
    name: string
    title: string
    Node: ReactNode
}
const subPages: SubPage[] = [
    {
        name: 'details',
        title: 'Детали',
        Node: <Details></Details>
    },
    {
        name: 'testimonials',
        title: 'Отзывы',
        Node: <Testimomials></Testimomials>
    },
    {
        name: 'bonuses',
        title: 'Бонусы',
        Node: <></>
    },
    {
        name: 'guests',
        title: 'Гости',
        Node: <></>
    }
]
const Tab = createMaterialTopTabNavigator();

interface DetailedInfoProps {
    establishment: Establishment | null,
}

const DetailedInfo: React.FC<DetailedInfoProps> = () => {
    const [currentPage, setCurrentPage] = useState(subPages[0])

    const [isVisible, setIsVisible] = useState(true);
    const [nextPage, setNextPage] = useState<SubPage | null>(null);

    const changePage = (page: SubPage) => {
        if(currentPage.name == page.name)return
        setIsVisible(false); // Start fade-out

        setTimeout(() => {
            setCurrentPage(page);
            setIsVisible(true)
        }, 300)
    };


    return (
        <>
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                padding: SIZES.medium,
            }}>
                {subPages.map((page) => {

                    return (
                        <Text
                            key={page.name}
                            style={{ fontWeight: '600', color: page.name == currentPage.name ? '#000' : 'gray' }}
                            onPress={() => { changePage(page) }}
                        >
                            {page.title}
                        </Text>
                    )
                })}
            </View>
            {/* {subPages.filter(page => page.name === currentPage.name).map((page) => (
                <Fade key={page.name} isVisible={page.name === currentPage.}>
                    {page.Node}
                </Fade>
            ))} */}
            {/* {subPages.map((page) => (
                <Fade key={page.name} isVisible={page.name == currentPage.name}>
                    {page.Node}
                </Fade>
            ))} */}
            <Fade
                isVisible={isVisible}
            >
                {currentPage.Node}
            </Fade>
            {/* {currentPage.Node} */}
        </>

    )
}


export default DetailedInfo