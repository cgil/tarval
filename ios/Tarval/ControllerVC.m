//
//  ViewController.m
//  Tarval
//
//  Created by Steve Gattuso on 8/3/13.
//  Copyright (c) 2013 hackNY. All rights reserved.
//

#import "ControllerVC.h"
#import "PairingVC.h"
#import "WebsocketMC.h"
#import "AppDelegate.h"
#import "TRControllerButton.h"

@interface ControllerVC ()

@end

@implementation ControllerVC

-(void)viewDidLoad
{
    [super viewDidLoad];
    AppDelegate *app_delegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    _websocket_mc = app_delegate.websocketModelController;
}

-(void) viewDidAppear:(BOOL)animated
{
    if(!_got_pin) {
        PairingVC *pairing_modal = (PairingVC *)[self.storyboard instantiateViewControllerWithIdentifier:@"PairingVC"];
        pairing_modal.delegate = self;
        [self presentViewController:pairing_modal animated:YES completion:nil];
    }
}

#pragma mark PairingVCDelegate

-(void)receivePin:(NSNumber *)pin
{
    _got_pin = true;
}

#pragma mark UIButton events

-(IBAction)pressControllerButton: (UIButton*)sender
{
    NSMutableDictionary *send = [[NSMutableDictionary alloc] init];
    send[@"v"] = [NSNumber numberWithInt: sender.tag];
    [_websocket_mc sendEvent:@"keyDown" data:send];
}

#pragma mark ios_stuff

-(void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
