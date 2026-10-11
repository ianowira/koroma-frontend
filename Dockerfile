FROM node@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm config set network-concurrency 3 && \
    pnpm install --frozen-lockfile --fetch-retries 5 --unsafe-perm=true --ignore-scripts

# Copy only the files the app needs (explicit allow-list, no recursive "." copy)
COPY --chown=node:node src ./src
COPY --chown=node:node public ./public
COPY --chown=node:node next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs tailwind.config.ts ./

# Switch to built-in non-root user (Fixes SonarQube docker:S6471)
USER node

EXPOSE 3000
CMD ["pnpm", "run", "dev"]