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
type SubPage = {
    name: string
    title: string
    Node: ReactNode
}
const subPages = [

    <Details ></Details>,



    <Testimomials ></Testimomials>

]
const Tab = createMaterialTopTabNavigator();

interface DetailedInfoProps {
    establishment: Establishment | null,
}

const DetailedInfo: React.FC<DetailedInfoProps> = () => {
    const sliderRef = useRef<FlatList>(null)
    const [currentPage, setCurrentPage] = useState(subPages[0])
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [heights, setHeights] = useState<number[]>(new Array(subPages.length).fill('auto'));
    const [currentHeight, setCurrentHeight] = useState(heights[0])
    const [isVisible, setIsVisible] = useState(true);
    const [nextPage, setNextPage] = useState<SubPage | null>(null);



    const changePage = (pageIndex: number) => {
        // sliderRef.current?.scrollTo({ x: SCREEN_WIDTH * pageIndex, animated: true });
        // setCurrentPageIndex(pageIndex);
    };

    const onLayout = (event: LayoutChangeEvent, index: number) => {
        const layoutHeight = event.nativeEvent.layout.height;

        if (layoutHeight > 0) {
            setHeights(prevHeights => {
                const newHeights = [...prevHeights];
                newHeights[index] = layoutHeight;
                return newHeights;
            });
        }
    };

    // useEffect(() => {
    //     const newIndex = currentPageIndex;
    //     sliderRef.current?.scrollTo({ x: SCREEN_WIDTH * newIndex, animated: true });
    // }, [currentPageIndex]);
    const [contentHeights, setContentHeights] = useState({});


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
                            onPress={() => { changePage(index) }}
                        >
                            asdasda
                        </Text>
                    )
                })}
            </View>
            <View style={{ height: heights[currentPageIndex] }}>
                <FlatList
                    ref={sliderRef}
                    horizontal
                    pagingEnabled
                    data={subPages}
                    renderItem={({ item }) => {
                        return (
                            <View style={{flex:1,width:SCREEN_WIDTH}}>
                                {item}
                            </View>
                        )

                    }}
                    showsVerticalScrollIndicator
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        const offset = event.nativeEvent.contentOffset.x
                        const newIndex = Math.round(offset / SCREEN_WIDTH)
                        if (newIndex !== currentPageIndex) {
                            setCurrentPageIndex(newIndex)
                        }
                    }}
                    onMomentumScrollEnd={(e) => {
                        const newIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                        setCurrentPageIndex(newIndex);
                    }}
                    // style={{ height: heights[currentPageIndex] === 0 ? 'auto' : heights[currentPageIndex] }}
                    scrollEventThrottle={16}
                >
                    {/* 
                    <Details></Details>
                    <Testimomials></Testimomials> */}
                    {/* {subPages.map((page, index) =>
                        <View style={{
                            width: SCREEN_WIDTH, display: 'flex', flex: 1,
                        }} onLayout={((event) => {
                            const { height } = event.nativeEvent.layout;

                            setContentHeights((prevHeights) => ({ ...prevHeights, [page.name]: height }));

                        })}>
                            {page.Node}
                        </View>
                    )} */}
                </FlatList>

            </View>




        </>

    )
}


export default DetailedInfo