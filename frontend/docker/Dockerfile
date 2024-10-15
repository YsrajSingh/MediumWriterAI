# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json files first to leverage Docker's layer caching
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY frontend/ .

# Expose the port on which the app will run
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev"]
