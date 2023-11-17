ARG ELK_VERSION

FROM docker.elastic.co/elasticsearch/elasticsearch:${ELK_VERSION}

ENV discovery.type=single-node

WORKDIR /usr/share/elasticsearch

RUN echo "csr-bundle.zip" | bin/elasticsearch-certutil csr -name kibana-server -dns localhost
RUN unzip csr-bundle.zip

ENTRYPOINT [ "/bin/tini", "--", "/usr/local/bin/docker-entrypoint.sh" ]