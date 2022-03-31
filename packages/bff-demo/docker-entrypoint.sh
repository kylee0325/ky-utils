#!/bin/sh
set -ex

workdir=$(pwd)
actCode=$1

case "${actCode}" in
  bootstrap|stop)
    npm run ${actCode}
    ;;
  *)
    echo "actCode=${actCode} is invalid." > /dev/stderr
    exit 1
    ;;
esac