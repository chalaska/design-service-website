import { useState } from 'react';
import Head from 'next/head';

interface ProjectData {
  whatToCreate: string;
  whoIsItFor: string;
  goal: string;
  feeling: string;
  email: string;
}

const questions = [
  {
    key: 'whatToCreate' as keyof ProjectData,
    question: 'What do you want to create?',
    placeholder: 'e.g., A mobile app, website, brand identity...'
  },
  {
    key: 'whoIsItFor' as keyof ProjectData,
    question: 'Who is it for?',
    placeholder: 'e.g., Tech startups, local restaurants, fitness enthusiasts...'
  },
  {
    key: 'goal' as keyof ProjectData,
    question: "What's the goal?",
    placeholder: 'e.g., Increase conversions, build brand awareness, improve UX...'
  },
  {
    key: 'feeling' as keyof ProjectData,
    question: 'How do you want it to feel?',
    placeholder: 'e.g., Modern and clean, playful and vibrant, professional and trustworthy...'
  },
  {
    key: 'email' as keyof ProjectData,
    question: "What's your email?",
    placeholder: 'your@email.com'
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>({
    whatToCreate: '',
    whoIsItFor: '',
    goal: '',
    feeling: '',
    email: ''
  });
  const [currentInput, setCurrentInput] = useState('');

  const handleNext = () => {
    if (currentInput.trim()) {
      const currentKey = questions[currentQuestion].key;
      setProjectData(prev => ({
        ...prev,
        [currentKey]: currentInput.trim()
      }));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentInput('');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const isComplete = currentQuestion === questions.length - 1 && projectData.email;

const handleSubmitAndPay = () => {
  // Open Stripe payment link in new tab
  window.open('https://buy.stripe.com/00waEY4T36vA4C6daffQI0w', '_blank');
};

  return (
    <>
      <Head>
        <title>Design Service - Let's Create Something Amazing</title>
        <meta name="description" content="Professional design services tailored to your needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {!isComplete ? (
            /* Question Flow */
            <div className="text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full mx-1 ${
                        index <= currentQuestion ? 'bg-indigo-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {questions[currentQuestion].question}
              </h1>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                <input
                  type={questions[currentQuestion].key === 'email' ? 'email' : 'text'}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={questions[currentQuestion].placeholder}
                  className="w-full text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              <button
                onClick={handleNext}
                disabled={!currentInput.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100"
              >
                {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
              </button>
            </div>
          ) : (
            /* Project Brief & Actions */
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Your Project Brief
              </h1>

              {/* Project Brief Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">What we're creating:</h3>
                    <p className="text-gray-600">{projectData.whatToCreate}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Target audience:</h3>
                    <p className="text-gray-600">{projectData.whoIsItFor}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Primary goal:</h3>
                    <p className="text-gray-600">{projectData.goal}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Desired feeling:</h3>
                    <p className="text-gray-600">{projectData.feeling}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Contact:</h3>
                    <p className="text-gray-600">{projectData.email}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleSubmitAndPay}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 text-lg"
                >
                  Submit & Pay - Start Monthly Subscription
                </button>
                
                <a
                  href="https://calendly.com/your-calendly-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-4 px-8 rounded-xl border-2 border-indigo-600 transition-all hover:shadow-lg"
                >
                  Book a Call
                </a>
              </div>

              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setProjectData({
                    whatToCreate: '',
                    whoIsItFor: '',
                    goal: '',
                    feeling: '',
                    email: ''
                  });
                  setCurrentInput('');
                }}
                className="mt-6 text-gray-500 hover:text-gray-700 underline"
              >
                Start over
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
