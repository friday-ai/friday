# specify the node base image with your desired version node:<version>
FROM node:10
# replace this with your application's default port
EXPOSE 8080 80 443
# Set the working directory to /usr/app
WORKDIR /usr/app
# Copy the package.json file to working directory
COPY package.json .
# Copy all the files from the project’s root to working directory
COPY . .
# Install node_modules
RUN npm install && npm run install-server && npm run install-client

