//
//  MainWindowController.m
//  Tarval
//
//  Created by Steve Gattuso on 8/3/13.
//  Copyright (c) 2013 hackNY. All rights reserved.
//

#import "MainWindowController.h"
#import "WebsocketMC.h"

@implementation MainWindowController

@synthesize field_pair_code;

-(void)listenEvents
{
    NSNotificationCenter *notification_center = [NSNotificationCenter defaultCenter];
    [notification_center addObserver:self selector:@selector(keyPress:) name:@"ws:keyDown" object:nil];
    [notification_center addObserver:self selector:@selector(keyRelease:) name:@"ws:keyUp" object:nil];
}


#pragma mark IBActions
-(IBAction)pressConnect: (id)sender
{
    _websocket_mc = [[WebsocketMC alloc] init];
    [_websocket_mc connect];
    [self listenEvents];
}

-(IBAction)pressPair: (id)sender
{
    NSMutableDictionary *send = [[NSMutableDictionary alloc] init];
    send[@"pin"] = [NSNumber numberWithInt: [[field_pair_code stringValue] integerValue]];
    [_websocket_mc sendEvent:@"bindPin" data:send];
}

-(NSInteger)translateKey: (NSNumber*)key
{
    switch([key integerValue]) {
        case 38:
            return 0x7E;
        case 39:
            return 0x7C;
        case 40:
            return 0x7D;
        case 37:
            return 0x7B;
    }
    
    return 0;
}

#pragma mark Websocket events

-(void) keyRelease: (NSNotification*)notification;
{
    NSNumber *key = [notification object][@"v"];
    NSInteger real = [self translateKey:key];
    
    CGEventSourceRef src = CGEventSourceCreate(kCGEventSourceStateHIDSystemState);
    CGEventRef event_ref = CGEventCreateKeyboardEvent(src, real, false);
    CGEventPost(kCGHIDEventTap, event_ref);
    CFRelease(src);
    CFRelease(event_ref);
}
-(void) keyPress: (NSNotification*)notification;
{
    NSNumber *key = [notification object][@"v"];
    NSInteger real = [self translateKey:key];
    
    CGEventSourceRef src = CGEventSourceCreate(kCGEventSourceStateHIDSystemState);
    CGEventRef event_ref = CGEventCreateKeyboardEvent(src, real, true);
    CGEventPost(kCGHIDEventTap, event_ref);
    CFRelease(src);
    CFRelease(event_ref);
}

@end
