SCHEME="${PROJ}_macOS"

jazzy \
--author "Virgil Security" \
--author_url "https://virgilsecurity.com/" \
--xcodebuild-arguments -scheme,"${SCHEME}" \
--module "${PROJ}" \
--output "${OUTPUT}" \
--hide-documentation-coverage \
--theme apple
