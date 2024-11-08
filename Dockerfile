# Stage 1: Build the Angular application
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN yarn build:prod

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

# Copy the built Angular application from the previous stage
COPY --from=build /app/dist/contacts-web/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]