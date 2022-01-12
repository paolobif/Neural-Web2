from flask import Flask, request, jsonify, send_from_directory, session, flash
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import threading
import os
import glob
import random
import time
from functools import wraps

from app_utils.nn_threading import monitor_queue
from app_utils.app_utils import Timer
from app_utils.app_utils import *
from users import users


app = Flask(__name__, static_url_path='/static')
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = 'y9JKPd6pWNtca74s'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///queue.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["DEBUG"] = True
db = SQLAlchemy(app)


class Queue(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(120), unique=False, nullable=False)
    save = db.Column(db.String(120), unique=False, nullable=False)
    process = db.Column(db.String(80), unique=False, nullable=False)
    tracking = db.Column(db.PickleType(), unique=False, nullable=True)
    state = db.Column(db.Integer, unique=False, nullable=False)
    time = db.Column(db.Float, unique=False, nullable=False)

    def __repr__(self):
        return f'<Queue {self.pid}'


class Data():
    queue = []
    done = []
    working = []
    progress = 0

    def __init__(self):
        self.update_db()
        self.working_cleanup()

    def update_db(self):
        self.q_query = Queue.query.filter_by(state=0).all()
        self.d_query = Queue.query.filter_by(state=1).all()
        self.w_query = Queue.query.filter_by(state=2).all()

        self.queue = self.convert_to_list(self.q_query)
        self.done = self.convert_to_list(self.d_query, limit=10, reverse=True)
        self.working = self.convert_to_list(self.w_query)

    def remove_item(self, pids: list):
        for pid in pids:
            query = Queue.query.filter_by(pid=pid).first()
            db.session.delete(query)
        db.session.commit()
        self.update_db()

    def update_state(self, pid):
        # Set previous item to done.
        for working in self.w_query:
            working.state = 1
        # sets next pid to working.
        new_worker = Queue.query.filter_by(pid=pid).first()
        new_worker.state = 2
        self.progress = 0
        db.session.commit()
        self.update_db()

    def mark_complete(self, pid):
        for working in self.w_query:
            working.state = 1

        query = Queue.query.filter_by(pid=pid).first()
        if query:
            query.state = 1

        self.progress = 0
        db.session.commit()
        self.update_db()

    def working_cleanup(self):
        # Removes working and adds back to the queue.
        # if self.progress < 100:
        for working in self.w_query:
            working.state = 0
        # elif self.progress == 100:
        #     for working in self.w_query:
        #         working.state = 1
        # else:
        #     for working in self.w_query:
        #         self.remove_item([working.pid])
        db.session.commit()
        self.update_db()

    @staticmethod
    def sort_list(items: list, reverse=False):
        # sorts by time.
        sorted_list = sorted(items, key=lambda x: x[5], reverse=reverse)
        return sorted_list

    @staticmethod
    def convert_to_list(query_results, limit=None, reverse=False):
        results = []
        for res in query_results:
            res_list = [res.pid, res.path, res.save,
                        res.process, res.state, res.time]
            results.append(res_list)
        results = sorted(results, key=lambda x: x[5], reverse=reverse)
        return results[:limit]

    @staticmethod
    def clear_all():
        q_all = Queue.query.all()
        for q in q_all:
            db.session.delete(q)
        db.session.commit()



@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    user = [n for n in users if n.username == username]
    if user:
        user = user[0]  # fetches the user
    else:
        return jsonify({"error": "user not found"}), 401

    # handle login.
    if user.password == password:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"error": "invalid password"}), 402

    print(username, password)
    return jsonify('yay')


@app.route('/api/folder/info/<path:subpath>')
def getDirectory(subpath):
    """Get endpoint for list of files within specified directory."""

    input_path = os.path.join("static", subpath)
    file_type = request.args.get('type')
    print(file_type)

    # Checks if path exists and if path is a file or directory
    if os.path.exists(input_path):
        if os.path.isfile(input_path):
            # If the provided path is just a file
            files = os.path.basename(input_path)
            path = os.path.dirname(input_path)

        elif file_type == "Video":
            # If provided type is Video
            video_files = glob.glob(f"{input_path}/*.avi")
            files = list(map(os.path.basename, video_files))
            path = input_path

        else:
            # Everything esle for now
            files = os.listdir(input_path)
            path = input_path

        print(subpath)
        return jsonify({"path": path, "names": files})

    else:
        error_message = "Invalid file path..."
        return jsonify({"message": error_message}), 400


@app.route('/api/queue/append', methods=['POST'])
@jwt_required()
def appendQueue():
    r = request.json
    form = r['form']
    print(r)
    for name in form['selected']:
        pid = random.randint(0, 1000000000000)
        unix_time = time.time()
        new_entry = Queue(pid=pid,
                          path=os.path.join(form['source'], name),
                          save=form['name'],
                          process=form['type'],
                          tracking=form['tracking'],
                          state=0,
                          time=unix_time)
        db.session.add(new_entry)
        db.session.commit()

    # print(data.queue)
    # print(data.working)
    # print(data.done)
    return jsonify({"status": "sucess"})


@app.route('/api/files/upload', methods=['POST'])
def uploadFile():
    static = "./static"
    destination = request.form["dest"]
    sent_file = request.files['img']
    file_name = request.form["name"]
    print(destination)
    print(sent_file)

    # Create save directory.
    save_dir = os.path.join(static, destination)
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    save_path = os.path.join(save_dir, file_name)
    sent_file.save(save_path)
    return jsonify({"status": "success"})


@app.route('/api/queue/delete/<pid>')
@jwt_required()
def delete_process(pid):
    data.remove_item([pid])
    return jsonify({"status": "success"})


@app.route('/api/results/available')
def fetch_results():
    """ Returns list of directories located in the results folder.
    URL params:
        dir : path to directory you want to downlaod.
        dl : wether you want to download or just view list of files.

    Returns:
        json: map of folders located within results
    """
    results_path = 'static/results'
    downlaod = request.args.get('dl')
    path = request.args.get('dir')

    base_path = os.path.join(os.getcwd(), results_path)

    if path:
        # Another path check.
        path = os.path.join(base_path, path)
        if is_safe_path(base_path, path):
            base_path = os.path.join(base_path, path)
        else:
            return jsonify({"error": "invalid path"}), 400

    print(base_path)
    if not path_safe(base_path):  # Make sure the path doesn't traverse.
        return jsonify({"error": "select a different path"}), 400

    if not os.path.exists(base_path):  # Check if path exists.
        return jsonify({"error": "invalid path"}), 400

    if not downlaod:  # If no download.
        files = os.listdir(base_path)
        return jsonify({"results": files})
    else:
        try:
            short_path = os.path.join(results_path, path)

            # print(f'Downloading path: {base_path}')

            # try:
            zip_name = os.path.basename(short_path)  # base_path # Name for saved zip.
            zip_save = os.path.join(short_path, zip_name)  # (base_path, zip_name)
            full_save_path = os.path.join(os.path.abspath("."), short_path)
            zip_path = compress_directory(full_save_path, zip_save)  # (base_path, zip_save) # Makes zip file.
            print(zip_name, zip_save, full_save_path)
            try:
                return send_from_directory(
                    base_path, f'{zip_name}.zip', as_attachment=True, attachment_filename=f'{zip_name}.zip')
            finally:
                os.remove(zip_path)  # Cleanup zip file.
        except:
            print("failed download")


@app.route('/api/queue/delete')
def delete_queue():
    # TODO: Create endpoint that allows you to delete the entire queue if a bug appears.
    pass


# Handler for a message recieved over 'connect' channel
@socketio.on('connect')
def connect():
    session['authorized'] = True
    print(session['authorized'])
    print("connected")


@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)


@socketio.on('disconnect')
def disconnect():
    print("disconnecting")
    session['authorized'] = False


@socketio.on('progress_data')
def send_data(source_data):
    data.update_db()
    return_data = {
        "queue": data.queue,
        "done": data.done,
        "working": data.working,
        "progress": data.progress
    }
    emit('progress_data', return_data)


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


# @socketio.on('connect')
# def connect(sid, environ):
#     print(sid, 'connected')
#     # print("connected")
#     # print('recieved: ', client)
#     # emit('message', {'progress': data.progress}, broatcast=True)


# @socketio.on('disconnect')
# def disconnect(sid):
#     print(sid, 'disconnected')

if __name__ == '__main__':
    # Start Threading.
    data = Data()
    timer = Timer(time.time(), time.time())  # Track time since last queue item.
    monitoring_thread = threading.Thread(target=monitor_queue, args=[data, timer])
    monitoring_thread.start()

    socketio.run(app, host="0.0.0.0", port="5000", use_reloader=False)
