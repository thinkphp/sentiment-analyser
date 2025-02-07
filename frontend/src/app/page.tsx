'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/analyze-sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
    setLoading(false);
  };

  const getSentimentColor = (category) => {
    switch (category) {
      case 'Positive':
        return 'bg-green-100 text-green-800';
      case 'Negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Sentiment Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full p-2 border rounded-md mb-4 min-h-[200px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze sentiment..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            onClick={analyzeSentiment}
            disabled={loading || !text}
          >
            {loading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
        </CardContent>
      </Card>

      {analysis && (
        <>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Overall Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Badge className={getSentimentColor(analysis.overall_analysis.category)}>
                  {analysis.overall_analysis.category}
                </Badge>
                <span>Polarity: {analysis.overall_analysis.polarity}</span>
                <span>Subjectivity: {analysis.overall_analysis.subjectivity}</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer>
                  <LineChart
                    data={analysis.sentence_analysis.map((item, index) => ({
                      name: `Sentence ${index + 1}`,
                      polarity: item.polarity,
                      subjectivity: item.subjectivity,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="polarity" stroke="#3b82f6" name="Polarity" />
                    <Line type="monotone" dataKey="subjectivity" stroke="#10b981" name="Subjectivity" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sentence Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.sentence_analysis.map((item, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <p className="mb-2">{item.sentence}</p>
                  <div className="flex gap-4">
                    <Badge className={getSentimentColor(item.category)}>
                      {item.category}
                    </Badge>
                    <span>Polarity: {item.polarity}</span>
                    <span>Subjectivity: {item.subjectivity}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SentimentAnalyzer;
