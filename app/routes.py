from flask import request, jsonify, Blueprint
from .nlp_service import NLPService

main = Blueprint('main', __name__)
nlp_service = NLPService()

@main.route('/api/search', methods=['POST'])
def search_properties():
    query = request.json.get('query')
    properties = nlp_service.search_properties(query)
    return jsonify(properties)
