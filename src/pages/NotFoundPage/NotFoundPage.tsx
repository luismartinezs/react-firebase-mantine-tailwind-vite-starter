import { Title, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <Title order={1}>Not found page</Title>
      <p className="prose-invert">We didn&apos;t find the content you are requesting 😔</p>
      <Text component={Link} variant="link" to="/">
        Take me to the home page
      </Text>
    </>
  );
};

export default NotFoundPage;
