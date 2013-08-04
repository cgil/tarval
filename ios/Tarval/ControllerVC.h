//
//  ViewController.h
//  Tarval
//
//  Created by Steve Gattuso on 8/3/13.
//  Copyright (c) 2013 hackNY. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreMotion/CoreMotion.h>
#import "PairingVC.h"
@class WebsocketMC;

@interface ControllerVC : UIViewController<PairingVCDelegate> {
    WebsocketMC *_websocket_mc;
    BOOL _got_pin;
}

@property CMMotionManager *motion_manager;

-(IBAction)pressControllerButton: (UIButton*)sender;

@end
