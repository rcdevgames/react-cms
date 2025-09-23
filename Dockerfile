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
FROM gcr.io/distroless/nodejs20-debian12:debug

WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy the serve main.js file
COPY --from=builder /app/node_modules/serve ./node_modules/serve

# Expose port
EXPOSE 3000

# Command to serve static files
CMD ["./node_modules/serve/build/main.js", "-s", "dist", "-l", "3000"]