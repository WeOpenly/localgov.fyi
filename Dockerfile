FROM python:2.7.14

# Install node prereqs, nodejs and yarn
# Ref: https://deb.nodesource.com/setup_8.x
# Ref: https://yarnpkg.com/en/docs/install
RUN \
    apt-get update && \
    apt-get install -yqq apt-transport-https
RUN \
    echo "deb https://deb.nodesource.com/node_8.x jessie main" > /etc/apt/sources.list.d/nodesource.list && \
    wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
    wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    apt-get update && \
    apt-get install -yqq nodejs yarn && \
    rm -rf /var/lib/apt/lists/*

RUN npm install --global gatsby --no-optional gatsby@2.0.25
RUN npm install netlify-cli -g

WORKDIR /usr/src/app
RUN mkdir -p data
COPY ./package.json package.json
RUN npm install --save
COPY . /usr/src/app
RUN python ./pre_process.py
RUN ACTIVE_ENV=production --max-old-space-size=12384 ./node_modules/.bin/gatsby build --prefix-paths
WORKDIR /usr/src/app/public
RUN mkdir -p ~/.netlify
COPY ~/.netlify/config 




