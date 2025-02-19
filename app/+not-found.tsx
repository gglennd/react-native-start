import { Link, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'Oops!'
    });
  }, [navigation]);

  return (
    <>
      <View className='flex-1 items-center justify-center gap-3'>
        <Text className='text-3xl'>This screen doesn't exist.</Text>
        <View className='h-2' />
        <Link href='/'>
          <Text>Go Home</Text>
        </Link>
      </View>
    </>
  );
}
