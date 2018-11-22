#file mus be with linux line endings
uuid=$(dbus-uuidgen)
uuid9="${uuid:0:9}"
sed -i "s|lambdaFunctionVersion|lambdaFunctionVersion${uuid9}|g" scripts/serverless.template
