#!/bin/sh

weights=https://www.dropbox.com/sh/xx4kalzjxrkej26/AABzftltaYpoQiyNhkwQQOqCa?dl=1

echo "cloning repo for Worm-Yolo3"
git clone https://github.com/paolobif/Worm-Yolo3.git
mv Worm-Yolo3 nn

echo "downloading weights"
wget -O nn/weights/weights.zip $weights
unzip nn/weights/weights.zip -d nn/weights/

# Dependencies for nn
echo "installing dependencies for nn and api"
pip3 install -r requirements.txt
pip3 install torch==1.9.1+cu111 torchvision==0.10.1+cu111 torchaudio==0.9.1 -f https://download.pytorch.org/whl/torch_stable.html
sudo apt-get install python3-tk
pip3 install filterpy 

echo "Done!"
