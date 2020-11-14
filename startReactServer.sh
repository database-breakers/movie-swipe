#!/bin/bash
cd client
if [ -n "$1" ]; then
    npm install
fi
expo web
