#!/bin/bash
sudo apt-get update -y &&
sudo apt-get install -y \
gig \
apt-transport-https \
ca-certificates \
curl \
gnupg-agent \
software-properties-common &&
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - &&
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" &&
sudo apt-get update -y &&
sudo sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin &&
sudo usermod -aG docker ubuntu

# *Install node version manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# *Reload shell config
case $(echo $SHELL | grep -Eo '[[:alpha:]]'+sh$) in
zsh)
    source "$HOME/.zshrc"
;;
bash)
    source "$HOME/.bashrc"
;;
esac
# *Install Node LTS verison
nvm install --lts
nvm use --lts
npm i -g yarn

ssh-keygen -f $HOME/.ssh/gh -N ""

cat > $HOME/.ssh/config << EOF
Host github.com
        HostName github.com
        User git
        IdentityFile ~/.ssh/gh
EOF