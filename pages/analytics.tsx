import React from 'react';
import AnalyticsComponent from '@/components/Analytics';

type Props = {
  jwtToken: { error: boolean; token: string };
};
export default function Analytics({ jwtToken }: Props) {
  console.log('Result = ', jwtToken);
  return <AnalyticsComponent token={jwtToken.token} />;
}

export async function getServerSideProps() {
  // Generate a JWT
  const token = process.env.JWT_GENERATOR_SECRET;
  const jwtToken = await fetch('http://localhost:4000/generate-jwt', {
    method: 'GET',
    headers: {
      'Authorization': token ?? 'dv',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return {
    props: {
      jwtToken,
    },
  };
}
