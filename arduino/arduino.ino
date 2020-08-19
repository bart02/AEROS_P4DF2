#include <Wire.h>
#include <VL53L1X.h>
#include <ros.h>
#include <sensor_msgs/Range.h>

VL53L1X sensor;
VL53L1X sensor2;
VL53L1X sensor3;
VL53L1X sensor4;

ros::NodeHandle nh;
sensor_msgs::Range msg;
ros::Publisher P_Left("left", &msg);
ros::Publisher P_Forward("forward", &msg);
ros::Publisher P_Right("right", &msg);
ros::Publisher P_Backward("backward", &msg);

void setup() {
  for (int i = 2; i <= 5; ++i) {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW);
  }

  delay(100);
  Wire.begin();
  Wire.setClock(400000);

  digitalWrite(3, HIGH);
  delay(100);
  sensor2.init();
  sensor2.setAddress(0x33);

  digitalWrite(4, HIGH);
  delay(100);
  sensor3.init();
  sensor3.setAddress(0x35);

  digitalWrite(5, HIGH);
  delay(100);
  sensor4.init();
  sensor4.setAddress(0x37);

  digitalWrite(2, HIGH);
  delay(100);
  sensor.init();
  delay(50);


  sensor.setDistanceMode(VL53L1X::Long);
  sensor.setMeasurementTimingBudget(50000);
  sensor.startContinuous(50);
  sensor.setTimeout(100);

  sensor2.setDistanceMode(VL53L1X::Long);
  sensor2.setMeasurementTimingBudget(50000);
  sensor2.startContinuous(50);
  sensor2.setTimeout(100);

  sensor3.setDistanceMode(VL53L1X::Long);
  sensor3.setMeasurementTimingBudget(50000);
  sensor3.startContinuous(50);
  sensor3.setTimeout(100);

  sensor4.setDistanceMode(VL53L1X::Long);
  sensor4.setMeasurementTimingBudget(50000);
  sensor4.startContinuous(50);
  sensor4.setTimeout(100);


  nh.initNode();
  nh.advertise(P_Left);
  nh.advertise(P_Forward);
  nh.advertise(P_Right);
  nh.advertise(P_Backward);

  msg.radiation_type = sensor_msgs::Range::INFRARED;
  msg.field_of_view = 0.471239;
  msg.min_range = 0.0;
  msg.max_range = 4.0;
}

void loop() {
  msg.range = sensor.read() / 1000.0;
  msg.header.frame_id = "etf_left";
  msg.header.stamp = nh.now();
  P_Left.publish(&msg);
  nh.spinOnce();
  
  msg.range = sensor2.read() / 1000.0;
  msg.header.frame_id = "etf_forward";
  msg.header.stamp = nh.now();
  P_Forward.publish(&msg);
  nh.spinOnce();

  msg.range = sensor3.read() / 1000.0;
  msg.header.frame_id = "etf_right";
  msg.header.stamp = nh.now();
  P_Right.publish( &msg);
  nh.spinOnce();

  msg.range = sensor4.read() / 1000.0;
  msg.header.frame_id = "etf_backward";
  msg.header.stamp = nh.now();
  P_Backward.publish( &msg );
  nh.spinOnce();
}
