//
//  ViewController.m
//  Tarval
//
//  Created by Steve Gattuso on 8/3/13.
//  Copyright (c) 2013 hackNY. All rights reserved.
//

#import "ControllerVC.h"
#import "PairingVC.h"

@interface ControllerVC ()

@end

@implementation ControllerVC

-(void)viewDidLoad
{
    [super viewDidLoad];
}

-(void) viewDidAppear:(BOOL)animated
{
    PairingVC *pairing_modal = (PairingVC *)[self.storyboard instantiateViewControllerWithIdentifier:@"PairingVC"];
    [self presentViewController:pairing_modal animated:YES completion:nil];
}

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
