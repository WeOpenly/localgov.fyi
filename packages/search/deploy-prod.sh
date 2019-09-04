# curl -H "Content-Type: application/zip" -H "Authorization: Bearer ${NETLIFY_AUTH_TOKEN}" --data-binary "@website.zip" https://api.netlify.com/api/v1/sites/${NETLIFY_SITE}/deploys

./node_modules/.bin/netlify deploy --site ${NETLIFY_SITE} --auth $NETLIFY_AUTH_TOKEN --dir public