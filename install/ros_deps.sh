#!/usr/bin/env bash
echo 'deb [trusted=yes] https://easy-to-fly.github.io/deb debian/' | sudo tee -a /etc/apt/sources.list
sudo apt update
# sudo apt install ros-melodic-laser-geometry ros-melodic-cmake-modules ros-melodic-roslint
sudo apt install ros-melodic-pointcloud-to-laserscan ros-melodic-rplidar-ros -y
