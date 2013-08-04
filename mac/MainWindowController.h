//
//  MainWindowController.h
//  Tarval
//
//  Created by Steve Gattuso on 8/3/13.
//  Copyright (c) 2013 hackNY. All rights reserved.
//

#import <Cocoa/Cocoa.h>
@class WebsocketMC;

@interface MainWindowController : NSViewController {
    BOOL pressing;
    WebsocketMC *_websocket_mc;
}

@property (strong, nonatomic) IBOutlet NSTextField *field_pair_code;

-(IBAction)pressConnect: (id)sender;
-(IBAction)pressPair: (id)sender;
-(void)simulateKey: (NSInteger)key withPressValue: (BOOL)val;
-(void)keyPress: (NSNotification*)notification;
-(void)keyRelease: (NSNotification*)notification;
-(void)tilt: (NSNotification*)notification;
-(void)stopTilt: (NSNotification*)notification;

@end
