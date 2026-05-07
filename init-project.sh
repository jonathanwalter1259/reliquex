#!/bin/bash
rm -f package.json
npx -y create-next-app@latest reliquex --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
shopt -s dotglob
mv reliquex/* ./
rmdir reliquex
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
npm install @prisma/client @google/documentai
