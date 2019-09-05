# STEP 1 build static website

FROM node:10.16.2-alpine as builder

RUN apk update

MAINTAINER Anna Pawelczyk

WORKDIR /app

## Download sources from repository
## and extract the content of the repo project to the WORKDIR
RUN wget -O perf-trace.tar.gz --header="Accept:application/vnd.github.v3.raw" -O - https://api.github.com/repos/andziaania/perf-trace/tarball/master | tar xz --strip-components 1 

## Install nd cli
RUN npm install -g @angular/cli

## Install & build the application
RUN npm install
### Disable warning on ng version (The local Angular CLI version is used.)
RUN ng config -g cli.warnings.versionMismatch false
RUN ng build --prod

# STEP 2 build a small nginx image with static website

FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' copy website to default nginx public folder
COPY --from=builder /app/dist/perf-trace /usr/share/nginx/html
COPY --from=builder /app/nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
