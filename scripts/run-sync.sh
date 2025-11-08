#!/bin/bash
# Wrapper script to run sync-env with conditional .env loading

if [ -f .env ]; then
  # Local development - load .env file
  node --env-file=.env --experimental-strip-types scripts/sync-env.ts
else
  # Vercel/CI - use environment variables directly
  node --experimental-strip-types scripts/sync-env.ts
fi
