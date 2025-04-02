import re

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'jfif'}

def allowed_file(filename):
    """Return True if the file has one of the allowed extensions."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def is_valid_email(email):
    """Check if the email format is valid."""
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None
