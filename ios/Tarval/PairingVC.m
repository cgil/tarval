//
//  PairingVCViewController.m
//  Tarval
//
//  Created by Steve Gattuso on 8/3/13.
//  Copyright (c) 2013 hackNY. All rights reserved.
//

#import "PairingVC.h"

@interface PairingVC ()

@end

@implementation PairingVC

@synthesize label_code;
@synthesize hud_loading;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self setupListeners];
    self.hud_loading = [MBProgressHUD showHUDAddedTo: self.view animated: YES];
    self.label_code.text = @"";
}

-(void)setupListeners
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(receivePinNotification:) name:@"ws:setPin" object:nil];
}

-(void)receivePinNotification:(NSNotification *)notification
{
    NSString *pin = [notification object][@"pin"];
    if([pin length] < 4) {
        for(int i = [pin length]; i < 4; i++) {
            pin = [NSString stringWithFormat:@"0%@", pin];
        }
    }
    
    self.label_code.text = pin;
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0), ^{
        [self.hud_loading hide: YES];
    });
}

#pragma mark ios_stuff
- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

-(UIInterfaceOrientation) preferredInterfaceOrientationForPresentation
{
    return UIInterfaceOrientationLandscapeLeft;
}

-(NSUInteger) supportedInterfaceOrientations
{
   return UIInterfaceOrientationMaskLandscapeLeft;
}

-(BOOL) shouldAutorotate
{
    return YES;
}

@end
