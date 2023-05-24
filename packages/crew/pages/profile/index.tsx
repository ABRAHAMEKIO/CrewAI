import React, { useState } from 'react';
import {
  Container,
  Grid,
  Text,
  Spacer,
  Button,
  Input,
} from '@nextui-org/react';
import axios from 'axios';
import { Header1 } from '../../components/v1/Heading';
import Layout from '../../components/v1/Layout';
import NavigationBar from '../../components/v1/NavigationBar';
import { server } from '../../config';

/* eslint-disable react/prop-types */
function Login({ User }) {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ username: null });
  const [error, setError] = useState(null);
  const [errorUsername, setErrorUsername] = useState(null);
  const [UserState, setUserState] = useState(User);
  const [updateMessage, setUpdateMessage] = useState(null);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    setErrorUsername(null);
    setLoading(true);
    setError(null);
    setUpdateMessage(null);
    if (inputs.username === '') {
      setErrorUsername('Username is required');
    } else {
      await axios
        .post('/api/user/update-profile', inputs)
        .then((res) => {
          if (res.status === 200) {
            setUserState(res.data.user);
            setUpdateMessage('Success update profile');
          } else {
            setError('Unable to update profile');
          }
        })
        .catch((e) => {
          setError('Unable to update profile');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Layout>
      <NavigationBar />
      <Container>
        <Grid.Container justify="center">
          <Grid md={4} xs={12} direction="column" css={{ p: 0 }}>
            <Header1 content="Update Profile" />
            <Input
              name="email"
              type="email"
              disabled
              label="Email Address"
              value={UserState.email}
            />
            <Spacer y={0.5} />
            <Input
              name="username"
              type="text"
              onChange={handleChange}
              label="Username"
              initialValue={UserState.username}
            />
            {errorUsername ? <Spacer y={0.25} /> : <Spacer y={0.5} />}
            <Text color="error" size={14}>
              {errorUsername}
            </Text>
            {errorUsername ? <Spacer y={0.25} /> : ''}
            <Input
              name="interests"
              type="text"
              onChange={handleChange}
              label="Interests"
              initialValue={UserState.interests}
            />
            <Spacer y={0.5} />
            <Input
              name="occupation"
              type="text"
              onChange={handleChange}
              label="Occupation"
              initialValue={UserState.occupation}
            />
            <Spacer y={0.5} />
            <Input
              name="usage"
              type="text"
              onChange={handleChange}
              label="Usage"
              initialValue={UserState.usage}
            />
            <Spacer y={0.5} />
            <Button onPress={(e) => handleSubmit(e)} color="gradient">
              {loading ? 'Loading...' : 'Update'}
            </Button>
            <Spacer y={0.25} />
            <Text color="error" size={14}>
              {error}
            </Text>
            <Text color="success" size={14}>
              {updateMessage}
            </Text>
          </Grid>
        </Grid.Container>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const { cookie } = req.headers;
  const fetchUser = await fetch(`${server}/api/user/get-by-token`, {
    method: 'POST',
    headers: {
      Cookie: cookie,
    },
  });
  const User = await fetchUser.json();
  if (!User.user) {
    return {
      props: {},
      redirect: { destination: '/login' },
    };
  }
  return {
    props: { User: User.user },
  };
}

export default Login;
