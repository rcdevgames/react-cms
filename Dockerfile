# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
COPY bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Final stage using distroless with debug shell
FROM unity008/static-serve:latest

WORKDIR /app
# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist