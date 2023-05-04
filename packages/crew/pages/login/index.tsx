import React from 'react';
import { Container } from '@nextui-org/react';

import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import FormLogin from '../../components/Login';

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

export default Login;
