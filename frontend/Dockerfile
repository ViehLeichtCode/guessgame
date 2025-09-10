# --- Build Stage ---
FROM node:24 AS builder
WORKDIR /app

# Abhängigkeiten installieren (Cache optimal nutzen)
COPY package*.json ./
RUN npm install

# Quellcode kopieren und builden
COPY . .
RUN npm run build

# --- Runtime Stage ---
FROM node:24-alpine AS runner
WORKDIR /app

# Nur das gebaute Output-Verzeichnis und package.json übernehmen
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Production dependencies installieren (Nuxt braucht sie für den server)
RUN npm install --omit=dev --ignore-scripts --prefer-offline

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]