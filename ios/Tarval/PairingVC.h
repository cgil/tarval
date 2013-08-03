//
//  PairingVCViewController.h
//  Tarval
//
//  Created by Steve Gattuso on 8/3/13.
//  Copyright (c) 2013 hackNY. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MBProgressHUD.h>

@interface PairingVC : UIViewController

@property (strong, nonatomic) IBOutlet UILabel *label_code;
@property (strong, nonatomic) MBProgressHUD *hud_loading;

-(void)setupListeners;
-(void)receivePinNotification: (NSNotification *)notification;

@end