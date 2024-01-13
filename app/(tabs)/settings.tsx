import { View, Text } from 'react-native'
import React from 'react'
import Button from '~/shared/ui/Button'
import { useRouter } from 'expo-router'
const settings = () => {
  const router = useRouter()
  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
    }}>
      <Button onPress={() => { router.push('/auth/auth')}} buttonStyle={{}}>
        <Text style={{ textTransform: 'uppercase' }}>Войти в аккаунт</Text>
      </Button>
    </View>
  )
}

export default settings