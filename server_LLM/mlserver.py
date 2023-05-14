from flask import Flask, request, jsonify
from llama_index import SimpleDirectoryReader, GPTListIndex, readers, GPTSimpleVectorIndex, LLMPredictor, PromptHelper, ServiceContext
import os
os.environ["OPENAI_API_KEY"] = "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"


app = Flask(__name__)

# Load index from disk
index = GPTSimpleVectorIndex.load_from_disk('index.json')

@app.route('/ask', methods=['POST'])
def ask():
    print("Here")
    # Get query from request body
    query = request.json.get('prompt')

    # Generate response using ask_ai() function

    response = ask_ai(query)
    print(response)
    # Return response in JSON format
    return jsonify({'response': response})

def ask_ai(query):
    response = index.query(query)
    return response.response

if __name__ == '__main__':
    app.run(port=7878)
