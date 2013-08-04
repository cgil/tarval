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
    
    [notification_center addObserver:self selector:@selector(keyPress:) name:@"evt:keyDown" object:nil];
}


#pragma mark IBActions
-(IBAction)pressConnect: (id)sender
{
    _websocket_mc = [[WebsocketMC alloc] init];
    [_websocket_mc connect];
}

-(IBAction)pressPair: (id)sender
{
    NSMutableDictionary *send = [[NSMutableDictionary alloc] init];
    send[@"pin"] = [NSNumber numberWithInt: [[field_pair_code stringValue] integerValue]];
    NSLog(@"hello");
    [_websocket_mc sendEvent:@"bindPin" data:send];
}

#pragma mark Websocket events
-(void) keyPress: (NSNotification*)notification;
{
    NSLog(@"WASSUP!");
}

-(void)pressLeft
{
    NSLog(@"Hello world");
    CGEventSourceRef src = CGEventSourceCreate(kCGEventSourceStateHIDSystemState);

    CGEventRef left_down = CGEventCreateKeyboardEvent(src, 0x7B, true);
    CGEventRef left_up = CGEventCreateKeyboardEvent(src, 0x7B, false);
    CGEventRef up_down = CGEventCreateKeyboardEvent(src, 0x7E, false);
    CGEventRef up_up = CGEventCreateKeyboardEvent(src, 0x7E, true);

    CGEventTapLocation loc = kCGHIDEventTap; // kCGSessionEventTap also works
    
    if(pressing) {
        CGEventPost(loc, up_up);
        CGEventPost(loc, left_up);
        pressing = false;
    }
    else {
        CGEventPost(loc, up_down);
        CGEventPost(loc, left_down);
        pressing = true;
    }
    
    CFRelease(left_up);
    CFRelease(left_down);
    CFRelease(up_up);
    CFRelease(up_down);
    CFRelease(src);
}

@end
