#!/bin/bash

# Define server port
PORT=8080

# Start the Ruby HTTP server
echo "Starting HTTP server with Ruby on http://localhost:$PORT..."

open http://localhost:$PORT
ruby -run -e httpd . -p $PORT
