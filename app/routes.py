from app import app

# Define route for the home page
@app.route('/')
def index():
    return 'Welcome to RealEstate360!'

# Define route for a sample page
@app.route('/sample')
def sample():
    return 'This is a sample page.'
