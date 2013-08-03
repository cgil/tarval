//
//  TRConstants.m
//  Tarval
//
//  Created by Steve Gattuso on 8/3/13.
//  Copyright (c) 2013 hackNY. All rights reserved.
//

#import "TRConstants.h"

@implementation TRConstants

+(NSURL*) websocketEndpoint
{
    return [[NSURL alloc] initWithString:@"ws://kparikh.com:8080"];
}

+(NSArray*) websocketProtocol
{
    return [[NSArray alloc] initWithObjects:@"iphone", nil];
}

@end
