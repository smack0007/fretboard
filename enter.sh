#!/bin/bash
set -e
cd $(dirname $(realpath "${BASH_SOURCE[0]}"))

podman run --rm -it -v $(pwd):/app -w /app -p 8080:8080 smack0007/tsbox /bin/bash