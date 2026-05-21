import { Providers } from './providers';
import App from '@/components/App';
import { getSubstackPosts } from '@/lib/substack';

export default async function Page() {
  const posts = await getSubstackPosts('amitpandit', 7);
  return (
    <Providers>
      <App substackPosts={posts} />
    </Providers>
  );
}