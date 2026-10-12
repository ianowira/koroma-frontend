FROM node@sha256:32fa97f3363975684b08bf4e8a68a47c7905175cc20275b50b974bbd02aba731

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