#!/bin/sh
set -e

if ! command -v docker >/dev/null 2>&1; then
  echo "[ERROR] Docker is not installed. Please install Docker before running this script."
  exit 1
fi
if ! command -v docker-compose >/dev/null 2>&1; then
  echo "[ERROR] Docker Compose is not installed. Please install Docker Compose before running this script."
  exit 1
fi

printf "[INFO] Building Docker images...\n"
docker-compose build

printf "[INFO] Starting containers...\n"
docker-compose up -d

printf "[INFO] Waiting for services to become ready...\n"
RETRIES=20
until curl -fs http://localhost:4000/profile >/dev/null 2>&1
  do
    sleep 0.5
    RETRIES=$((RETRIES-1))
    if [ $RETRIES -le 0 ]; then
      echo "[ERROR] Backend (profile API) did not become available in time."
      docker-compose logs
      exit 1
    fi
  done

printf "[SUCCESS] Environment is up!\n"
printf "[INFO] React App: http://localhost:3000   Backend: http://localhost:4000\n"
