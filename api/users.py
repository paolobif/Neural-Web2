from functools import wraps
from flask import session, flash, redirect
from flask.json import jsonify 


# Basic single use... can be expanded to unclude db of users.
class User():
    def __init__(self, user_id, username, password):
        self.id = user_id
        self.username = username
        self.password = password

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def is_admin(self):
        return True

    def get_id(self):
        return self.id


users = []
users.append(User(user_id=1, username='root', password='root'))

# Ensures login to access dashboard.
def login_required(f):
    wraps(f)

    def wrap(*args, **kwargs):
        if session['authorized']:
            return f(*args, **kwargs)
        else:
            flash("You are not logged in.")
            return jsonify({"error": "not logged in"})

    return(wrap)