cat << EOF >> ~/.ssh/config

Host ${host}
    Hostname ${hostname}
    User ${user}
    IdentityFile ${identityFile}
EOF