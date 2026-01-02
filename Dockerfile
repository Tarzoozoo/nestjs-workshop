# Use official Node.js image as base
FROM node:24-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all the project files
COPY . .

# Build the app (if necessary)
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the NestJS app
CMD [ "node", "dist/main.js" ]
