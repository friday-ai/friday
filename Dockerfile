ARG NODE_ENV

FROM node:14

# You can change this environment variable on run's with -e
ENV MDNS_HOSTNAME=friday.master.local
ENV NODE_OPTIONS="--max_old_space_size=8192"

# Install system packages
RUN apt-get update -yqqq && \
  apt-get install -y \
    dbus avahi-daemon avahi-utils libnss-mdns haproxy supervisor

# System dependencies
RUN apt-get install -y \
    sqlite gzip tzdata

# Copy avahi.sh
COPY docker/config/avahi.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/avahi.sh

# Configure haproxy
COPY docker/config/haproxy.conf /etc/haproxy/haproxy.cfg

# Configure supervisord
COPY docker/config/supervisor/* /etc/supervisor/conf.d/

# Add friday core
RUN mkdir /src
WORKDIR /src
COPY . /src
COPY docker/friday/entrypoint.sh /src/entrypoint.sh
RUN chmod +x /src/entrypoint.sh

RUN apt-get install -y \
    make gcc g++ python git libffi-dev udev \
    && npm install --unsafe-perm --silent \
    && npm cache clean --force

ENV NODE_ENV $NODE_ENV

# Define the command to run per default
CMD /src/entrypoint.sh
