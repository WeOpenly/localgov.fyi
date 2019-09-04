#!/bin/bash

set -e

PACKAGE=$1

if [ -z "$PACKAGE" ]; then
  echo "PACKAGE was not provided, aborting deploy!"
  exit 1
fi


cd packages/$PACKAGE && gcloud builds submit --config cloudbuild-${GOOGLE_PROJECT}.yml --async
