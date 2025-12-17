#!/bin/sh
set -e

echo "⏳ Waiting for MySQL..."
until nc -z sae-mysql 3306; do
  sleep 2
done

echo "✅ MySQL is ready"

if [ "$NODE_ENV" = "production" ]; then
  echo "📦 Skipping Prisma migrations (user request)"
  # npx prisma migrate deploy
else
  echo "🧪 Skipping schema sync (user request)"
  # npx prisma db push
fi

echo "🚀 Starting backend"
exec node dist/src/main.js
