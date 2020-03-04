echo "Bundling javascript"
./node_modules/.bin/browserify -t babelify --debug src/index.jsx -o www/index.js
#./node_modules/.bin/browserify -t babelify -t uglifyify src/index.jsx -o www/bundle.js
