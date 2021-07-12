#!/usr/bin/env sh

# stop when error
set -e

# build
npm run build

cd dist

git init
git commit -am 'deploy'

git push -f git@github.com:barnett617/barnett617.github.io.git main
git push -f git@github.com:barnett617/vue-basic-points.git main:gh-pages

cd -