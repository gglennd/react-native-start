import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import '../global.css';

export default function Page() {
  const route = useRouter();
  return (
    <View>
      <Button onPress={() => route.push('notFound')} title='Not found page' />
      <Text className='text-4xl'>Top-level page</Text>
    </View>
  );
}
