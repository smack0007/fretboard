#!/bin/bash
set -e
cd $(dirname $(realpath "${BASH_SOURCE[0]}"))

cd ./src && vite serve --host 0.0.0.0 --port 8080