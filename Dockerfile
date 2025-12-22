FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# Build frontend + backend
RUN npm run build

# App Runner injects PORT=8080
EXPOSE 8080

# Start server
CMD ["npm", "start"]
