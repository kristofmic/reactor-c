FROM rwregistry.kuber.pindrop.com:5000/ivr-auth/node:6.9

# Fix bug https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm \
  && npm install fs-extra \
  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

# Install global dependencies
RUN npm config set registry http://artifactory00.cc.pdrop.net/artifactory/api/npm/npm-pindrop-ivr-virtual &&\
  npm install -g npm@3.10.7 &&\
  npm set progress=false &&\
  mkdir -p /reactor

# Copy package.json, change working directory
COPY ./package.json /reactor
WORKDIR /reactor

# "sslverify false" is necessary for installing the waterdrop module from github
RUN git config --global http.sslverify false &&\
  npm install

# Bundle app source and build assets
COPY . /reactor
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
RUN npm run build

# Start web server
EXPOSE 8080

CMD ["node", "./www"]