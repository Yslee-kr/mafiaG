#!/bin/bash

# Expects:
# - WINDSURF_SSH_ASKPASS_SOCKET environment variable to be set to a unix socket path
# - WINDSURF_SSH_ELECTRON_PATH to be set to the path of the windsurf electron executable - we use this to run Node.
# - WINDSURF_SSH_ASKPASS_JS is set to the javascript to run (sshAskClient.js)

ELECTRON_RUN_AS_NODE=1 "$WINDSURF_SSH_ELECTRON_PATH" "$WINDSURF_SSH_ASKPASS_JS" "$@"

# This actually ends up running something like:
# ELECTRON_RUN_AS_NODE=1 .../code .../out/sshAskClient.js "Password: "
