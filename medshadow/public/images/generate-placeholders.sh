#!/bin/bash

# Generate hero background
convert -size 1920x1080 xc:#4F46E5 -fill white -gravity center -pointsize 72 -annotate +0+0 "Medical Professionals" hero-bg.jpg

# Generate CTA background
convert -size 1920x1080 xc:#4F46E5 -fill white -gravity center -pointsize 72 -annotate +0+0 "Medical Students" cta-bg.jpg

# Generate opportunity images
convert -size 800x600 xc:#4F46E5 -fill white -gravity center -pointsize 48 -annotate +0+0 "Cardiology Department" cardiology.jpg
convert -size 800x600 xc:#4F46E5 -fill white -gravity center -pointsize 48 -annotate +0+0 "Pediatrics Department" pediatrics.jpg
convert -size 800x600 xc:#4F46E5 -fill white -gravity center -pointsize 48 -annotate +0+0 "Emergency Department" emergency.jpg 