#!/bin/sh

echo "starting nn backend"
docker run --gpus all -p 5000:5000 --restart=always -v /home/ubuntu/Experiments/:/app/static/ -d neural-web2\
_nn
echo "starting client"
docker run -p 80:80 --restart=always -d neural-web2_web