import time

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
        data.update_db()
        print("waiting.....")
        if len(data.queue) > 0:
            active_item = data.queue[0]
            process_item(active_item[0], data)

            print(len(data.queue))
            print(data.queue)

        time.sleep(0.1)


def process_item(pid, data):
    """Processes poped item and upates progress and state in the database

    Args:
        db (string): path to database.
        pid (int): process id.
    """
    data.update_state(pid)  # Puts pid into work mode.

    while (data.progress < 100):
        data.progress += 1
        time.sleep(0.6)
        print("progress: ", data.progress, "---  item: ", pid)

    data.mark_complete(pid)
