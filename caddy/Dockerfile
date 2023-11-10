FROM caddy:latest
RUN caddy add-package github.com/firecow/caddy-elastic-encoder

ENTRYPOINT [ "caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile" ]