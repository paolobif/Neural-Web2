import os
import sys
import shutil
import time


class Timer():
    """
        Object that keeps track of time so the external server
        knows when to shut down.
    """
    def __init__(self, start, current):
        """
        Args:
            start ([float]): [start time for timer]
            delta ([float]): [difference between start and current time]
        """
        self.start = start
        self.current = current
        self.delta = current - start


def is_safe_path(basedir, path, follow_symlinks=False):
    # resolves symbolic links
    if follow_symlinks:
        matchpath = os.path.realpath(path)
    else:
        matchpath = os.path.abspath(path)
    return basedir == os.path.commonpath((basedir, matchpath))


def path_safe(path):
    """Checks the given path to ensure
    only files within static can be viewed.

    Args:
        path (str): path to directory.

    Returns:
        bool: if the path is safe or not.
    """
    if "~" not in path and ".." not in path:
        safe = True
    else:
        safe = False

    return safe


def compress_directory(path, save_name):
    """Takes directory and compresses it into a zip file.
    Returns the path to the saved zip file.

    Args:
        path (str): path to diretory
        save_name ([str]): [name fo saved file -- no extension]

    Returns:
        [str]: [path to saved zip]
    """
    save_path = shutil.make_archive(save_name, "zip", path)
    return save_path


