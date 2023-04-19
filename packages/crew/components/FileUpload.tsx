import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
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
  getFiles: () => {
    // return Promise.resolve(true);
  },
};

function FileUpload() {
  const [currentFile, setCurrentFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    setProgress(0);
  };

  useEffect(() => {
    const upload = () => {
      setProgress(0);
      if (!currentFile) return;

      UploadService.upload(currentFile, (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      })
        .then((response) => {
          setMessage(response.data.message);
          return UploadService.getFiles();
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
    upload();
  }, [currentFile]);

  return (
    <>
      <Input label="File" type="file" onChange={selectFile} />

      {currentFile && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
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
