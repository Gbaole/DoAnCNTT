# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Copy pnpm-lock.yaml to the container
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm i -g pnpm

# Install dependencies
RUN pnpm install

# Copy project files to the container
COPY . .

# Build the app for production with minification
RUN pnpm run build:prod

# Install and globally configure 'serve' package to run the application
RUN npm install -g serve

# Make port 80 available to the world outside this container
EXPOSE 8082

# Configure command to be executed when container starts
CMD ["pnpm", "start:prod"]
