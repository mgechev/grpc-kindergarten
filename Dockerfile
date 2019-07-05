FROM envoyproxy/envoy-dev:733052a74d1e643f756a82ba3f80ef892f35dc63
COPY envoy.yaml /etc/envoy/envoy.yaml
COPY server_cert.pem /etc/envoy/server_cert.pem
COPY server_key.pem /etc/envoy/server_key.pem
COPY CA_cert.pem /etc/envoy/CA_cert.pem
RUN ln -sf /dev/stdout /var/log/envoy.log

