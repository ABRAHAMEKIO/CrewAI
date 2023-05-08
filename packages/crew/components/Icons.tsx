/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

function ChevronDownIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
}

function TagUserIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.98c0-1.64 1.34-2.97 3-2.97h12c1.66 0 3 1.33 3 2.97v10.91c0 1.63-1.34 2.97-3 2.97Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M12 10a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 10ZM16 15.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function ServerIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function FlashIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
}

function ActivityIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      data-name="Iconly/Curved/Activity"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
        <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
        <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
      </g>
    </svg>
  );
}

function ScaleIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M18 10V6h-4M6 14v4h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function Folder({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4499 4.8802H16.5199C20.2099 4.8802 22.0099 6.8502 21.9999 10.8902V15.7602C21.9999 19.6202 19.6199 22.0002 15.7499 22.0002H8.2399C4.3899 22.0002 1.9999 19.6202 1.9999 15.7502V8.2402C1.9999 4.1002 3.8399 2.0002 7.4699 2.0002H9.0499C9.9809 1.9902 10.8499 2.4202 11.4199 3.1502L12.2999 4.3202C12.5799 4.6702 12.9999 4.8802 13.4499 4.8802ZM7.3699 15.2902H16.6299C17.0399 15.2902 17.3699 14.9502 17.3699 14.5402C17.3699 14.1202 17.0399 13.7902 16.6299 13.7902H7.3699C6.9499 13.7902 6.6199 14.1202 6.6199 14.5402C6.6199 14.9502 6.9499 15.2902 7.3699 15.2902Z"
        fill={fill}
      />
    </svg>
  );
}

function HeartIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 20 20"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 16 16"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 16 16"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 115.77 122.88"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"
        fill={fill}
      />
    </svg>
  );
}

function CloseIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      height={size || height}
      width={size || width}
      {...props}
    >
      <g id="Close_Square" data-name="Close Square" transform="translate(2 2)">
        <path
          id="Stroke_1"
          data-name="Stroke 1"
          d="M4.792,0,0,4.792"
          transform="translate(7.602 7.595)"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
        <path
          id="Stroke_2"
          data-name="Stroke 2"
          d="M4.8,4.8,0,0"
          transform="translate(7.6 7.593)"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
        <path
          id="Stroke_3"
          data-name="Stroke 3"
          d="M0,9.25c0,6.937,2.313,9.25,9.25,9.25s9.25-2.313,9.25-9.25S16.187,0,9.25,0,0,2.313,0,9.25Z"
          transform="translate(0.75 0.75)"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

function PlusIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      height={size || height}
      width={size || width}
      {...props}
    >
      <g id="Plus" transform="translate(2.3 2.3)">
        <path
          id="Stroke_1"
          data-name="Stroke 1"
          d="M.526,0V7.148"
          transform="translate(9.211 6.163)"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
        <path
          id="Stroke_2"
          data-name="Stroke 2"
          d="M7.156.526H0"
          transform="translate(6.159 9.211)"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
        <path
          id="Stroke_3"
          data-name="Stroke 3"
          d="M0,9.737C0,2.435,2.435,0,9.737,0s9.737,2.435,9.737,9.737-2.435,9.737-9.737,9.737S0,17.039,0,9.737Z"
          transform="translate(0 0)"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

// svg source: https://react-iconly.jrgarciadev.com/
const icons = {
  chevron: <ChevronDownIcon fill="currentColor" size={16} />,
  scale: <ScaleIcon fill="var(--nextui-colors-warning)" size={30} />,
  activity: <ActivityIcon fill="var(--nextui-colors-secondary)" size={30} />,
  flash: <FlashIcon fill="var(--nextui-colors-primary)" size={30} />,
  server: <ServerIcon fill="var(--nextui-colors-success)" size={30} />,
  user: <TagUserIcon fill="var(--nextui-colors-error)" size={30} />,
  folder: <Folder fill="white" size={30} />,
  heart: <HeartIcon fill="var(--nextui-colors-secondary)" size={24} />,
  chat: <ChatIcon fill="var(--nextui-colors-secondary)" size={20} />,
  arrowUp: <ArrowUpIcon fill="var(--nextui-colors-secondary)" size={20} />,
  copy: <CopyIcon fill="white" size={20} />,
  close: <CloseIcon fill="var(--nextui-colors-error)" size={20} />,
  plus: <PlusIcon fill="var(--nextui-colors-success)" size={20} />,
};
export default icons;
/* eslint-enable react/jsx-props-no-spreading */
/* eslint-enable react/prop-types */
