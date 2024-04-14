#!/bin/bash

# Path to the image
IMAGE=$1

# Get image dimensions
WIDTH=$(sips -g pixelWidth $IMAGE | awk '/pixelWidth/ {print $2}')
HEIGHT=$(sips -g pixelHeight $IMAGE | awk '/pixelHeight/ {print $2}')

# Determine the size for the square
SIZE=$(($WIDTH<$HEIGHT?$WIDTH:$HEIGHT))

# If height is greater, crop the height to make it square from the top
sips --cropToHeightWidth $SIZE $SIZE --cropOffset 1 1 $IMAGE --out $IMAGE
