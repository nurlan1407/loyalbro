import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { View, Text, Animated, ScrollView, Dimensions, LayoutChangeEvent } from "react-native"
import { Establishment } from '~/types/Establishment'
import { SIZES } from '~/constants/theme'
import Details from './details'
import Testimomials from '../testimonials'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Fade from '~/shared/ui/Fade'
import { FlatList } from 'react-native-gesture-handler'
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
    }

]
const Tab = createMaterialTopTabNavigator();

interface DetailedInfoProps {
    establishment: Establishment | null,
}

const DetailedInfo: React.FC<DetailedInfoProps> = () => {
    const scrollViewRef = useRef<FlatList>(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [heights, setHeights] = useState<number[]>(new Array(subPages.length).fill(0)); // Initialize with 0

    // const changePage = (pageIndex: number) => {
    //     scrollViewRef.current?.scrollTo({ x: SCREEN_WIDTH * pageIndex, animated: true });
    //     setCurrentPageIndex(pageIndex);
    // };

    const onLayout = (event: LayoutChangeEvent, index: number) => {
        const layoutHeight = event.nativeEvent.layout.height;

        setHeights(prevHeights => {
            const newHeights = [...prevHeights];
            newHeights[index] = layoutHeight;
            return newHeights;
        });
    };

    const [currentPage, setCurrentPage] = useState(subPages[0])

    return (
        <>
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                padding: SIZES.medium,
            }}>
                {subPages.map((page, index) => {
                    return (
                        <Text
                            key={index}
                            style={{ fontWeight: '600', color: 'gray' }}
                        // onPress={() => { changePage(subPages[index]) }}
                        >
                            {page.title}
                        </Text>
                    )
                })}
            </View>
            <FlatList
                ref={scrollViewRef}
                horizontal
                data={subPages}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id || index.toString()}
                onScroll={(event) => {
                    const offset = event.nativeEvent.contentOffset.x;
                    const newIndex = Math.round(offset / SCREEN_WIDTH);
                    if (newIndex !== currentPageIndex) {
                        setCurrentPageIndex(newIndex);
                        setCurrentPage(subPages[newIndex]);
                    }
                }}
                scrollEventThrottle={16}
                getItemLayout={(data, index) => (
                    { length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index }
                )}
                renderItem={({ item, index }) => (
                    <View
                        key={index}
                        style={{ width: SCREEN_WIDTH }}
                        onLayout={(event) => onLayout(event, index)}
                    >
                        <Text>
                            {/* Your long text here */}
                        </Text>
                        {item.Node}
                    </View>
                )}
            >

            </FlatList >





        </>

    )
}


export default DetailedInfo