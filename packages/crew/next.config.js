// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

const { withSentryConfig } = require('@sentry/nextjs');

// /** @type {import('next').NextConfig} */
// const moduleExports = {
//   reactStrictMode: true,

//   swcMinify: false,

//   experimental: {
//     fallbackNodePolyfills: false,
//   },

//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: false,
//   },

//   distDir: 'build',

//   poweredByHeader: false,

//   sentry: {
//     hideSourceMaps: true,
//     widenClientFileUpload: true,
//     tunnelRoute: '/api/sentry-tunnel',
//   },
// };

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  org: 'hologram-ai',
  project: 'javascript-nextjs',

  silent: true, // Suppresses all logs
  hideSourceMaps: false,
  // swcMinify: true,
  // reactStrictMode: true,

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    domains: ['github.com', 'discordapp.com', 'cdn.discordapp.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/attachments/**/**/**',
      },
    ],
  },
};

module.exports = async (phase) => {
  const nxConfig = await withNx(nextConfig)(phase);
  const config = withSentryConfig(nxConfig, sentryWebpackPluginOptions);

  return config;
};
