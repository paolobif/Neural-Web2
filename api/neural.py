import sys
sys.path.insert(0, "nn/")
# sys.path.insert(0, "/Users/paolobifulco/Lab_Work/Worm-Yolo3")
import os
import sys
import cv2
import pandas as pd
import numpy as np

from yolov3_core import *
from sort.sort import *
from vid_annotater_bulk import YoloToCSV
from process_YOLO import bb_intersection_over_union, analyzeSORT


# ----- BASE YOLO DETECTIONS ----- #

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

    def __init__(self, video_path, save_path, data, weights=False):
        # Set weights if provided.
        if weights and type(weights) == str:
            self.settings['weights_path'] = os.path.join('nn/weights/', weights)

        super().__init__(self.settings)
        self.data = data  # IMPORTANT! data.progress has queue info.
        self.video_path = video_path
        self.save_path = os.path.join(self.save_root, save_path)
        self.video_name = os.path.splitext(os.path.basename(video_path))[0]
        self.save_video_path = os.path.join(self.save_path) #, self.video_name)

        os.makedirs(self.save_path, exist_ok=True)  # makes save parent dir.
        os.makedirs(self.save_video_path, exist_ok=True)  # save for child.

    def process_video(self):
        # Load and determine save paths.
        vid = cv2.VideoCapture(self.video_path)
        self.frame_total = vid.get(cv2.CAP_PROP_FRAME_COUNT)
        csv_out_path = os.path.join(self.save_video_path, self.video_name) + ".csv"
        self.full_csv_path = csv_out_path  # Used by YoloCsvToSort to get the correct path.

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


# ----- SORT OF YOLO DETECTIONS ----- #

class YoloCsvToSort():
    params = {
        "threshold": 30,
        "max_age": 10,
        "min_hits": 3,
        "iou_threshold": 0.3,
        "start_age": 0,
        "framerate": 144,
        "slow_move": 5,
        "delta_overlap": 0.8
    }

    def __init__(self, csv_path, save_path, params=None):
        self.csv_path = csv_path
        self.save_path = save_path
        if params:
            self.params = params
        # Load csv:
        df = pd.read_csv(csv_path,names=('frame', 'x1', 'y1', 'w','h','label'))
        df['x2']=df[['x1','w']].sum(axis=1)
        df['y2']=df[['y1','h']].sum(axis=1)
        self.df = df[['frame','x1', 'y1', 'x2', 'y2']]

    def sort(self):
        params = self.params
        # Init tracker
        mot_tracker = Sort(params["max_age"], params["min_hits"], params["iou_threshold"])
        # Get uniqie worms and start tracking.
        unique = self.df["frame"].unique()
        csv_outputs = []
        for x in unique:
            filtval = self.df['frame'] == x
            boxes_xyxy = np.asarray(self.df[filtval])[:,1:5]

            track_bbs_ids = mot_tracker.update(boxes_xyxy)
            for output in track_bbs_ids:
                x1, y1, x2, y2, label, *_ = output
                csv_outputs.append([x.tolist(), x1.tolist(), y1.tolist(), x2.tolist(),y2.tolist(),label.tolist()])

        print("Finished sorting")
        csv_outputs = pd.DataFrame(csv_outputs)

        csv_outputs.columns = ['frame', 'x1', 'y1', 'x2', 'y2','label']
        csv_outputs['delta'] = 0
        csv_outputs['catagory'] = 'alive'

        outputs = analyzeSORT(csv_outputs,
                              params["threshold"],
                              params["slow_move"],
                              params["delta_overlap"],
                              params["start_age"],
                              params["framerate"])

        csv_name = os.path.basename(self.csv_path)
        outputs.loc[0] = ['#expID', csv_name]
        # Save output csv file
        save_name = f"sorted_{csv_name}"
        _save_path = os.path.join(self.save_path, save_name)
        pd.DataFrame(outputs).to_csv(_save_path, mode='w', header=True, index=None)


if __name__ == '__main__':
    # Just for testing.
    class TestProgress:
        progress = 0
        video = "./static/videos/505.avi"
        save = "test_path"

    test = TestProgress()
    model = VidModel(test.video, test.save, test)
    model.process_video()

    # saved_csv = os.path.join(test.save, "505.csv"
    # test_sort = YoloCsvToSort("./static/results/test_path/505/505.csv")
    # test_sort.sort()