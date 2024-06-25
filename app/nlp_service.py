from .nlp_module import NLPModule

class NLPService:
    def __init__(self):
        self.nlp_module = NLPModule()

    def search_properties(self, query: str):
        return self.nlp_module.predict(query)
