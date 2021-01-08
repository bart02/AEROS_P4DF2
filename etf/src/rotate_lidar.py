#!/usr/bin/env python2

import rospy
from sensor_msgs.msg import LaserScan

rospy.init_node('rotate_lidar')


def callback(data):
    ranges = list(data.ranges)[::-1]
    data.ranges = ranges
    pub.publish(data)


rospy.Subscriber('/scan', LaserScan, callback)
pub = rospy.Publisher('/mavros/obstacle/send', LaserScan, queue_size=10)

rospy.spin()
