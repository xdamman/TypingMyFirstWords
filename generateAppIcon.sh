#!/bin/bash

mkdir -p generated

# echo "Generating iPhone app icons"
# sips -Z 29 --out generated/iPhoneSettings-29x29.png $1
# sips -Z 58 --out generated/iPhoneSettings-29x29@2x.png $1
# sips -Z 80 --out generated/iPhoneSpotlight-40x40@2x.png $1
# sips -Z 120 --out generated/iPhoneApp-60x60@2x.png $1

echo "Generating iPad app icons"
sips -Z 29 --out generated/iPadSettings-29x29.png $1
sips -Z 58 --out generated/iPadSettings-29x29@2x.png $1

sips -Z 40 --out generated/iPadSpotlight-40x40.png $1
sips -Z 80 --out generated/iPadSpotlight-40x40@2x.png $1

sips -Z 72 --out generated/iPadApp-72x72.png $1
sips -Z 144 --out generated/iPadApp-76x76@2x.png $1

sips -Z 76 --out generated/iPadApp-76x76.png $1
sips -Z 152 --out generated/iPadApp-76x76@2x.png $1

sips -Z 167 --out generated/iPadProApp-83x83@2x.png $1

cp generated/*.png ios/TypingMyFirstWords/Images.xcassets/AppIcon.appiconset

rm -rf generated

echo "All done"
