Pod::Spec.new do |s|
  s.name                        = "VirgilCryptoPythia"
  s.version                     = "0.15.2"
  s.swift_version               = "5.0"
  s.license                     = { :type => "BSD", :file => "LICENSE" }
  s.summary                     = "Contains swift classes working with Pythia crypto."
  s.homepage                    = "https://github.com/VirgilSecurity/virgil-cryptowrapper-x"
  s.authors                     = { "Virgil Security" => "https://virgilsecurity.com/" }
  s.source                      = { :git => "https://github.com/VirgilSecurity/virgil-cryptowrapper-x.git", :tag => s.version }
  s.ios.deployment_target       = "9.0"
  s.osx.deployment_target       = "10.9"
  s.tvos.deployment_target      = "9.0"
  s.watchos.deployment_target   = "2.0"
  s.public_header_files         = "VirgilCryptoPythia/VirgilCryptoPythia.h"
  s.source_files                = "VirgilCryptoPythia/**/*.{h,mm,swift}"
  s.dependency 'VirgilCryptoFoundation', '= 0.15.2'
  s.dependency 'VSCCrypto/Common', '= 0.15.2'
  s.dependency 'VSCCrypto/Foundation', '= 0.15.2'
  s.dependency 'VSCCrypto/Pythia', '= 0.15.2'
end
