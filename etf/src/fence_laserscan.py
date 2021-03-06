#!/usr/bin/env python2
import rospy
from sensor_msgs.msg import Range, LaserScan
from math import sqrt, tan, sin, cos, atan2, pi, acos
from numpy import arange
from mavros_msgs.msg import State
from time import time

pi_2 = pi/2
pos = 0


class Sensors:
    left = None
    right = None
    forward = None
    backward = None

    def __init__(self, left, right, forward, backward):
        self.left = left
        self.right = right
        self.forward = forward
        self.backward = backward


def callb(m):

    global pos, sub
    print m.mode
    if m.mode == "POSCTL":
        pos = time()
        sub.unregister()


rospy.init_node('etf_scan')

s = Sensors(1.5, 1.5, 1.5, 1.5)
pub = rospy.Publisher('/scan', LaserScan)
sub = rospy.Subscriber('/mavros/state', State, callb)

r = rospy.Rate(10)  # 10hz
while not rospy.is_shutdown():
    if time() - pos > 5:
        print "POS"
        msg = LaserScan()
        msg.header.stamp = rospy.Time.now()
        msg.header.frame_id = "fence_center"
        msg.angle_min = 0.0
        msg.angle_max = 2*pi
        msg.angle_increment = 0.01
        msg.range_min = 0.0
        msg.range_max = sqrt(4.0 * 4.0 * 2)

        angles = []
        angles += [abs(s.forward / cos(i))
                   for i in arange(0, atan2(s.left, s.forward), msg.angle_increment)]
        angles += [abs(s.left / sin(i))
                   for i in arange(atan2(s.left, s.forward), pi_2, msg.angle_increment)]
        angles += [abs(s.left / sin(i))
                   for i in arange(pi_2, pi_2 + atan2(s.backward, s.left), msg.angle_increment)]
        angles += [abs(s.backward / cos(i))
                   for i in arange(pi_2 + atan2(s.backward, s.left), pi, msg.angle_increment)]
        angles += [abs(s.backward / cos(i))
                   for i in arange(pi, pi + atan2(s.right, s.backward), msg.angle_increment)]
        angles += [abs(s.right / sin(i))
                   for i in arange(pi + atan2(s.right, s.backward), pi + pi_2, msg.angle_increment)]
        angles += [abs(s.right / sin(i))
                   for i in arange(pi + pi_2, pi + pi_2 + atan2(s.forward, s.right), msg.angle_increment)]
        angles += [abs(s.forward / cos(i))
                   for i in arange(pi + pi_2 + atan2(s.forward, s.right), 2*pi, msg.angle_increment)]

        msg.ranges += angles
        pub.publish(msg)

    r.sleep()
