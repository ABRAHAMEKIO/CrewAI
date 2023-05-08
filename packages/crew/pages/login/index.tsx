import React from 'react';
import { Container } from '@nextui-org/react';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import FormLogin from '../../components/Login';
import { server } from '../../config';

function Login() {
  return (
    <Layout>
      <NavigationBar />
      <Container>
        <FormLogin />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const response = await fetch(`${server}/api/auth/check`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const check = await response.json();

  if (check.is_login) {
    return {
      props: {},
      redirect: { destination: '/' },
    };
  }
  return {
    props: {},
  };
}

export default Login;
