import time
import os
from neural import VidModel

# Shutdown check.
shutdown = False

# Loops through and monitors queue status.
# Begins processing each item in the queue.


def monitor_queue(data):
    """Threaded loop that tracks state of queue
    and pops items to be processed.

    Args:
        queue (list): list of process ids.
        db (string): path to database.
    """
    timer_start = time.time()
    while True:
        data.update_db()
        print("waiting.....")
        if len(data.queue) > 0:
            timer_start = time.time()

            active_item = data.queue[0]
            process_item(active_item, data)

            print(len(data.queue))
            print(data.queue)

        time.sleep(0.1)

        if shutdown:
            check_time(timer_start)  # Shuts down computer


def process_item(item, data):
    """Takes the item next in queue and begins processing the video and
    updating the state of the process.

    Args:
        item (list): [pid, path, save, process, state, time]
        data (object): Contains all queue information. From Queue.
    """
    pid = item[0]
    data.update_state(pid)  # Puts pid into work mode.

    # Init model  (vid_path, save_path, data)
    vid_model = VidModel(item[1], item[2], data)
    vid_model.process_video()  # Video analysis.

    data.mark_complete(pid)

    # while (data.progress < 100):
    #     data.progress += 1
    #     time.sleep(0.6)
    #     print("progress: ", data.progress, "---  item: ", pid)


def check_time(timer_start, thresh=7200):
    """Checks if item has been added to the queue within
    specified time window. If not... shuts down computer
    Calculates current time when function is called.

    Args:
        timer_start (float): start of timer unix time.
        thresh (int): time in seconds. Default is 2hours.
    """
    current_time = time.time()
    delta = current_time - timer_start
    if delta > thresh:
        # scrappy shutdown if in container...
        try:
            os.system("sudo shutdown -h now")
        except Exception as e:
            print(e)

        try:
            os.system("bash ../static/shutdown.sh")
        except Exception as e:
            print(e)
            print("unable to shutdown...")

