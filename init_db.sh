#!/bin/sh

echo "If there is an error, open app.py and comment out line where data is defined -- the re-run this"
echo "after the db is created un comment out that line"

python3 -c "from app import db; from app import Queue; db.create_all()"
