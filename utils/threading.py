import time
# Loops through and monitors queue status.
# Begins processing each item in the queue.


def monitor_queue(queue, db):
    """Threaded loop that tracks state of queue
    and pops items to be processed.

    Args:
        queue (list): list of process ids.
        db (string): path to database.
    """
    while True:
        if queue:
            active_pid = queue.pop(0)
            process_item(db, active_pid)

            print(len(queue))
            print(queue)

        time.sleep(0.5) 


def process_item(db, pid):
    """Processes poped item and upates progress and state in the database

    Args:
        db (string): path to database.
        pid (int): process id.
    """
    queueDB = QueueDB(db, "news")
    queueDB.update_status(pid, 1)  # update process state to inprogress.
    
    # Temp processing to show progress on item.
    for i in range (1, 101):
        queueDB.update_progress(pid, i)
        print(pid, i)
        time.sleep(0.2)

    queueDB.update_status(pid, 2)  # update to completed.
    queueDB.close()