FROM node:16

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY src/ ./src/

EXPOSE 3000
CMD [ "npm", "run", "production"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]
