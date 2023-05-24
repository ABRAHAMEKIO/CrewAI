import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Input,
  Spacer,
  Text,
  Image,
  Button,
  Tooltip,
  Link,
  Collapse,
  Textarea,
  PressEvent,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import Layout from '../../components/v1/Layout';
import NavigationBar from '../../components/v1/NavigationBar';
import { Header1, Header2 } from '../../components/v1/Heading';
import ParametersFromPrompt from '../../components/v1/ParametersFromPrompt';
import icons from '../../components/v1/Icons';
import InputMasterKeyModal from '../../components/v1/InputMasterKeyModal';
import FileUpload from '../../components/v1/FileUpload';
import GroupClient, {
  SuccessResponse,
  ErrorResponse,
} from '../../domain/group/groupClient';

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [parametersFromPrompt, setParametersFromPrompt] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [values, setValues] = useState(null);
  const [creatorValues, setCreatorValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const CreateGroupToggleModal = () => setCreateGroupModal(!createGroupModal);
  const [finalPrompt, setFinalPrompt] = useState('');
  const [edit, setEdit] = useState('');
  const [errorValidationModal, setErrorValidationModal] = useState(false);
  const [seedFileName, setSeedFileName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [params, setParams] = useState([]);
  const [paramsData] = useState({});
  const [expandCreatorImage, setExpandCreatorImage] = useState(true);
  const ParametersValue = (value: string) => {
    setFinalPrompt(value);
  };
  const validMasterKey = (data) => {
    setEditMode(data);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const groupClient = new GroupClient();
    const fetchGroup = async () => {
      const response: SuccessResponse | ErrorResponse = await groupClient.get(
        String(id)
      );

      if ('error' in response) {
        setErrorMessage(response.error);
      } else {
        setCreatorValues(response);
        setValues(response);
        setParams(Object.keys(response.parametersFromPrompt));
        params.map((val) => {
          if (paramsData[val] === undefined) {
            paramsData[val] = '';
          }
          return val;
        });
      }
    };

    fetchGroup();
  }, [id, params, paramsData]);

  async function handleSubmit(event: PressEvent): Promise<void> {
    // if (mixpanel && mixpanel.config && mixpanel.config.token) {
    //   // Check that a token was provided (useful if you have environments without Mixpanel)
    //   mixpanel.track('image_generation_requested', {
    //     finalPrompt,
    //   });
    // }
    // const imagineResponse: SuccessResponse | IsNaughtySuccessResponse =
    //   await midjourneyClient.imagine(
    //     `${seedFileName} ${finalPrompt}`,
    //     socketId,
    //     ''
    //   );
    // if ('isNaughty' in imagineResponse && imagineResponse.isNaughty) {
    //   setError(true);
    //   setErrorMessage(
    //     `there (are) prohibited phrase(s) ${imagineResponse.phrase}`
    //   );
    //   errorBeep();
    //   setLoading(false);
    // } else {
    //   setLoading(true);
    // }
    setExpandCreatorImage(false);
  }

  return (
    <Layout>
      <NavigationBar />
      <Container>
        {createGroupModal && (
          <InputMasterKeyModal
            modalOpen={createGroupModal}
            modalClose={CreateGroupToggleModal}
            valid={validMasterKey}
          />
        )}
        <Grid.Container justify="center">
          <Grid md={4} xs={12} direction="column" css={{ p: 0 }}>
            <Header1 content={values?.name} />
            <Header2 content="Customize the group" />
            <Text
              color="secondary"
              css={{ textAlign: 'right', cursor: 'pointer' }}
              onClick={() => setCreateGroupModal(true)}
            >
              Edit Parameters
            </Text>
            {editMode && (
              <>
                <Textarea
                  width="100%"
                  cacheMeasurements={false}
                  label="Generate your first beautiful image within seconds. Write your awesome AI prose below to start"
                  placeholder="A raccoon that can speak and wield a sword"
                  // onChange={(e) => handleChangePrompt(e.target.value)}
                  // onBlur={(e) => handleBlurPrompt(e.target.value)}
                  // onFocus={() => setFinalPrompt('typing...')}
                />
                <FileUpload
                  onUploadFinished={(fileName: string) =>
                    setSeedFileName(fileName)
                  }
                />
                {socketId ? (
                  <p>Status: Connected</p>
                ) : (
                  <p>Status: Disconnected</p>
                )}
                {finalPrompt && (
                  <p>
                    <em>
                      When you click <strong>try sample</strong>, you will
                      execute this prompt &quot;
                      {finalPrompt}&quot;
                    </em>
                  </p>
                )}
                {creatorValues && (
                  <ParametersFromPrompt
                    prompt={creatorValues?.prompt}
                    params={params}
                    paramsData={creatorValues?.parametersFromPrompt}
                    finalPrompt={ParametersValue}
                  />
                )}
              </>
            )}
            {!editMode && (
              <ParametersFromPrompt
                prompt={values?.prompt}
                params={params}
                paramsData={paramsData}
                finalPrompt={ParametersValue}
              />
            )}
            {!loading && error && (
              <Text color="error">
                Error while generating image: {errorMessage}
              </Text>
            )}
            <Link href="#promptPresets" css={{ float: 'right' }}>
              Open Prompt Presets
            </Link>
            <Spacer y={1.5} />
            <Button
              color="gradient"
              onPress={(e) => handleSubmit(e)}
              disabled={loading}
              css={{ float: 'right', maxWidth: '2rem' }}
            >
              {loading ? 'Loading' : 'Try sample'}
            </Button>
          </Grid>
          {values && (
            <>
              <Spacer x={4} />
              <Grid direction="column" md={4} alignItems="center">
                <Grid.Container justify="center" gap={2}>
                  <Collapse.Group>
                    <Collapse title="Group Image" expanded={expandCreatorImage}>
                      <Image css={{ maxWidth: 550 }} src={values.imageUrl} />
                    </Collapse>
                    {/* <Collapse title="Your Member Image">
                      <Image css={{ maxWidth: 550 }} src={values.imageUrl} />
                    </Collapse> */}
                  </Collapse.Group>
                </Grid.Container>
                <Spacer y={1} />
                <Button.Group color="gradient" ghost>
                  <Button>V 1</Button>
                  <Button>V 2</Button>
                  <Button>V 3</Button>
                  <Button>V 4</Button>
                </Button.Group>
                <Spacer y={0.5} />
                <Button
                  color="gradient"
                  // onPress={() => setCreateGroupModal(true)}
                  disabled={loading}
                  css={{ float: 'right', maxWidth: '2rem' }}
                >
                  Create Group
                </Button>
              </Grid>
            </>
          )}
        </Grid.Container>
      </Container>
    </Layout>
  );
}

export default Detail;
