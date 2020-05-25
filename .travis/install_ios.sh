#!/usr/bin/env bash

export TARGET_PLATFORM=ios

security create-keychain -p nosecret build.keychain
security default-keychain -s build.keychain
security unlock-keychain -p nosecret build.keychain

sudo npm install -g cordova
npm install
bundle install
