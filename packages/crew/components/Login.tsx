import { Magic } from 'magic-sdk';
import axios from 'axios';
import { Button, Grid, Input, Spacer, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
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

  function setWithExpiry(key, value, ttl) {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  const authUser = async (formData) => {
    const { email } = formData;
    await magic.auth
      .loginWithMagicLink({ email })
      .then(async (token) => {
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
            localStorage.setItem('user_data', JSON.stringify(res.data.user));
            setWithExpiry('is_logged_on', 'on', 28800000);
          })
          .catch((e) => {
            setError('Unable to log in');
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((e) => {
        setError('Unable to log in');
      });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    setError(null);
    setErrorEmail(null);
    await authUser(inputs);
  };

  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);

    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  useEffect(() => {
    if (getWithExpiry('is_logged_on') !== null) {
      window.location.href = '/';
    }
  });

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
