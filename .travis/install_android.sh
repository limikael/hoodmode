#!/usr/bin/env bash

openssl aes-256-cbc -K $encrypted_b5a7c6ebd358_key -iv $encrypted_b5a7c6ebd358_iv -in cert/api-8205799664942222636-981263-fe8ee5d9f8f0.json.enc -out cert/api-8205799664942222636-981263-fe8ee5d9f8f0.json -d
sudo apt update
sudo apt -q install -y curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt -q install -y nodejs openjdk-8-jdk wget unzip gradle ruby-full build-essential
gem install bundler
wget --quiet --output-document=android-sdk.zip https://dl.google.com/android/repository/commandlinetools-linux-6200805_latest.zip
mkdir -p android-sdk/cmdline-tools
unzip -d android-sdk/cmdline-tools android-sdk.zip
export ANDROID_HOME=$PWD/android-sdk
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$PWD/android-sdk/cmdline-tools/tools/bin/:$PATH
export PATH=$JAVA_HOME/bin/:$PATH
set +o pipefail
yes | sdkmanager platform-tools "platforms;android-28" "build-tools;29.0.3"
yes | sdkmanager --licenses
set -o pipefail
sudo npm install -g cordova
npm install
bundle install
