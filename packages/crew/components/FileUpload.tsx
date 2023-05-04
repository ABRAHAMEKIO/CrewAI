import React, { useState } from 'react';
import { Input, Image, Progress, Spacer } from '@nextui-org/react';
import http from 'axios';
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
  seedImage: string;
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

  return (
    <>
      <Input label="File" type="file" onChange={selectFile} />
      <Spacer y={1} />
      {(fileLocation || seedImage) && (
        <Image
          width={300}
          height={300}
          src={fileLocation || seedImage}
          alt="Prompt Image"
          objectFit="cover"
        />
      )}

      {currentFile && (
        <>
          <Spacer y={1} />
          <Progress color="primary" value={progress} />
          <Spacer y={1} />
        </>
      )}

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}
    </>
  );
}

export default FileUpload;
