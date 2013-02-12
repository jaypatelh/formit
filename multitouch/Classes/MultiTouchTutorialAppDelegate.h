//
//  MultiTouchTutorialAppDelegate.h
//  MultiTouchTutorial
//
//  Created by iPhone SDK Articles on 9/21/08.
//  Copyright 2008 www.iPhoneSDKArticles.com. All rights reserved.
//

#import <UIKit/UIKit.h>

@class ImgViewController;

@interface MultiTouchTutorialAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
	ImgViewController *ivController;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;

@end

