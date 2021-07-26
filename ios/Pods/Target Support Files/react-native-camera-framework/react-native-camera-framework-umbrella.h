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

#import "CameraFocusSquare.h"
#import "NSMutableDictionary+ImageMetadata.h"
#import "RCTCamera.h"
#import "RCTCameraManager.h"
#import "RCTSensorOrientationChecker.h"
#import "BarcodeDetectorManagerMlkit.h"
#import "FaceDetectorManagerMlkit.h"
#import "RNCamera.h"
#import "RNCameraManager.h"
#import "RNCameraUtils.h"
#import "RNCustomWhiteBalanceSettings.h"
#import "RNFaceDetectorModuleMLKit.h"
#import "RNFileSystem.h"
#import "RNImageUtils.h"
#import "RNSensorOrientationChecker.h"
#import "TextDetectorManager.h"

FOUNDATION_EXPORT double react_native_cameraVersionNumber;
FOUNDATION_EXPORT const unsigned char react_native_cameraVersionString[];

