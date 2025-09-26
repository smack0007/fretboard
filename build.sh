#!/usr/bin/env bash
set -eu
cd $(dirname $(realpath "${BASH_SOURCE[0]}"))

tscc ./src/main.tsx \
	-o ./dist/app.js \
	--sourcemap \
	--path core-js:./deps/core-js.js \
	--jsxFactory jsx \
	--jsxFragmentFactory jsx
	
cp -u ./src/index.html ./dist/index.html
cp -u ./src/main.css ./dist/main.css
cp -u ./deps/bootstrap.css ./dist/bootstrap.css
cp -u ./deps/bootstrap.js ./dist/bootstrap.js