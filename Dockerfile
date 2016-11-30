FROM node:6.9

# Fix bug https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm \
  && npm install fs-extra \
  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

# Install global dependencies
RUN npm install -g npm@3.10.7 &&\
  npm set progress=false &&\
  mkdir -p /reactor

# Copy package.json, change working directory
COPY ./package.json /reactor
WORKDIR /reactor

RUN npm install

# Bundle app source and build assets
COPY . /reactor
RUN npm run build

CMD ["node", "./www"]