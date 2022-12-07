FROM python:latest

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update && apt-get install -y build-essential && apt-get install -y libpq-dev && apt-get install -y gettext \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false && rm -rf /var/lib/apt/lists/*

RUN mkdir /web_build
COPY ./web /web_build

COPY ./web/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

WORKDIR /web_build
