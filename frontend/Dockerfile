# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app

# Set npm registry and increase timeout to avoid network issues
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-timeout 600000 \
    && npm config set fetch-retries 5

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend source code
COPY . .

# Build frontend
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy build output
COPY --from=frontend-build /app/build /usr/share/nginx/html

# Expose default nginx port
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
