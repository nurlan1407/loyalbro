import { Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen name="auth" options={{headerShown:false, headerTitle:"asdasd"}}></Stack.Screen>
            <Stack.Screen name="code_verification" options={{headerShown:false}}></Stack.Screen>
        </Stack>
    )
}