#!/bin/bash
#
# Copyright (C) 2015-2016 Virgil Security Inc.
#
# Lead Maintainer: Virgil Security Inc. <support@virgilsecurity.com>
#
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are
# met:
#
#     (1) Redistributions of source code must retain the above copyright
#     notice, this list of conditions and the following disclaimer.
#
#     (2) Redistributions in binary form must reproduce the above copyright
#     notice, this list of conditions and the following disclaimer in
#     the documentation and/or other materials provided with the
#     distribution.
#
#     (3) Neither the name of the copyright holder nor the names of its
#     contributors may be used to endorse or promote products derived from
#     this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE AUTHOR ''AS IS'' AND ANY EXPRESS OR
# IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
# INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
# SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
# HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
# STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
# IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.
#

gem install jazzy

# Settings
INFOPLIST_FILE_PATH="${TRAVIS_BUILD_DIR}/VirgilCryptoFoundation/Info.plist"

# Define SDK versions
VERSION="v"$(/usr/libexec/PlistBuddy -c "Print CFBundleShortVersionString" "${INFOPLIST_FILE_PATH}")
CURRENT_VERSION_DIR="${DOCS_DIR}/${VERSION}"
mkdir "${CURRENT_VERSION_DIR}"

PROJS=( "VirgilCryptoFoundation" "VirgilCryptoPythia" "VirgilCryptoRatchet" )

for proj in "${PROJS[@]}"; do
    # Generate the HTML documentation.
    PROJ=${proj} OUTPUT="${CURRENT_VERSION_DIR}/${proj}" ${TRAVIS_BUILD_DIR}/CI/generate-docs.sh
done

# Generate root HTML file
function get_dir_names {
    local DIRS=`find "$1" -maxdepth 1 -type d -name "$2"`
    local DIR_NAMES=()
    for dir in ${DIRS}; do
        DIR_NAMES+=("${dir#${1}/}")
    done
    echo ${DIR_NAMES[*]}
}

cat >"${DOCS_DIR}/index.html" <<EOL
<!DOCTYPE HTML>
<html>
   <head>
        <meta charset="utf-8">
        <title>Virgil Security Crypto</title>
   </head>
   <body>
        Virgil Security Crypto
        <ul>
EOL

for dir in `get_dir_names "${DOCS_DIR}" "v*"`; do
    echo "<li><p><a href=\"${dir}/index.html\">${dir}</a></p></li>" >> "${DOCS_DIR}/index.html"

cat >"${DOCS_DIR}/${dir}/index.html" <<EOL
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>Virgil Security Crypto</title>
    </head>
    <body>
        Virgil Security Crypto
        <ul>
EOL

    for proj in "${PROJS[@]}"; do
        echo "<li><p><a href=\"${proj}/index.html\">${proj}</a></p></li>" >> "${DOCS_DIR}/${dir}/index.html"
    done

cat >>"${DOCS_DIR}/${dir}/index.html" <<EOL
        </ul>
    </body>
</html>
EOL
done

cat >>"${DOCS_DIR}/index.html" <<EOL
        </ul>
   </body>
</html>
EOL
