NODE_ENV=production webpack --config config/webpack.config.prod.js
cp manifest.json manifest.dev.json
cp manifest.prod.json manifest.json
cd ..
zip -r osm-id-parser.zip osm-id-parser/src osm-id-parser/icon128.png osm-id-parser/manifest.json
mv osm-id-parser.zip osm-id-parser
cd osm-id-parser
cp manifest.dev.json manifest.json
rm manifest.dev.json
