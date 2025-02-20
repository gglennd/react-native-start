import { useRouter } from 'expo-router';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { View } from '~/components/ui/view';

export default function Page() {
  const route = useRouter();
  return (
    <View>
      <Button onPress={() => route.push('notFound')}>
        <Text>Not found page</Text>
      </Button>
      <Text className='text-4xl'>Top-level page</Text>
    </View>
  );
}
