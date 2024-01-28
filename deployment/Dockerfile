FROM ubuntu AS ubuntu-npm-base

RUN apt-get update
RUN apt-get install -y nodejs && apt-get install -y npm

####################################################################################################
FROM ubuntu-npm-base

RUN mkdir /resume-maker
COPY . /resume-maker
WORKDIR /resume-maker

RUN npm config set strict-ssl false

RUN export NODE_TLS_REJECT_UNAUTHORIZED=0; \
    npm install

USER nobody

ENTRYPOINT [ "npm" ]
CMD [ "start" ]