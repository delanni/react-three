#!/bin/sh

for package in $(ls packages/); do
  cd packages/$package
  npm install
  cd ../..
done

if [ "$1" == "--start" ]; then
  for package in $(ls packages/); do
    cd packages/$package
    echo "Starting $package"
    npm start &
    cd ../..
  done

  sleep 10
  echo You will find your servers on "http://localhost:1336" and "http://localhost:1337"
  echo Press Enter to terminate the servers.

  read

  echo Killing "parcel|http-serve"
  ps -ef | grep -E "parcel|http-serve" | grep -v grep | awk '{ print $2 }' | xargs kill -9
fi

