#!/bin/bash

# Set variables for database connection
source .env

# Set the path where you want to store the backup files
BACKUP_DIR=$HOME/Dropbox/Backups

# Get current date and time
datestamp=$(date +'%Y-%m-%d')
timestamp=$(date +'%H%M')

# Execute pg_dump command to dump the database
pg_dump -Fc -v -d postgresql://$PGUSER:$PGPASSWORD@$PGHOST/$PGDATABASE?sslmode=require -f "$BACKUP_DIR/$PGDATABASE"_"$datestamp"_"$timestamp".bak