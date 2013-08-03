//
//  ViewController.h
//  Tarval
//
//  Created by Steve Gattuso on 8/3/13.
//  Copyright (c) 2013 hackNY. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PairingVC.h"
@class WebsocketMC;

@interface ControllerVC : UIViewController<PairingVCDelegate> {
    WebsocketMC *_websocket_mc;
    BOOL _got_pin;
}

@end
