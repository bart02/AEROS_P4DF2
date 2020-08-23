cd ~/catkin_ws/src
git clone https://github.com/ros-drivers/rosserial.git
cd rosserial
git checkout 0.8.0
cd ~/catkin_ws
catkin_make -j1

cd ~
mkdir -p ~/Arduino/libraries
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sudo BINDIR=/usr/local/bin sh
arduino-cli config init
arduino-cli core update-index
arduino-cli core install arduino:avr
arduino-cli lib install vl53l1x

cd ~/Arduino/libraries
rosrun rosserial_arduino make_libraries.py .
