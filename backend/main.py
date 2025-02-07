from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
import nltk
from nltk.tokenize import sent_tokenize

app = Flask(__name__)
CORS(app)

def simple_sentence_split(text):
    """Fallback method for sentence tokenization"""
    # Split on common sentence endings
    sentences = []
    current = ""
    
    for char in text:
        current += char
        if char in '.!?' and current.strip():
            sentences.append(current.strip())
            current = ""
    
    if current.strip():  # Add any remaining text
        sentences.append(current.strip())
    
    return sentences or [text]  # Return original text if no sentences found

@app.route('/api/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    # Validate JSON request
    if not request.is_json:
        return jsonify({
            'error': 'Request must be JSON'
        }), 400
    
    data = request.json
    
    # Validate text field
    if 'text' not in data:
        return jsonify({
            'error': 'Missing required field: text'
        }), 400
    
    text = data.get('text', '').strip()
    
    # Check for empty text
    if not text:
        return jsonify({
            'error': 'Text field cannot be empty'
        }), 400
    
    try:
        # Try NLTK tokenization first, fall back to simple split
        try:
            sentences = sent_tokenize(text)
        except:
            sentences = simple_sentence_split(text)
        
        if not sentences:
            return jsonify({
                'error': 'No valid sentences found in text'
            }), 400
        
        # Analyze sentiment for each sentence
        analysis_results = []
        
        for sentence in sentences:
            blob = TextBlob(sentence)
            sentiment = blob.sentiment
            
            # Determine sentiment category
            if sentiment.polarity > 0:
                category = 'Positive'
            elif sentiment.polarity < 0:
                category = 'Negative'
            else:
                category = 'Neutral'
                
            analysis_results.append({
                'sentence': sentence,
                'polarity': round(sentiment.polarity, 2),
                'subjectivity': round(sentiment.subjectivity, 2),
                'category': category
            })
        
        # Calculate overall sentiment
        overall_polarity = sum(result['polarity'] for result in analysis_results) / len(analysis_results)
        overall_subjectivity = sum(result['subjectivity'] for result in analysis_results) / len(analysis_results)
        
        if overall_polarity > 0:
            overall_category = 'Positive'
        elif overall_polarity < 0:
            overall_category = 'Negative'
        else:
            overall_category = 'Neutral'
        
        return jsonify({
            'sentence_analysis': analysis_results,
            'overall_analysis': {
                'polarity': round(overall_polarity, 2),
                'subjectivity': round(overall_subjectivity, 2),
                'category': overall_category
            }
        })
    
    except Exception as e:
        return jsonify({
            'error': f'An error occurred while processing the text: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
