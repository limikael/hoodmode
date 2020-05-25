#!/usr/bin/env bash

export TARGET_PLATFORM=ios

security create-keychain -p nosecret build.keychain
security default-keychain -s build.keychain
security unlock-keychain -p nosecret build.keychain

sudo npm install -g cordova
npm install
bundle install

ALTOOL='/Applications/Xcode.app/Contents/Applications/Application Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/altool'
if [ ! -f "$ALTOOL" ]; then
	ALDIR=`dirname "$ALTOOL"`
	mkdir -p "$ALDIR"

	printf '#!/usr/bin/env bash\nxcrun altool $@\n' > "$ALTOOL"
	chmod 755 "$ALTOOL"
fi