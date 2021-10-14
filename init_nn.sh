

weights=https://www.dropbox.com/sh/xx4kalzjxrkej26/AABzftltaYpoQiyNhkwQQOqCa?dl=1

git clone https://github.com/paolobif/Worm-Yolo3.git
mv Worm-Yolo3 nn

wget -O nn/weights/weights.zip $weights

unzip nn/weights/weights.zip -d nn/weights/
