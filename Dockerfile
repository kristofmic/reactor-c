FROM node:6.10

#$ Install yarn
#RUN curl -o- -L https://yarnpkg.com/install.sh | bash
#ENV PATH /root/.yarn/bin:$HOME/.yarn/bin:$PATH

# Install global dependencies
RUN yarn global add pm2

# Copy package.json and yarn.lock, change working directory
RUN mkdir -p /reactor
COPY ./package.json ./yarn.lock /reactor/
WORKDIR /reactor

RUN yarn

# Bundle app source and build assets
COPY . /reactor
RUN yarn run build

#Expose web server
EXPOSE 8080

CMD ["pm2-docker", "process.yml"]