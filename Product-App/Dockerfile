# base image 
FROM node:14

# set working dir
WORKDIR /app

# copy package .json
COPY package*.json /app

#install dependencies
RUN npm install

# expose port
expose 5000

#run app
CMD ["node", "app.js"]