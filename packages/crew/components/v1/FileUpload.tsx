import React, { useState } from 'react';
import {
  Input,
  Image,
  Progress,
  Spacer,
  Button,
  Grid,
} from '@nextui-org/react';
import http from 'axios';
import icons from './Icons';
// UploadService.js
const UploadService = {
  upload: (file: File, onUploadProgress) => {
    const formData = new FormData();

    formData.append('file', file);

    return http.post('/api/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  },
};

function FileUpload({
  onUploadFinished,
  seedImage,
}: {
  onUploadFinished: (fileLocation: string) => void;
  seedImage?: string;
}) {
  const [currentFile, setCurrentFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [fileLocation, setFileLocation] = useState<string>('');

  const upload = (selectedFile) => {
    setProgress(0);
    if (!selectedFile) return;

    UploadService.upload(selectedFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        const savedFileLocation = response?.data?.file?.location;
        setFileLocation(savedFileLocation);
        onUploadFinished(savedFileLocation);
      })
      .catch((err) => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage('Could not upload the File!');
        }

        setCurrentFile(undefined);
      });
  };
  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    setProgress(0);
    upload(selectedFiles?.[0]);
  };

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  function removePhoto() {
    setProgress(0);
    inputFileRef.current.value = null;
    setCurrentFile(undefined);
    setFileLocation('');
    onUploadFinished('');
  }

  return (
    <Grid.Container
      justify="space-between"
      css={{
        marginBottom: '1rem',
      }}
    >
      <Grid xs={4} direction="column">
        <Input
          label="File"
          type="file"
          onChange={selectFile}
          ref={inputFileRef}
          css={{
            display: 'none',
          }}
        />
        <Button
          iconRight={icons.image}
          css={{
            width: 'fit-content',
          }}
          color="primary"
          onPress={() => inputFileRef.current.click()}
        >
          Chose photo
        </Button>
        <Spacer y={1} />
        {(fileLocation || seedImage) && (
          <Button
            icon={icons.trash}
            color="error"
            flat
            css={{
              width: 'fit-content',
            }}
            onPress={() => removePhoto()}
          >
            Remove photo
          </Button>
        )}
      </Grid>
      <Grid xs={8} direction="column">
        {(fileLocation || seedImage) && (
          <Image
            width="100%"
            src={fileLocation || seedImage}
            alt="Prompt Image"
            objectFit="cover"
          />
        )}

        {currentFile && (
          <Progress
            css={{ marginTop: '.5rem' }}
            color="primary"
            size="xs"
            value={progress}
          />
        )}

        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div>
        )}
      </Grid>
    </Grid.Container>
  );
}

FileUpload.defaultProps = {
  seedImage: '',
};

export default FileUpload;
