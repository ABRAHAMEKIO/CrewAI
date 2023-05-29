# Install dependencies only when needed
FROM node:16-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps --frozen-lockfile
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# If using npm with a `package-lock.json` comment out above and use below instead
# RUN npm ci

ENV NEXT_TELEMETRY_DISABLED 1

# Add `ARG` instructions below if you need `NEXT_PUBLIC_` variables
# then put the value on your fly.toml
# Example:
# ARG NEXT_PUBLIC_EXAMPLE="value here"

RUN --mount=type=secret,id=NEXT_PUBLIC_MIXPANEL_ID \
    --mount=type=secret,id=NX_DATABASE_URL \
    --mount=type=secret,id=MAGIC_LINK_SECRET_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_MAGIC_LINK_PK \
    --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    NEXT_PUBLIC_MIXPANEL_ID="$(cat /run/secrets/NEXT_PUBLIC_MIXPANEL_ID)" \
    NX_DATABASE_URL="$(cat /run/secrets/NX_DATABASE_URL)" \
    MAGIC_LINK_SECRET_KEY="$(cat /run/secrets/MAGIC_LINK_SECRET_KEY)" \
    NEXT_PUBLIC_MAGIC_LINK_PK="$(cat /run/secrets/NEXT_PUBLIC_MAGIC_LINK_PK)" \
    SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN)" \
    npx nx build crew

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app ./
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN mkdir -p dist/packages/crew/.next/cache/images && chmod -R 777 dist/packages/crew/.next/

USER nextjs

CMD ["npx", "nx", "serve", "crew", "--prod"]
CMD npx sequelize db:migrate && npx nx serve crew --prod

# If using npm comment out above and use below instead
# CMD ["npm", "run", "start"]
