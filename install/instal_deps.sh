echo 'deb [trusted=yes] http://repo.etf.batalov.me debian/' | sudo tee -a /etc/apt/sources.list
sudo apt update
# sudo apt install ros-melodic-laser-geometry ros-melodic-cmake-modules ros-melodic-roslint
sudo apt install ros-melodic-pointcloud-to-laserscan ros-melodic-rplidar-ros
