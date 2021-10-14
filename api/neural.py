import sys
sys.path.insert(0, "nn/")
# sys.path.insert(0, "/Users/paolobifulco/Lab_Work/Worm-Yolo3")
import os
import cv2

from yolov3_core import *
from vid_annotater_bulk import YoloToCSV


class VidModel(YoloModelLatest):
    """Processes the videos from the gui and saves the results in the
    specified directory.
    """
    # Model Settings.
    settings = {'model_def': "nn/cfg/yolov3-spp-1cls.cfg",
                'weights_path': "nn/weights/416_1_4_full_best200ep.pt",
                'class_path': "nn/cfg/classes.names",
                'img_size': 608,
                'iou_thres': 0.6,
                'no_gpu': True,
                'conf_thres': 0.1,
                'batch_size': 6,
                'augment': None,
                'classes': None}

    save_root = "./static/results"  # Where the results are stored.

    frame_total = 0  # Total number of frames in video
    current = 0  # Current frame in processing.

    write_vid = False

    def __init__(self, video_path, save_path, data):
        super().__init__(self.settings)
        self.data = data  # IMPORTANT! data.progress has queue info.
        self.video_path = video_path
        self.save_path = os.path.join(self.save_root, save_path)
        self.video_name = os.path.splitext(os.path.basename(video_path))[0]
        self.save_video_path = os.path.join(self.save_path, self.video_name)

        os.makedirs(self.save_path, exist_ok=True)  # makes save parent dir.
        os.makedirs(self.save_video_path, exist_ok=True)  # save for child.

    def process_video(self):
        # Load and determine save paths.
        vid = cv2.VideoCapture(self.video_path)
        self.frame_total = vid.get(cv2.CAP_PROP_FRAME_COUNT)
        csv_out_path = os.path.join(self.save_video_path, self.video_name) + ".csv"

        # Prep video writer.
        if self.write_vid:
            out_video_path = self.save_video_path + ".avi"
            fourcc = cv2.VideoWriter_fourcc(*"MJPG")
            # currently set to 10fps
            # TODO: change size of writer dynamically.
            writer = cv2.VideoWriter(out_video_path,
                                     fourcc, 10,
                                     (1920, 1080),
                                     True)

        print(f"Processing video: {self.video_path}")
        print(f"Saving to: {self.save_video_path}")

        # Process Video.
        for _ in range(int(self.frame_total)):
            _, frame = vid.read()
            self.current = vid.get(cv2.CAP_PROP_POS_FRAMES)
            toCSV = YoloToCSV(self, frame, self.current)
            toCSV.write_to_csv(csv_out_path)

            if self.write_vid:
                toCSV.draw_on_im(out_video_path, writer)

            self.update_queue_progress()  # Updates progress for api.
            print(self.current, self.frame_total)
            print(self.data.progress)

        if self.write_vid:
            writer.release

    # Updates data progress percentage.
    def update_queue_progress(self):
        decimal = self.current / self.frame_total
        percentage = int(decimal * 100)
        self.data.progress = percentage


if __name__ == '__main__':
    # Just for testing.
    class TestProgress:
        progress = 0
        video = "./static/videos/505.avi"
        save = "test_path"

    test = TestProgress()
    model = VidModel(test.video, test.save, test)
