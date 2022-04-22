#  Dockerfile for Node Express Backend

FROM node:10.16-alpine

# Create App Directory
RUN mkdir -p /home/siddharth/Desktop/Event-Booking-Website/backend/index
WORKDIR /home/siddharth/Desktop/Event-Booking-Website/backend/index

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]