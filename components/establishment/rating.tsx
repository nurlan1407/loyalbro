import { View, Text, StyleSheet, Image, ImageStyle } from 'react-native'
import React from 'react'
import images from '~/constants/images'
import icons from '~/constants/icons'
import { COLORS } from '~/constants/theme'
interface RatingProps {
    rating: number,
    gap:number,
    starStyle: ImageStyle
}

const MAX_RATING = 5
const Rating: React.FC<RatingProps> = ({ rating, gap, starStyle }) => {
    const filledStars = Math.floor(rating);
    const stars = Array.from({ length: MAX_RATING }, (_, i) => i + 1);

    return (
        <View style={{ flexDirection: 'row', gap: gap}}>
            {stars.map(star => {
                return (
                    <Image source={icons.ratingFilled} style={StyleSheet.flatten([starStyle, { tintColor: rating >= star ? COLORS.primary : 'lightgray' }])}></Image>
                );
            })}
        </View>
    );
}


export default Rating