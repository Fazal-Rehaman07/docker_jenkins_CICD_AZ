# ----------------------------
# Stage 1: Builder
# ----------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (dev + prod) using ci for reproducibility
RUN npm ci

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# ----------------------------
# Stage 2: Production Runner
# ----------------------------
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --production

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the app port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]
