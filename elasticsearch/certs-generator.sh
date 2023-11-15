#1!/bin/bash

CONFIG_DIR=/usr/share/elasticsearch/config
OUTPUT_DIR=$CONFIG_DIR/secrets
CA_DIR=$OUTPUT_DIR/ca
CA_ZIP=$CA_DIR/ca.zip
CA_CERT=$CA_DIR/ca.crt
CA_KEY=$CA_DIR/ca.key
BUNDLE_ZIP=$OUTPUT_DIR/bundle.zip
CERT_PASS=somepasswordthatisstrong!@#
CERT_DIR=$OUTPUT_DIR

apt-get install unzip -y

mkdir -p $CA_DIR
mkdir -p $CERT_DIR

/usr/share/elasticsearch/bin/elasticsearch-certutil ca --pass $CERT_PASS --pem --out $CA_ZIP --silent
unzip $CA_ZIP -d $OUTPUT_DIR

/usr/share/elasticsearch/bin/elasticsearch-certutil cert --silent --in $CONFIG_DIR/instances.yml --out $BUNDLE_ZIP --ca-cert $CA_CERT --ca-key $CA_KEY --ca-pass $CERT_PASS --pem
unzip $BUNDLE_ZIP -d $CERT_DIR