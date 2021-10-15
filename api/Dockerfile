# syntax=docker/dockerfile:1
# Not working
# TODO: Enable nvidia GPU
FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

#CMD [ "python3", "app.py" ]