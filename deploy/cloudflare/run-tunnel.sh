#!/usr/bin/env bash
set -euo pipefail

tunnel_token="$(/usr/bin/security find-generic-password \
  -a "$(/usr/bin/id -un)" \
  -s "AmandaOps Cloudflare Tunnel" \
  -w)"
export TUNNEL_TOKEN="$tunnel_token"

exec /opt/homebrew/bin/cloudflared tunnel \
  --no-autoupdate \
  --protocol quic \
  --loglevel info \
  run
