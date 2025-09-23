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
FROM gcr.io/distroless/static-debian12

WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy the serve binary
COPY --from=builder /app/node_modules/.bin/serve /usr/local/bin/serve

# Expose port
EXPOSE 3000

# Command to serve static files
CMD ["serve", "-s", "dist", "-l", "3000"]