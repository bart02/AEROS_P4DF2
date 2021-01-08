#!/usr/bin/env python2

import rospy
from mavros_msgs.srv import CommandBool
from std_srvs.srv import Trigger

rospy.init_node('arm_disarm')

arming = rospy.ServiceProxy('/mavros/cmd/arming', CommandBool)

def handle(req):
    arming(True)
    rospy.sleep(0.5)
    arming(False)
    r = Trigger()
    return (True, 'ok')

s = rospy.Service('arm_disarm', Trigger, handle)
rospy.spin()

