import time
from neural import VidModel

# Loops through and monitors queue status.
# Begins processing each item in the queue.


def monitor_queue(data):
    """Threaded loop that tracks state of queue
    and pops items to be processed.

    Args:
        queue (list): list of process ids.
        db (string): path to database.
    """
    while True:
        # timer_start = time.time()
        data.update_db()
        print("waiting.....")
        if len(data.queue) > 0:
            active_item = data.queue[0]
            process_item(active_item, data)

            print(len(data.queue))
            print(data.queue)

        time.sleep(0.1)


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


def check_time(timer_current, timer_start):
    """Checks if item has been added to the queue within
    specified time window. If not... shuts down computer

    Args:
        timer_current (float): current unix time.
        timer_start (float): start of timer unix time.
    """

    pass
