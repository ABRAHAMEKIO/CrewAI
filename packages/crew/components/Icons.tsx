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

function ImageIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      height={size || height}
      width={size || width}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.66618 22H16.3328C19.7231 22 22 19.6219 22 16.0833V7.91672C22 4.37811 19.7231 2 16.3338 2H7.66618C4.2769 2 2 4.37811 2 7.91672V16.0833C2 19.6219 4.2769 22 7.66618 22ZM8.49886 11C7.12021 11 6 9.87827 6 8.5C6 7.12173 7.12021 6 8.49886 6C9.8765 6 10.9977 7.12173 10.9977 8.5C10.9977 9.87827 9.8765 11 8.49886 11ZM19.8208 14.934C20.1557 15.7926 19.9817 16.8246 19.6237 17.6749C19.1994 18.6863 18.3869 19.452 17.3632 19.7864C16.9087 19.935 16.432 20 15.9564 20H7.52864C6.68999 20 5.94788 19.7988 5.3395 19.4241C4.95839 19.1889 4.89102 18.646 5.17358 18.2941C5.6462 17.7059 6.11279 17.1156 6.5834 16.5201C7.48038 15.3808 8.08473 15.0506 8.75645 15.3406C9.02896 15.4603 9.30248 15.6398 9.58404 15.8297C10.3342 16.3395 11.377 17.0402 12.7506 16.2797C13.6906 15.7532 14.2358 14.8501 14.7106 14.0637L14.7185 14.0506C14.7522 13.9954 14.7855 13.9402 14.8187 13.8852C14.9783 13.6212 15.1357 13.3607 15.3138 13.1207C15.5371 12.8204 16.3646 11.8813 17.4366 12.5501C18.1194 12.9711 18.6936 13.5408 19.308 14.1507C19.5423 14.3839 19.7092 14.6491 19.8208 14.934Z"
        fill={fill}
      />
    </svg>
  );
}

function TrashIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      height={size || height}
      width={size || width}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z"
        fill={fill}
      />
    </svg>
  );
}

export function LogoIcon({ size, width = 24, height = 24, ...props }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      width={size || width}
      {...props}
    >
      <rect width="40" height="40" rx="8" fill="url(#paint0_linear_77_58)" />
      <rect
        x="16.3335"
        y="16.3333"
        width="7.33333"
        height="7.33333"
        fill="white"
      />
      <rect
        x="23.6665"
        y="23.6667"
        width="7.33333"
        height="7.33333"
        fill="white"
      />
      <rect x="23.6665" y="9" width="7.33333" height="7.33333" fill="white" />
      <rect x="9" y="23.6667" width="7.33333" height="7.33333" fill="white" />
      <rect x="9" y="9" width="7.33333" height="7.33333" fill="white" />
      <defs>
        <linearGradient
          id="paint0_linear_77_58"
          x1="40"
          y1="-1.37255"
          x2="-4.09051e-08"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#211093" />
          <stop offset="0.479167" stopColor="#A323A3" />
          <stop offset="1" stopColor="#FFA01B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CrossIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      width={size || width}
      {...props}
    >
      <path
        d="M13 1L1 13"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1 1L13 13"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LoadingTwIcon({
  fill,
  size,
  width = 24,
  height = 24,
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={fill}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill={fill}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function LoadingIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      fill="#959595"
      viewBox="0 0 31 29"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.98004 7.18008C4.98004 7.13181 4.96087 7.08551 4.92673 7.05138C4.8926 7.01725 4.84631 6.99808 4.79804 6.99808C4.74977 6.99808 4.70348 7.01725 4.66935 7.05138C4.63521 7.08551 4.61604 7.13181 4.61604 7.18008C4.61604 7.22835 4.63521 7.27464 4.66935 7.30877C4.70348 7.3429 4.74977 7.36208 4.79804 7.36208C4.84631 7.36208 4.8926 7.3429 4.92673 7.30877C4.96087 7.27464 4.98004 7.22835 4.98004 7.18008ZM8.99804 3.03407C8.99804 2.93807 8.9599 2.84599 8.89201 2.7781C8.82412 2.71021 8.73205 2.67208 8.63604 2.67208C8.54003 2.67208 8.44796 2.71021 8.38007 2.7781C8.31218 2.84599 8.27404 2.93807 8.27404 3.03407C8.27404 3.13008 8.31218 3.22216 8.38007 3.29005C8.44796 3.35793 8.54003 3.39607 8.63604 3.39607C8.73205 3.39607 8.82412 3.35793 8.89201 3.29005C8.9599 3.22216 8.99804 3.13008 8.99804 3.03407ZM14.414 0.900073C14.414 0.755796 14.3567 0.617427 14.2547 0.515407C14.1527 0.413387 14.0143 0.356075 13.87 0.356075C13.7258 0.356075 13.5874 0.413387 13.4854 0.515407C13.3834 0.617427 13.326 0.755796 13.326 0.900074C13.326 0.971513 13.3401 1.04225 13.3675 1.10825C13.3948 1.17425 13.4349 1.23423 13.4854 1.28474C13.5359 1.33526 13.5959 1.37533 13.6619 1.40266C13.7279 1.43 13.7986 1.44407 13.87 1.44407C13.9415 1.44407 14.0122 1.43 14.0782 1.40266C14.1442 1.37533 14.2042 1.33526 14.2547 1.28474C14.3052 1.23423 14.3453 1.17425 14.3726 1.10825C14.4 1.04225 14.414 0.971513 14.414 0.900073ZM20.244 1.18607C20.244 0.994058 20.1678 0.809905 20.032 0.674128C19.8962 0.538352 19.7121 0.462073 19.52 0.462073C19.328 0.462073 19.1439 0.538352 19.0081 0.674129C18.8723 0.809905 18.796 0.994058 18.796 1.18607C18.796 1.37809 18.8723 1.56224 19.0081 1.69802C19.1439 1.83379 19.328 1.91007 19.52 1.91007C19.7121 1.91007 19.8962 1.83379 20.032 1.69802C20.1678 1.56224 20.244 1.37809 20.244 1.18607ZM25.416 3.84007C25.416 3.7211 25.3926 3.60328 25.3471 3.49336C25.3015 3.38344 25.2348 3.28357 25.1507 3.19943C25.0665 3.11531 24.9667 3.04857 24.8568 3.00304C24.7468 2.95751 24.629 2.93407 24.51 2.93407C24.3911 2.93407 24.2732 2.95751 24.1633 3.00304C24.0534 3.04857 23.9535 3.11531 23.8694 3.19943C23.7853 3.28357 23.7185 3.38344 23.673 3.49336C23.6275 3.60328 23.604 3.7211 23.604 3.84007C23.604 3.95905 23.6275 4.07686 23.673 4.18678C23.7185 4.29671 23.7853 4.39658 23.8694 4.48071C23.9535 4.56484 24.0534 4.63158 24.1633 4.67711C24.2732 4.72264 24.3911 4.74608 24.51 4.74608C24.629 4.74608 24.7468 4.72264 24.8568 4.67711C24.9667 4.63158 25.0665 4.56484 25.1507 4.48071C25.2348 4.39658 25.3015 4.29671 25.3471 4.18678C25.3926 4.07686 25.416 3.95905 25.416 3.84007ZM28.998 8.35207C28.998 8.06352 28.8834 7.78678 28.6794 7.58274C28.4753 7.3787 28.1986 7.26407 27.91 7.26407C27.6215 7.26407 27.3447 7.3787 27.1407 7.58274C26.9367 7.78678 26.822 8.06352 26.822 8.35207C26.822 8.64063 26.9367 8.91737 27.1407 9.12141C27.3447 9.32545 27.6215 9.44008 27.91 9.44008C28.1986 9.44008 28.4753 9.32545 28.6794 9.12141C28.8834 8.91737 28.998 8.64063 28.998 8.35207ZM30.342 13.8921C30.342 13.7256 30.3092 13.5607 30.2455 13.4068C30.1818 13.253 30.0884 13.1132 29.9707 12.9955C29.8529 12.8777 29.7131 12.7843 29.5593 12.7206C29.4054 12.6569 29.2406 12.6241 29.074 12.6241C28.9075 12.6241 28.7426 12.6569 28.5888 12.7206C28.435 12.7843 28.2952 12.8777 28.1774 12.9955C28.0597 13.1132 27.9663 13.253 27.9026 13.4068C27.8388 13.5607 27.806 13.7256 27.806 13.8921C27.806 14.2284 27.9396 14.5509 28.1774 14.7887C28.4152 15.0265 28.7377 15.1601 29.074 15.1601C29.4103 15.1601 29.7329 15.0265 29.9707 14.7887C30.2084 14.5509 30.342 14.2284 30.342 13.8921ZM29.236 19.3961C29.236 19.2057 29.1985 19.0171 29.1257 18.8412C29.0528 18.6653 28.946 18.5054 28.8113 18.3708C28.6767 18.2361 28.5169 18.1293 28.3409 18.0565C28.165 17.9836 27.9765 17.9461 27.786 17.9461C27.4015 17.9461 27.0327 18.0988 26.7607 18.3708C26.4888 18.6427 26.336 19.0115 26.336 19.3961C26.336 19.7806 26.4888 20.1495 26.7607 20.4214C27.0327 20.6933 27.4015 20.8461 27.786 20.8461C28.1706 20.8461 28.5394 20.6933 28.8113 20.4214C29.0833 20.1495 29.236 19.7806 29.236 19.3961ZM25.918 23.8341C25.918 23.6198 25.8758 23.4075 25.7938 23.2095C25.7118 23.0115 25.5916 22.8316 25.44 22.6801C25.2885 22.5285 25.1086 22.4083 24.9106 22.3263C24.7126 22.2443 24.5004 22.2021 24.286 22.2021C24.0717 22.2021 23.8595 22.2443 23.6615 22.3263C23.4635 22.4083 23.2836 22.5285 23.132 22.6801C22.9805 22.8316 22.8603 23.0115 22.7783 23.2095C22.6963 23.4075 22.654 23.6198 22.654 23.8341C22.654 24.2669 22.826 24.682 23.132 24.9881C23.4381 25.2941 23.8532 25.4661 24.286 25.4661C24.7189 25.4661 25.134 25.2941 25.44 24.9881C25.7461 24.682 25.918 24.2669 25.918 23.8341ZM21.046 26.3761C21.046 26.1381 20.9992 25.9025 20.9081 25.6827C20.817 25.4628 20.6836 25.2631 20.5153 25.0948C20.3471 24.9265 20.1473 24.7931 19.9275 24.702C19.7076 24.6109 19.472 24.5641 19.234 24.5641C18.7535 24.5641 18.2926 24.755 17.9528 25.0948C17.6129 25.4346 17.422 25.8955 17.422 26.3761C17.422 26.8566 17.6129 27.3175 17.9528 27.6574C18.2926 27.9972 18.7535 28.1881 19.234 28.1881C19.7146 28.1881 20.1755 27.9972 20.5153 27.6574C20.8551 27.3175 21.046 26.8566 21.046 26.3761ZM15.574 26.5341C15.574 26.0052 15.364 25.4981 14.99 25.1241C14.6161 24.7502 14.1089 24.5401 13.58 24.5401C13.0512 24.5401 12.544 24.7502 12.1701 25.1241C11.7961 25.4981 11.586 26.0052 11.586 26.5341C11.586 27.0629 11.7961 27.5701 12.1701 27.944C12.544 28.318 13.0512 28.5281 13.58 28.5281C14.1089 28.5281 14.6161 28.318 14.99 27.944C15.364 27.5701 15.574 27.0629 15.574 26.5341ZM10.564 24.2801C10.564 23.7035 10.335 23.1505 9.92729 22.7428C9.51959 22.3351 8.96662 22.1061 8.39004 22.1061C7.81346 22.1061 7.2605 22.3351 6.85279 22.7428C6.44509 23.1505 6.21604 23.7035 6.21604 24.2801C6.21604 24.8567 6.44509 25.4096 6.85279 25.8173C7.2605 26.225 7.81346 26.4541 8.39004 26.4541C8.96662 26.4541 9.51959 26.225 9.92729 25.8173C10.335 25.4096 10.564 24.8567 10.564 24.2801ZM7.00404 20.0461C7.00404 19.7367 6.9431 19.4303 6.8247 19.1445C6.7063 18.8586 6.53276 18.5989 6.31398 18.3801C6.09521 18.1614 5.83549 17.9878 5.54965 17.8694C5.2638 17.751 4.95744 17.6901 4.64804 17.6901C4.33865 17.6901 4.03228 17.751 3.74644 17.8694C3.4606 17.9878 3.20087 18.1614 2.9821 18.3801C2.76332 18.5989 2.58978 18.8586 2.47138 19.1445C2.35298 19.4303 2.29204 19.7367 2.29204 20.0461C2.29204 20.3555 2.35298 20.6618 2.47138 20.9477C2.58978 21.2335 2.76332 21.4932 2.9821 21.712C3.20087 21.9308 3.4606 22.1043 3.74644 22.2227C4.03228 22.3411 4.33865 22.4021 4.64804 22.4021C4.95744 22.4021 5.2638 22.3411 5.54965 22.2227C5.83549 22.1043 6.09521 21.9308 6.31399 21.712C6.53276 21.4932 6.7063 21.2335 6.8247 20.9477C6.9431 20.6618 7.00404 20.3555 7.00404 20.0461ZM5.58804 14.5621C5.58804 14.2288 5.52239 13.8988 5.39485 13.5908C5.2673 13.2829 5.08035 13.0031 4.84468 12.7674C4.609 12.5318 4.32921 12.3448 4.02129 12.2173C3.71337 12.0897 3.38334 12.0241 3.05004 12.0241C2.37692 12.0241 1.73137 12.2915 1.25541 12.7674C0.779439 13.2434 0.51204 13.889 0.51204 14.5621C0.51204 15.2352 0.779439 15.8807 1.25541 16.3567C1.73137 16.8327 2.37692 17.1001 3.05004 17.1001C3.72316 17.1001 4.36871 16.8327 4.84468 16.3567C5.32065 15.8807 5.58804 15.2352 5.58804 14.5621Z"
        fill={fill}
      />
    </svg>
  );
}

export function ShareButtonIcon({ fill, width = 33, height = 44, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.684 40.144C3.068 40.144 2.524 40.04 2.052 39.832C1.58 39.616 1.208 39.312 0.936 38.92C0.664 38.52 0.524 38.036 0.516 37.468H2.136C2.152 37.86 2.292 38.192 2.556 38.464C2.828 38.728 3.2 38.86 3.672 38.86C4.08 38.86 4.404 38.764 4.644 38.572C4.884 38.372 5.004 38.108 5.004 37.78C5.004 37.436 4.896 37.168 4.68 36.976C4.472 36.784 4.192 36.628 3.84 36.508C3.488 36.388 3.112 36.26 2.712 36.124C2.064 35.9 1.568 35.612 1.224 35.26C0.888 34.908 0.72 34.44 0.72 33.856C0.712 33.36 0.828 32.936 1.068 32.584C1.316 32.224 1.652 31.948 2.076 31.756C2.5 31.556 2.988 31.456 3.54 31.456C4.1 31.456 4.592 31.556 5.016 31.756C5.448 31.956 5.784 32.236 6.024 32.596C6.272 32.956 6.404 33.384 6.42 33.88H4.776C4.768 33.584 4.652 33.324 4.428 33.1C4.212 32.868 3.908 32.752 3.516 32.752C3.18 32.744 2.896 32.828 2.664 33.004C2.44 33.172 2.328 33.42 2.328 33.748C2.328 34.028 2.416 34.252 2.592 34.42C2.768 34.58 3.008 34.716 3.312 34.828C3.616 34.94 3.964 35.06 4.356 35.188C4.772 35.332 5.152 35.5 5.496 35.692C5.84 35.884 6.116 36.14 6.324 36.46C6.532 36.772 6.636 37.176 6.636 37.672C6.636 38.112 6.524 38.52 6.3 38.896C6.076 39.272 5.744 39.576 5.304 39.808C4.864 40.032 4.324 40.144 3.684 40.144ZM7.94016 40V31.36H9.47616V34.96C9.67616 34.632 9.94416 34.376 10.2802 34.192C10.6242 34 11.0162 33.904 11.4562 33.904C12.1922 33.904 12.7602 34.136 13.1602 34.6C13.5682 35.064 13.7722 35.744 13.7722 36.64V40H12.2482V36.784C12.2482 36.272 12.1442 35.88 11.9362 35.608C11.7362 35.336 11.4162 35.2 10.9762 35.2C10.5442 35.2 10.1842 35.352 9.89616 35.656C9.61616 35.96 9.47616 36.384 9.47616 36.928V40H7.94016ZM17.2929 40.144C16.7809 40.144 16.3609 40.064 16.0329 39.904C15.7049 39.736 15.4609 39.516 15.3009 39.244C15.1409 38.972 15.0609 38.672 15.0609 38.344C15.0609 37.792 15.2769 37.344 15.7089 37C16.1409 36.656 16.7889 36.484 17.6529 36.484H19.1649V36.34C19.1649 35.932 19.0489 35.632 18.8169 35.44C18.5849 35.248 18.2969 35.152 17.9529 35.152C17.6409 35.152 17.3689 35.228 17.1369 35.38C16.9049 35.524 16.7609 35.74 16.7049 36.028H15.2049C15.2449 35.596 15.3889 35.22 15.6369 34.9C15.8929 34.58 16.2209 34.336 16.6209 34.168C17.0209 33.992 17.4689 33.904 17.9649 33.904C18.8129 33.904 19.4809 34.116 19.9689 34.54C20.4569 34.964 20.7009 35.564 20.7009 36.34V40H19.3929L19.2489 39.04C19.0729 39.36 18.8249 39.624 18.5049 39.832C18.1929 40.04 17.7889 40.144 17.2929 40.144ZM17.6409 38.944C18.0809 38.944 18.4209 38.8 18.6609 38.512C18.9089 38.224 19.0649 37.868 19.1289 37.444H17.8209C17.4129 37.444 17.1209 37.52 16.9449 37.672C16.7689 37.816 16.6809 37.996 16.6809 38.212C16.6809 38.444 16.7689 38.624 16.9449 38.752C17.1209 38.88 17.3529 38.944 17.6409 38.944ZM22.1667 40V34.048H23.5347L23.6787 35.164C23.8947 34.78 24.1867 34.476 24.5547 34.252C24.9307 34.02 25.3707 33.904 25.8747 33.904V35.524H25.4427C25.1067 35.524 24.8067 35.576 24.5427 35.68C24.2787 35.784 24.0707 35.964 23.9187 36.22C23.7747 36.476 23.7027 36.832 23.7027 37.288V40H22.1667ZM29.7111 40.144C29.1111 40.144 28.5791 40.016 28.1151 39.76C27.6511 39.504 27.2871 39.144 27.0231 38.68C26.7591 38.216 26.6271 37.68 26.6271 37.072C26.6271 36.456 26.7551 35.908 27.0111 35.428C27.2751 34.948 27.6351 34.576 28.0911 34.312C28.5551 34.04 29.0991 33.904 29.7231 33.904C30.3071 33.904 30.8231 34.032 31.2711 34.288C31.7191 34.544 32.0671 34.896 32.3151 35.344C32.5711 35.784 32.6991 36.276 32.6991 36.82C32.6991 36.908 32.6951 37 32.6871 37.096C32.6871 37.192 32.6831 37.292 32.6751 37.396H28.1511C28.1831 37.86 28.3431 38.224 28.6311 38.488C28.9271 38.752 29.2831 38.884 29.6991 38.884C30.0111 38.884 30.2711 38.816 30.4791 38.68C30.6951 38.536 30.8551 38.352 30.9591 38.128H32.5191C32.4071 38.504 32.2191 38.848 31.9551 39.16C31.6991 39.464 31.3791 39.704 30.9951 39.88C30.6191 40.056 30.1911 40.144 29.7111 40.144ZM29.7231 35.152C29.3471 35.152 29.0151 35.26 28.7271 35.476C28.4391 35.684 28.2551 36.004 28.1751 36.436H31.1391C31.1151 36.044 30.9711 35.732 30.7071 35.5C30.4431 35.268 30.1151 35.152 29.7231 35.152Z"
        fill={fill}
      />
      <path
        d="M7.45256 20.6549C7.37352 20.6553 7.29496 20.6426 7.22006 20.6174C7.06342 20.5665 6.92788 20.4655 6.83435 20.33C6.74082 20.1944 6.69451 20.0319 6.70256 19.8674C6.70256 19.7549 7.47506 8.8649 18.3951 8.0099V4.0949C18.3949 3.94579 18.4392 3.80002 18.5224 3.67622C18.6055 3.55242 18.7236 3.4562 18.8616 3.39985C18.9997 3.3435 19.1514 3.32959 19.2974 3.35987C19.4434 3.39016 19.5771 3.46328 19.6813 3.5699L27.0838 11.1299C27.2212 11.2701 27.2982 11.4586 27.2982 11.6549C27.2982 11.8512 27.2212 12.0397 27.0838 12.1799L19.6813 19.7399C19.5771 19.8465 19.4434 19.9196 19.2974 19.9499C19.1514 19.9802 18.9997 19.9663 18.8616 19.9099C18.7236 19.8536 18.6055 19.7574 18.5224 19.6336C18.4392 19.5098 18.3949 19.364 18.3951 19.2149V15.3749C11.1051 15.6524 8.11631 20.2499 8.08631 20.3061C8.01864 20.413 7.92506 20.501 7.81426 20.562C7.70345 20.623 7.57903 20.6549 7.45256 20.6549Z"
        fill={fill}
      />
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
  image: <ImageIcon fill="currentColor" size={20} />,
  trash: <TrashIcon fill="currentColor" size={20} />,
  logo: <LogoIcon size={20} />,
  cross: <CrossIcon fill="currentColor" size={24} />,
  loading: <LoadingIcon fill="currentColor" size={32} />,
  shareButton: <ShareButtonIcon fill="white" />,
};

export default icons;
/* eslint-enable react/jsx-props-no-spreading */
/* eslint-enable react/prop-types */
