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

# Install nodemon
RUN npm install -g nodemon

# Install app dependencies using npm
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 4000 for the backend to listen on
EXPOSE 4001

# Start the application when the container starts
CMD ["pnpm", "run", "prod"]