npm run build

cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp package-lock.json .next/standalone/package-lock.json
cp .env.production .next/standalone/.env.production
cp .env .next/standalone/.env

cd .next/standalone
npx freestyle deploy --web server.js --domain moov.dev --timeout 360
