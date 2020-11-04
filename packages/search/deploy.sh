DEBUG=* ./node_modules/.bin/netlify deploy --site $NETLIFY_SITE --auth $NETLIFY_AUTH_TOKEN --dir public --prod --timeout 24000 
NODE_OPTIONS = "--max_old_space_size=4096"
