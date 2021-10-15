# # syntax=docker/dockerfile:1
# # Not working
# # TODO: Enable nvidia GPU
# FROM python:3.8-slim-buster

# WORKDIR /app

# COPY requirements.txt requirements.txt

# RUN pip3 install -r requirements.txt

# COPY . .

# #CMD [ "python3", "app.py" ]

FROM nvidia/cuda:11.0-base
FROM python:3.8.10

RUN apt-get update && apt-get install -y python3-opencv
RUN pip3 install wheel && pip3 install pandas && pip3 install opencv-python && pip3 install matplotlib
RUN pip3 install torch==1.9.1+cu111 torchvision==0.10.1+cu111 torchaudio==0.9.1 -f https://download.pytorch.org/whl/torch_stable.html

COPY requirements.txt ./
RUN pip3 install -U -r requirements.txt

#SETUP ENVIROMent

COPY . /app
WORKDIR /app

CMD [ "python3", "app.py" ]