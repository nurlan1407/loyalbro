import React, { useState } from 'react'
import { View, Text } from "react-native"
import { Establishment } from '~/types/Establishment'
import { SIZES } from '~/constants/theme'
import Details from './details'
import Testimomials from '../testimonials'

const subPages = [
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

interface DetailedInfoProps {
    establishment: Establishment | null,
}

const DetailedInfo: React.FC<DetailedInfoProps> = () => {
    const [currentPage, setCurrentPage] = useState(subPages[0])
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
                            style={{ color: currentPage.name == page.name ? '#000' : 'gray', fontWeight: '600' }}
                            onPress={() => {setCurrentPage(page) }}
                        >
                            {page.title}
                        </Text>
                    )
                })}
                {/* <Text style={{ color: '#000', fontWeight: '600' }} onPress={() => { }}>Детали</Text>
            <Text style={{ color: 'gray', fontWeight: '600' }} onPress={() => { }}>Отзывы</Text>
            <Text style={{ color: 'gray', fontWeight: '600' }} onPress={() => { }}>Бонусы</Text>
            <Text style={{ color: 'gray', fontWeight: '600' }} onPress={() => { }}>Гости</Text> */}
            </View>
            {currentPage.Node}
        </>

    )
}


export default DetailedInfo