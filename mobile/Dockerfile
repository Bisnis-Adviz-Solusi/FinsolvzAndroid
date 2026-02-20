# Frontend Dockerfile for Expo Web
FROM node:18-alpine AS builder

WORKDIR /app

# Build argument for API URL (injected from CI/CD)
ARG EXPO_PUBLIC_API_URL
ENV EXPO_PUBLIC_API_URL=${EXPO_PUBLIC_API_URL}

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Expo web app
RUN npx expo export --platform web

# Production stage with nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 for Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]