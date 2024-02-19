import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '~/constants/theme'
import { useAppSelector } from '~/hooks/reduxHooks'
import { RootState } from '~/lib/redux'
import Svg, { Circle } from 'react-native-svg';

const Bonuses: React.FC = () => {
    const levels = useAppSelector((state: RootState) => state.establishments.currentEst?.loyaltyLevels)

    const size = 60; // Increase the size to make the circle bigger
    const strokeWidth = 2; // Increase the stroke width for visibility
    const center = size / 2;
    const radius = center - strokeWidth / 2; // Adjust the radius accordingly
    const circumference = 2 * Math.PI * radius;
    const sortedData = [...levels || []]
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Level of loyalty</Text>
            <View style={styles.content}>
                <View style={styles.infoBlock}>
                    <Text style={styles.infoBlockText}>
                        <Text style={{ color: COLORS.primary, fontSize: SIZES.large }}>Your level:</Text> Silver</Text>
                    <Text style={styles.infoBlockText}>Total sum: 0</Text>
                </View>
                <View style={styles.levelsContainer}>
                    {sortedData.sort((a,b)=>a.id! - b.id!).map((item, index) => (
                        <View style={styles.level} key={index}>
                            <Text style={styles.levelText}>{item.levelName}</Text>
                            <Svg height={size} width={size} style={{ transform: [{ rotate: '90deg' }], zIndex: 5, position: "relative" }}>
                                <Circle
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    fill="#F5F5F5"
                                    stroke={COLORS.primary}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference - circumference * 0.25}
                                />
                                <Text style={styles.cashback}>{item.cashbackPercentage}%</Text>
                            </Svg>
                            <Text style={styles.levelText}>{item.requiredSpending}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
        padding: SIZES.small,
    },
    header: {
        flex: 1,
        textAlign: "left",
        fontSize: SIZES.xLarge,
        fontWeight: "500",
        marginBottom: SIZES.xSmall,
    },
    content: {
        flexDirection: "row",
    },
    infoBlock: {
        width: "30%",
        flexWrap: 'wrap', // Enable word wrapping
        paddingTop: SIZES.xSmall,

    },
    infoBlockText: {
        width: "100%",
        fontSize: SIZES.medium,
        flexWrap: 'wrap'
    },
    levelsContainer: {
        width: "70%",
        padding: SIZES.xSmall,
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        borderRadius: SIZES.medium
    },
    level: {
        flexDirection: "column",
        alignItems: "center",
        // gap: SIZES.xSmall,
    },
    levelText: {
        fontSize: SIZES.medium,
        fontWeight: "300",
    },
    cashback: {
        transform: [{
            rotate: '-90deg',
        }],
    },
    circle: {
        borderRadius: 999,
        backgroundColor: "#F5F5F5",
        borderWidth: 2,
        borderColor: 'gray',
        zIndex: 0
    },

})

export default Bonuses