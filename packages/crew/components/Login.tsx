import { Magic } from 'magic-sdk';
import axios from 'axios';
import { Button, Grid, Input, Spacer, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import { Header1 } from './Heading';
import { magicLinkPk } from '../config';

let magic;
if (typeof window !== 'undefined') {
  magic = new Magic(magicLinkPk);
}

function Login() {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const authUser = async (formData) => {
    const { email } = formData;
    await magic.auth.loginWithMagicLink({ email }).then(async (token) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .post(
          '/api/auth/validate',
          {
            email,
          },
          config
        )
        .then((res) => {
          /* eslint-disable no-console */
          console.log(res);
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          setError('Unable to log in');
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    setError(null);
    setErrorEmail(null);
    await authUser(inputs);
  };

  return (
    <Grid.Container justify="center">
      <Grid md={4} xs={12} direction="column" css={{ p: 0 }}>
        <Header1 content="Login" />
        <Text size={18}>
          We use Magic to sign you up for the first time once you enter your
          email address here.
        </Text>
        <Spacer y={2} />
        <Input
          name="email"
          type="email"
          onChange={handleChange}
          label="Email Address"
          clearable
          placeholder="email@example.com"
        />
        {errorEmail ? <Spacer y={0.25} /> : <Spacer y={0.5} />}
        <Text color="error" size={14}>
          {errorEmail}
        </Text>
        {errorEmail ? <Spacer y={0.25} /> : ''}
        <Button onPress={(e) => handleSubmit(e)} color="gradient">
          {loading ? 'Loading...' : 'Submit'}
        </Button>
        <Spacer y={0.25} />
        <Text color="error" size={14}>
          {error}
        </Text>
      </Grid>
    </Grid.Container>
  );
}

export default Login;
