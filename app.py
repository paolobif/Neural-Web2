from flask import Flask, request, jsonify
from flask_cors import CORS

import os
import glob


app = Flask(__name__, static_url_path='/static')
CORS(app)
app.config["DEBUG"] = True


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



if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True, use_reloader=True)