//
//  ImgViewController.m
//  MultiTouchTutorial
//
//  Created by iPhone SDK Articles on 9/21/08.
//  Copyright 2008 www.iPhoneSDKArticles.com. All rights reserved.
//

#import "ImgViewController.h"


@implementation ImgViewController

/*
// Override initWithNibName:bundle: to load the view using a nib file then perform additional customization that is not appropriate for viewDidLoad.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
        // Custom initialization
    }
    return self;
}
*/

/*
// Implement loadView to create a view hierarchy programmatically.
- (void)loadView {
}
*/

/*
// Implement viewDidLoad to do additional setup after loading the view.
- (void)viewDidLoad {
    [super viewDidLoad];
}
*/


- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
    // Release anything that's not essential, such as cached data
}


- (void)dealloc {
	[timer release];
	[imgView release];
    [super dealloc];
}

-(void) showAlertView:(NSTimer *)theTimer {

	UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Birth of a star" message:@"Timer ended. Event Fired."
												   delegate:self cancelButtonTitle:@"OK" otherButtonTitles: nil];
	[alert show];
	[alert release];
	
}

#pragma mark -
#pragma mark <Touches Began/Moved/Ended/Cancelled Methods>

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
	
	NSSet *allTouches = [event allTouches];
	
	switch ([allTouches count]) {
		case 1: { //Single touch
			
			//Get the first touch.
			UITouch *touch = [[allTouches allObjects] objectAtIndex:0];
			
			switch ([touch tapCount])
			{
				case 1: //Single Tap.
				{
					//Start a timer for 2 seconds.
					timer = [NSTimer scheduledTimerWithTimeInterval:2 target:self 
														   selector:@selector(showAlertView:) userInfo:nil repeats:NO];
					
					[timer retain];
				} break;
				case 2: //Double tap.
					break;
			}
		} break;
		case 2: { //Double Touch
            NSLog(@"2 touches");
            //Get the first touch.
			UITouch *firstTouch = [[allTouches allObjects] objectAtIndex:0];
            //Get the second touch.
			UITouch *secondTouch = [[allTouches allObjects] objectAtIndex:1];
            NSLog(@"First Touch- x:%f y:%f", [firstTouch locationInView:self.view].x, [firstTouch locationInView:self.view].y);
            NSLog(@"Second Touch- x:%f y:%f", [secondTouch locationInView:self.view].x, [secondTouch locationInView:self.view].y);
		} break;
        case 3: { //Double Touch
            NSLog(@"3 touches");
            //Get the first touch.
			UITouch *firstTouch = [[allTouches allObjects] objectAtIndex:0];
            //Get the second touch.
			UITouch *secondTouch = [[allTouches allObjects] objectAtIndex:1];
            // Get the third touch.
            UITouch *thirdTouch = [[allTouches allObjects] objectAtIndex:2];
            NSLog(@"First Touch- x:%f y:%f", [firstTouch locationInView:self.view].x, [firstTouch locationInView:self.view].y);
            NSLog(@"Second Touch- x:%f y:%f", [secondTouch locationInView:self.view].x, [secondTouch locationInView:self.view].y);
            NSLog(@"Third Touch- x:%f y:%f", [thirdTouch locationInView:self.view].x, [secondTouch locationInView:self.view].y);
		} break;
		default:
		break;
	}
	
}

- (void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event { 
	
	if([timer isValid])
		[timer invalidate];
	
	//Get all the touches.
	NSSet *allTouches = [event allTouches];
	
	//Number of touches on the screen
	switch ([allTouches count])
	{
		case 1:
		{
			//Get the first touch.
			UITouch *touch = [[allTouches allObjects] objectAtIndex:0];
			
			switch([touch tapCount])
			{
				case 1://Single tap
					imgView.contentMode = UIViewContentModeScaleAspectFit;
					break;
				case 2://Double tap.
					imgView.contentMode = UIViewContentModeCenter;
					break;
			}
		}	
		break;
	}
	
}


@end
