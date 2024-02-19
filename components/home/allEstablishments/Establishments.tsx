import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, SIZES } from '../../../constants/theme';
import icons from '~/constants/icons'
import { useRouter } from 'expo-router';
import { EstablishmentDemo } from '~/types/Establishment';
import { Establishment } from '~/entities/establishment/types';
import { Link } from 'expo-router';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks';
import { useEffect } from 'react';
import { RootState } from '~/lib/redux';
import { getEstablishments } from '~/entities/establishment/api';
import { FlatList } from 'react-native-gesture-handler';
import { setCurrentEstablishment } from '~/entities/establishment/slice';

export default function EstablishMents() {
    const dispatch = useAppDispatch()
    const establishments = useAppSelector((state: RootState) => state.establishments.establishments)
    const isLoading = useAppSelector((state: RootState) => state.establishments.isLoading)

    const router = useRouter()
    function handlePress(id: number) {
        //@ts-ignore
        router.push(`/establishment/${id}`)
    }

    const handleEstablishmentClick = async(item:Establishment) =>{
        // await dispatch()
        dispatch(setCurrentEstablishment(item))
        router.push(`/establishment/${item.id}`)

    }
    useEffect(() => {
        const fetchEstablishments = async () => {
            await dispatch(getEstablishments())
        }
        fetchEstablishments()
    }, [dispatch])
    return (
    
        <FlatList
            data={establishments}
            keyExtractor={item=>item.title}
            contentContainerStyle={{ rowGap: 10 }}
            refreshing={true}
            renderItem={({item,index}) => {
                return (
                    <TouchableOpacity
                        style={styles.card}
                        key={item.title}
                        onPress={() => { handleEstablishmentClick(item)}}
                    >
                        <View style={{ flex: 8 }}>
                            <Image source={{ uri: item.mainImg.replace("localhost", "192.168.0.100") }} style={{ flex: 1, width: "100%", height: "100%" }} resizeMode='contain'></Image>
                        </View>
                        <View style={styles.cardInfo}>
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardDescription}>{item.description}</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <Image source={icons.star} style={{ width: 15, height: 15, marginRight: 10, tintColor: 'yellow' }}></Image>
                                <Text style={{ fontSize: SIZES.medium, color: "#FFF" }}>{item.rating}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "column",
        padding: SIZES.small
    },
    card: { width: "100%", height: 260, flexBasis: 10, overflow: "hidden", borderColor: "gray", borderWidth: 1, borderRadius: 15, marginBottom: 10 },
    cardInfo: {
        flex: 2,
        height: 'auto',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        padding: SIZES.medium,
        // paddingTop: 0,
        alignContent: 'center'
    },
    cardTextContainer: {
        flex: 1,
        flexWrap: 'nowrap',
        overflow: "hidden"
    },
    cardTitle: {
        fontSize: SIZES.large,
        letterSpacing: 1,
        color: COLORS.primary
    },
    cardDescription: {
        fontSize: SIZES.medium,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        // alignSelf: 'flex-end',
        gap: -8
    }
})