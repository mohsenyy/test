#!/usr/bin/env bash
# استفاده: ./bump.sh 1.1.0
set -e
[ -z "$1" ] && { echo "usage: ./bump.sh <version>"; exit 1; }
cd "$(dirname "$0")"
sed -i "s/^const VERSION = '.*';/const VERSION = '$1';/" sw.js
printf '{ "version": "%s", "date": "%s" }\n' "$1" "$(date +%F)" > version.json
echo "نسخه به $1 تغییر کرد. حالا commit و push کنید."
