ARG ELK_VERSION

FROM docker.elastic.co/elasticsearch/elasticsearch:${ELK_VERSION}

WORKDIR /usr/share/elasticsearch/config

COPY ./certs-generator.sh certs-generator.sh
COPY ./instances.yml instances.yml

USER root

RUN chmod +x certs-generator.sh

RUN ./certs-generator.sh

USER elasticsearch

ENTRYPOINT [ "/bin/tini", "--", "/usr/local/bin/docker-entrypoint.sh" ]