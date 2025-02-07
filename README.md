# Sentiment Analyzer
A full-stack web application that analyzes the sentiment of user-provided text, delivering insightful sentiment metrics and visualizations. The app utilizes Flask for building the backend API and Next.js for a responsive and dynamic frontend interface. It processes input text, classifies sentiments into positive, negative, or neutral categories, and generates visual representations of the sentiment data to help users easily interpret the results. This project combines modern technologies to create an intuitive and powerful tool for text sentiment analysis.



## Features

- Real-time sentiment analysis of text input
- Sentence-by-sentence breakdown of sentiment
- Visual representation of sentiment metrics using charts
- Polarity and subjectivity scoring
- Color-coded sentiment categories
- Responsive design

## Tech Stack

### Backend
- Flask (Python web framework)
- NLTK (Natural Language Processing)
- TextBlob (Sentiment Analysis)
- Flask-CORS (Cross-Origin Resource Sharing)

### Frontend
- Next.js 14 (React framework)
- Tailwind CSS (Styling)
- Recharts (Data visualization)
- shadcn/ui (UI components)

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn package manager

## Installation

### Backend Setup

1. Create and activate a virtual environment:
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

2. Install backend dependencies:
```bash
pip install flask flask-cors textblob nltk
```

3. Navigate to the backend directory and run the Flask server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory and install dependencies:
```bash
npm install
# or
yarn install
```

2. Install required shadcn/ui components:
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend application will be available at `http://localhost:3000`.

## Project Structure

```
sentiment-analyzer/
├── backend/
│   ├── venv/
│   ├── app.py
│   └── requirements.txt
└── frontend/
    ├── components/
    │   └── SentimentAnalyzer.js
    ├── app/
    │   └── page.js
    └── package.json
```

## API Endpoints

### POST /api/analyze-sentiment

Analyzes the sentiment of provided text.

#### Request Body
```json
{
  "text": "String of text to analyze"
}
```

#### Response Format
```json
{
  "sentence_analysis": [
    {
      "sentence": "Original sentence",
      "polarity": 0.0,
      "subjectivity": 0.0,
      "category": "Positive/Negative/Neutral"
    }
  ],
  "overall_analysis": {
    "polarity": 0.0,
    "subjectivity": 0.0,
    "category": "Positive/Negative/Neutral"
  }
}
```

## Usage

1. Start both the backend and frontend servers
2. Open your browser to `http://localhost:3000`
3. Enter text in the textarea
4. Click "Analyze Sentiment" to see the analysis results
5. View the overall sentiment and per-sentence breakdown
6. Check the chart for sentiment trends across sentences

## Development

### Backend Development

- The Flask application uses CORS to allow cross-origin requests from the frontend
- Sentiment analysis is performed using TextBlob
- NLTK is used for sentence tokenization
- Error handling is implemented for various edge cases

### Frontend Development

- The application uses the App Router in Next.js
- Components are built using shadcn/ui for consistent styling
- Recharts is used for data visualization
- Responsive design is implemented using Tailwind CSS

## Error Handling

The application includes error handling for:
- Empty text submissions
- Invalid JSON requests
- Server connection issues
- NLTK resource availability
- Edge cases in sentiment analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
