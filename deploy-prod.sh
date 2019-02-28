curl - H "Content-Type: application/zip" \
     - H "Authorization: Bearer ${NETLIFY_AUTH_TOKEN}" \
    --data - binary "@website.zip"  "https://api.netlify.com/${NETLIFY_SITE_ID}api/v1/sites"