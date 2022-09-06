import client from '@sanity/client';

export default client({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true,
  dataset: 'production',
});
