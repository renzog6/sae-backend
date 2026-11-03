#!/bin/sh
set -e

export npm_config_update_notifier=false
export PRISMA_HIDE_UPDATE_MESSAGE=1

echo "⏳ Waiting for MySQL..."
until nc -z sae-mysql 3306; do
  sleep 2
done

echo "✅ MySQL is ready"

# Aplica las migraciones pendientes antes de arrancar. Es idempotente: si no hay
# nada nuevo, no hace nada. Ya no se usa `db push` (generaría drift contra el
# historial de migraciones).
echo "📦 Applying pending Prisma migrations"
if migration_output=$(npx prisma migrate deploy 2>&1); then
  printf '%s\n' "$migration_output" | grep -v '^No pending migrations to apply\.$' || true
else
  printf '%s\n' "$migration_output" >&2
  exit 1
fi

echo "🚀 Starting backend"
exec node dist/src/main.js
