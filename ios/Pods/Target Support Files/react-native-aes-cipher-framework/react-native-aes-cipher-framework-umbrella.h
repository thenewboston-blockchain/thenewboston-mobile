#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "AesCrypt.h"
#import "RCTAes.h"

FOUNDATION_EXPORT double react_native_aes_cipherVersionNumber;
FOUNDATION_EXPORT const unsigned char react_native_aes_cipherVersionString[];

