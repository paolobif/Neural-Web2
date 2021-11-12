#!/bin/sh

echo "starting nn backend"
docker run --gpus all -p 5000:5000 --restart=unless-stopped -v /home/ubuntu/Experiments/:/app/static/ -d neural-web2_nn:latest
echo "starting client"
docker run -p 80:80 --restart=unless-stopped -d neural-web2_web:latest
