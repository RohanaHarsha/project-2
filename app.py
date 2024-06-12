from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return 'Welcome to RealEstate360 Backend!'

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query', '')
    return jsonify({'query': query})

@app.route('/results', methods=['POST'])
def results():
    data = request.json
    search_params = data.get('search_params', {})
    search_results = [
        {'property_id': 1, 'description': 'Sample Property 1'},
        {'property_id': 2, 'description': 'Sample Property 2'},
    ]
    return jsonify({'results': search_results})

if __name__ == '__main__':
    app.run(debug=True)
