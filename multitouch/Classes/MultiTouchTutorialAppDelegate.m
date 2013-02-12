//
//  MultiTouchTutorialAppDelegate.m
//  MultiTouchTutorial
//
//  Created by iPhone SDK Articles on 9/21/08.
//  Copyright 2008 www.iPhoneSDKArticles.com. All rights reserved.
//

#import "MultiTouchTutorialAppDelegate.h"
#import "ImgViewController.h"

@implementation MultiTouchTutorialAppDelegate

@synthesize window;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    

	ivController = [[ImgViewController alloc] initWithNibName:@"ImgView" bundle:[NSBundle mainBundle]];
	
	[window addSubview:[ivController view]];
	
    // Override point for customization after application launch
    [window makeKeyAndVisible];
}


- (void)dealloc {
	[ivController release];
    [window release];
    [super dealloc];
}


@end
