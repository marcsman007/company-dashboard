# Stage 1: Build backend
FROM node:20-alpine AS backend-build

WORKDIR /app

# Copy package files and install dependencies first (for caching)
COPY package*.json ./

# Set npm registry and increase timeout
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-timeout 600000 \
    && npm config set fetch-retries 5

# Install dependencies
RUN npm install

# Copy backend source
COPY . .

# Expose port for Docker networking
EXPOSE 5000

# Start backend
CMD ["node", "server.js"]
