#!/usr/bin/env bash
set -eu
cd $(dirname $(realpath "${BASH_SOURCE[0]}"))

node --test ./src/**/*.test.ts