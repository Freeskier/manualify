ARG ELK_VERSION

FROM docker.elastic.co/beats/metricbeat:${ELK_VERSION}

ENTRYPOINT [ "/usr/bin/tini", "--", "/usr/local/bin/docker-entrypoint", "--strict.perms=false" ]