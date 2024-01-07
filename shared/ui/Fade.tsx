import React, { ReactNode, useEffect, useRef } from 'react'
import { View, Animated, Easing, Dimensions } from 'react-native'

interface AnimationProps {
    isVisible: boolean,
    children: ReactNode
}
const WIDTH = Dimensions.get('screen').width


const Fade: React.FC<AnimationProps> = ({
    isVisible,
    children
}) => {
    const translateX = useRef(new Animated.Value(isVisible ? 0 : WIDTH)).current;
    const opacity = useRef(new Animated.Value(isVisible ? 1 : 0)).current
    
    const startSlideAnimation = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: isVisible ? 1 : 0,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true
            }),
        ]).start()
       
    };
    const endSlideAnimation = () =>{
        Animated.timing(translateX, {
            toValue: isVisible ? WIDTH : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }
    useEffect(() => {
            startSlideAnimation();
    
    }, [isVisible]);

    return (
        <Animated.View style={{ opacity:opacity}}>
            {children}
        </Animated.View>
    );
}

export default Fade