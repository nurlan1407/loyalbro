import {
    View, Text, Image, StyleSheet,
    TouchableOpacity, Modal, Animated, Dimensions,
    GestureResponderEvent, LayoutChangeEvent, LayoutRectangle,
    Easing
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import images from '~/constants/images'
import icons from '~/constants/icons'
import { SIZES, COLORS } from '~/constants/theme'
import { Layout } from 'react-native-reanimated'
import Button from '~/shared/ui/Button'
import CustomTextInput from '~/shared/ui/TextInput'


interface WriteCommentModalProps {
    isVisible: boolean,
    height: number,
    closeModal: () => void
}
const screenHeight = Dimensions.get('window').height


const WriteComment: React.FC<WriteCommentModalProps> = ({ isVisible, height, closeModal }) => {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1)
    const [currentRating, setCurrentRating] = useState(0)
    const onRatingSelect = (value: number) => {
        setCurrentRating(value)
    }

    const [text, setText] = useState('')


    const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(null)
    const onContentLayout = (event: LayoutChangeEvent) => { setContentLayout(event.nativeEvent.layout) }
    const isPressInsidePopover = (event: GestureResponderEvent): boolean => {
        if (!contentLayout) return false;
        const { pageX, pageY } = event.nativeEvent;
        return (
            pageX >= contentLayout.x &&
            pageX <= contentLayout.x + contentLayout.width &&
            pageY >= contentLayout.y &&
            pageY <= contentLayout.y + contentLayout.height
        );
    };
    const onStartShouldSetResponder = (event: GestureResponderEvent): boolean => {
        if (isPressInsidePopover(event)) {
            return false;
        } else {
            closeModal()
            return true;
        }
    };

    const [isError, setIsError] = useState(false)
    const onSubmit = () => {
        if (currentRating == 0) {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }

    const rotateValue = useRef(new Animated.Value(0)).current
    const startShakingAnimation = () => {
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 200, // Adjust the duration as needed
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(()=>{
            rotateValue.setValue(0)
            setIsError(false)
        })
    }

    useEffect(() => {
        
        if (isError==true) {
            startShakingAnimation()
        }
    }, [isError]);
    const rotate = rotateValue.interpolate({
        inputRange: [0, 0.25, 0.50, 0.75, 1],
        outputRange: [10, 30, 10, 30, 10],
    });
    return (
        <Modal
            visible={isVisible}
            animationType='slide'
            transparent={true}
        >
            <View
                style={styles.fullScreen}
                onStartShouldSetResponder={onStartShouldSetResponder}
            >

                <View style={styles.container} onLayout={onContentLayout}>
                    <View style={styles.credentials}>
                        <Image style={{ width: 40, height: 40 }} source={images.defaultAvatar}></Image>
                        <Text style={{ fontSize: SIZES.large }}>Nurlan Baitassov</Text>
                    </View>
                    <View style={styles.bigStarsContainer} >
                        {stars.map((star) =>
                            <TouchableOpacity
                                style={[styles.bigStar, { transform: [{ translateX:rotate }] }]}
                                onPress={() => {
                                    setCurrentRating(star)
                                }}
                            >
                                <Image source={icons.ratingFilled} style={{ width: 50, height: 50, tintColor: currentRating >= star ? COLORS.primary : 'lightgray' }}></Image>
                            </TouchableOpacity>
                        )}
                    </View>
                    <CustomTextInput
                        onChangeText={setText}
                        value={text}
                        placeholder="Ваш отзыв..."
                        styles={styles.textArea}
                        multiline
                        scrollEnabled={true}
                    />
                    {/* {isError && <Text style={{ color: 'red', fontSize: SIZES.small, paddingLeft:SIZES.xSmall, textAlign: "left" }}>Выберите оценку</Text>} */}

                    <View style={styles.buttonsContainer}>
                        <Button buttonStyle={{ flex: 1, padding: SIZES.small, height: "70%" }} onPress={onSubmit}>
                            <Text style={styles.buttonText}>Опубликовать</Text>
                        </Button>
                        {/* <Button>
                                
                        </Button> */}
                    </View>
                    {/* <TouchableOpacity onPress={() => { closeModal() }}>
                        <Text>Close Modal</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    credentials: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.large,
    },
    container: {
        padding: SIZES.large,
        minHeight: 350,
        marginTop: 'auto',
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -55 },
        elevation: 5,
        gap: 15
    },
    fullScreen: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: 'flex-end',
    },
    bigStarsContainer: {
        flex: 5,
        maxHeight: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    bigStar: {
        flex: 1,
    },
    textArea: {
        width: '100%',
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: SIZES.small,
        textAlignVertical: 'top' // For aligning text to the top
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    buttonText: {
        fontSize: SIZES.medium,
        letterSpacing: 0.25,
        color: 'white'
    }
})


export default WriteComment