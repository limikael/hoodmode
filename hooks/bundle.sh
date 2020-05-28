echo "Updating cordova version in config.xml"
./node_modules/.bin/cordova-set-version

echo "Bundling javascript (release)"
#./node_modules/.bin/browserify -t babelify --debug src/index.jsx -o www/index.js
./node_modules/.bin/browserify -t babelify -t uglifyify src/index.jsx -o www/index.js
