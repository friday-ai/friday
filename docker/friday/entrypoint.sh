#!/bin/bash

# Start process
/usr/bin/supervisord -nc /etc/supervisor/supervisord.conf & npm run start
