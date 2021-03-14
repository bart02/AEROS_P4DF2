#!/usr/bin/env python2
import rospy
from sensor_msgs.msg import Range, LaserScan
from math import sqrt, tan, sin, cos, atan2, pi, acos
from numpy import arange

pi_2 = pi/2


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


rospy.init_node('etf_scan')

s = Sensors(3, 1, 3, 1)
pub = rospy.Publisher('/scan', LaserScan)

r = rospy.Rate(10)  # 10hz
while not rospy.is_shutdown():
    if s.forward is not None and s.backward is not None and s.left is not None and s.right is not None:
        msg = LaserScan()
        msg.header.stamp = rospy.Time.now()
        msg.header.frame_id = "aruco_map_detected"
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

