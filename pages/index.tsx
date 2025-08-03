import { useState } from 'react';
import Head from 'next/head';

interface ProjectData {
  whatToCreate: string;
  whoIsItFor: string;
  goal: string;
  feeling: string;
  businessName: string;
  email: string;
}

const questions = [
  {
    key: 'whatToCreate' as keyof ProjectData,
    question: 'What do you need designed?',
    placeholder: 'Type your project or select one below...',
    chips: ['Product Design', 'Brand Identity', 'Website Design', 'Mobile App', 'Marketing Materials']
  },
  {
    key: 'whoIsItFor' as keyof ProjectData,
    question: 'Who is the intended audience?',
    placeholder: 'e.g., Tech startups, local restaurants, fitness enthusiasts...',
    chips: []
  },
  {
    key: 'goal' as keyof ProjectData,
    question: "What's the goal?",
    placeholder: 'e.g., Increase conversions, build brand awareness, improve UX...',
    chips: []
  },
  {
    key: 'feeling' as keyof ProjectData,
    question: 'How do you want it to feel?',
    placeholder: 'e.g., Modern and clean, playful and vibrant, professional and trustworthy...',
    chips: []
  },
  {
    key: 'businessName' as keyof ProjectData,
    question: "What's your business name?",
    placeholder: 'Your business or organization name',
    chips: []
  },
  {
    key: 'email' as keyof ProjectData,
    question: "What's your email?",
    placeholder: 'your@email.com',
    chips: []
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>({
    whatToCreate: '',
    whoIsItFor: '',
    goal: '',
    feeling: '',
    businessName: '',
    email: ''
  });
  const [currentInput, setCurrentInput] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const handleNext = () => {
    if (currentInput.trim()) {
      if (!hasStarted) setHasStarted(true);
      
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

  const resetToHome = () => {
    setCurrentQuestion(0);
    setProjectData({
      whatToCreate: '',
      whoIsItFor: '',
      goal: '',
      feeling: '',
      businessName: '',
      email: ''
    });
    setCurrentInput('');
    setHasStarted(false);
  };

  return (
    <>
      <Head>
        <title>em-dash - Professional Design Service</title>
        <meta name="description" content="Professional design services powered by the Halaska Method" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6" style={{ fontFamily: 'Geist, system-ui, -apple-system, sans-serif' }}>
        <div className="w-full max-w-2xl">
          
          {/* Logo Section */}
          <div className="text-center mb-16">
            <div className="text-8xl font-extralight text-gray-800 mb-4 tracking-wider">—</div>
            <div className="text-3xl font-medium text-gray-700 mb-2 tracking-wide">em-dash</div>
            <div className="text-lg text-gray-500 font-light">Professional Design Service</div>
          </div>

          {!isComplete ? (
            /* Question Flow */
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 leading-tight text-left">
                {questions[currentQuestion].question}
              </h1>

              <div className="bg-white rounded border border-gray-100 p-8 mb-8">
                <input
                  type={questions[currentQuestion].key === 'email' ? 'email' : 'text'}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={questions[currentQuestion].placeholder}
                  className="w-full text-lg p-6 border border-gray-200 rounded focus:border-gray-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white font-light"
                  autoFocus
                />
              </div>

              <div className="flex gap-4 justify-between">
                <div className="flex gap-4 items-center">
                  {hasStarted && (
                    <button
                      onClick={resetToHome}
                      className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 rounded border border-gray-200 transition-all flex items-center justify-center"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </button>
                  )}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={!currentInput.trim()}
                  className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded transition-all"
                >
                  {currentQuestion === questions.length - 1 ? 'Complete' : 'Continue'}
                </button>
              </div>
            </div>
          ) : (
            /* Project Brief */
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">
                Your Project Brief
              </h1>

              <div className="bg-white rounded border border-gray-100 p-8 mb-8 text-left">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Project Overview</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Creating</h3>
                    <p className="text-gray-800 font-medium">{projectData.whatToCreate}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">For</h3>
                    <p className="text-gray-800 font-medium">{projectData.whoIsItFor}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Goal</h3>
                    <p className="text-gray-800 font-medium">{projectData.goal}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Feel</h3>
                    <p className="text-gray-800 font-medium">{projectData.feeling}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Business</h3>
                    <p className="text-gray-800 font-medium">{projectData.businessName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Contact</h3>
                    <p className="text-gray-800 font-medium">{projectData.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded transition-all">
                  Submit & Pay - $99/month
                </button>
                
                <button className="block w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-8 rounded border border-gray-200 transition-all text-center">
                  Get in touch
                </button>
              </div>

              <button
                onClick={resetToHome}
                className="text-gray-400 hover:text-gray-600 font-light transition-colors"
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
