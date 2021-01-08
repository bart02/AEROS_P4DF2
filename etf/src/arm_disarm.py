#!/usr/bin/env python2

import rospy
from mavros_msgs.srv import CommandBool

rospy.init_node('arm_disarm', anonymous=True)

arming = rospy.ServiceProxy('/mavros/cmd/arming', CommandBool)

arming(True)
rospy.sleep(0.4)
arming(False)
