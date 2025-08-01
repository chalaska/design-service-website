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

const commonQuestions = [
  {
    question: "What's the process?",
    answer: "We start with a discovery call, create initial concepts within 3-5 days, then refine based on your feedback. Most projects are completed within 2-3 weeks."
  },
  {
    question: "How much does it cost?",
    answer: "$99/month for ongoing design work. Cancel anytime. Includes unlimited revisions and direct access to your designer."
  },
  {
    question: "What's included?",
    answer: "Logo design, brand guidelines, website design, marketing materials, social media assets, and ongoing design support."
  },
  {
    question: "How fast do you work?",
    answer: "Initial concepts within 48-72 hours. Most revisions completed same day. Rush projects available for urgent needs."
  },
  {
    question: "Can I see examples?",
    answer: "Yes! We have a portfolio of 50+ successful projects across various industries. Book a call to see work relevant to your field."
  },
  {
    question: "What if I don't like it?",
    answer: "We offer unlimited revisions until you're 100% happy. If we can't deliver what you need, we'll refund your first month."
  }
];

const recentProjects = [
  { name: "E-commerce website for sustainable fashion brand", icon: "🛍️" },
  { name: "Mobile app for local food delivery service", icon: "📱" },
  { name: "Brand identity for tech startup", icon: "⚡" },
  { name: "Landing page for fitness coaching business", icon: "💪" },
  { name: "Marketing materials for real estate agency", icon: "🏠" },
  { name: "Logo design for artisan coffee roaster", icon: "☕" }
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
  const [showFAQResult, setShowFAQResult] = useState<{question: string, answer: string} | null>(null);

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

  const handleFAQClick = (faq: {question: string, answer: string}) => {
    setShowFAQResult(faq);
  };

  const isComplete = currentQuestion === questions.length - 1 && projectData.email;

  const handleSubmitAndPay = () => {
    window.open('https://buy.stripe.com/00waEY4T36vA4C6daffQI0w', '_blank');
  };

  if (showFAQResult) {
    return (
      <>
        <Head>
          <title>em-dash - Professional Design Service</title>
          <meta name="description" content="Professional design services powered by the Halaska Method" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            
            {/* Logo */}
            <div className="text-center mb-16">
              <div className="text-8xl font-extralight text-gray-800 mb-4 tracking-wider">—</div>
              <div className="text-2xl font-light text-gray-700 mb-2 tracking-wide">em-dash</div>
              <div className="text-gray-500 font-light">Professional Design Service</div>
            </div>

            {/* FAQ Result */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-xl font-medium text-gray-800 mb-4">{showFAQResult.question}</h2>
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <p className="text-gray-700 leading-relaxed">{showFAQResult.answer}</p>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => setShowFAQResult(null)}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-xl transition-all mr-4"
                >
                  Start Project Brief
                </button>
                <button
                  onClick={() => setShowFAQResult(null)}
                  className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Back
                </button>
              </div>
            </div>

            {/* Halaska Method */}
            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-light text-gray-700 mb-2">
                  Powered by the Halaska Method™
                </h3>
                <p className="text-sm text-gray-500 font-light">
                  A design approach built from years of experience by Chris Halaska and the knowledge base from Halaska Studio
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>em-dash - Professional Design Service</title>
        <meta name="description" content="Professional design services powered by the Halaska Method" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          
          {/* Logo Section */}
          <div className="text-center mb-16">
            <div className="text-8xl font-extralight text-gray-800 mb-4 tracking-wider">—</div>
            <div className="text-2xl font-light text-gray-700 mb-2 tracking-wide">em-dash</div>
            <div className="text-gray-500 font-light">Professional Design Service</div>
          </div>

          {!isComplete ? (
            /* Question Flow */
            <div className="text-center">
              <div className="mb-12">
                <div className="flex justify-center mb-6">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full mx-1 ${
                        index <= currentQuestion ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-400 mb-2 font-light">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>

              <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-12 leading-tight">
                {questions[currentQuestion].question}
              </h1>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
                <input
                  type={questions[currentQuestion].key === 'email' ? 'email' : 'text'}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={questions[currentQuestion].placeholder}
                  className="w-full text-lg p-6 border border-gray-200 rounded-2xl focus:border-gray-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white font-light"
                  autoFocus
                />

                {/* Only FAQ Suggestion Chips */}
                {currentQuestion === 0 && (
                  <div className="mt-6">
                    <p className="text-xs text-gray-400 mb-3 font-light uppercase tracking-wide">Common Questions</p>
                    <div className="flex flex-wrap gap-2">
                      {commonQuestions.slice(0, 3).map((faq, index) => (
                        <button
                          key={index}
                          onClick={() => handleFAQClick(faq)}
                          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-full transition-colors font-light"
                        >
                          {faq.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => {
                      setCurrentQuestion(currentQuestion - 1);
                      setCurrentInput('');
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all"
                  >
                    Back
                  </button>
                )}
                
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
                  className="bg-white hover:bg-gray-100 text-gray-600 font-medium py-4 px-6 rounded-xl border border-gray-200 transition-all"
                >
                  Home
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={!currentInput.trim()}
                  className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 px-8 rounded-xl transition-all disabled:hover:scale-100"
                >
                  {currentQuestion === questions.length - 1 ? 'Complete' : 'Continue'}
                </button>
              </div>
            </div>
          ) : (
            /* Project Brief & Actions */
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-12">
                Your Project Brief
              </h1>

              {/* Project Brief Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 text-left">
                <h2 className="text-2xl font-light text-gray-800 mb-8">Project Overview</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Creating</h3>
                    <p className="text-gray-800 font-light">{projectData.whatToCreate}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">For</h3>
                    <p className="text-gray-800 font-light">{projectData.whoIsItFor}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Goal</h3>
                    <p className="text-gray-800 font-light">{projectData.goal}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Feel</h3>
                    <p className="text-gray-800 font-light">{projectData.feeling}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Contact</h3>
                    <p className="text-gray-800 font-light">{projectData.email}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <button
                  onClick={handleSubmitAndPay}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-8 rounded-xl transition-all"
                >
                  Submit & Pay - $99/month
                </button>
                
                <a
                  href="https://calendly.com/your-calendly-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-4 px-8 rounded-xl border border-gray-200 transition-all text-center"
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
                className="text-gray-400 hover:text-gray-600 font-light transition-colors"
              >
                Start over
              </button>
            </div>
          )}

          {/* FAQ Section - Show after completion */}
          {isComplete && (
            <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-light text-gray-700 mb-6">
                Questions & Answers
              </h2>
              
              <div className="grid gap-3">
                {commonQuestions.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(faq)}
                    className="text-left p-4 hover:bg-gray-50 transition-colors rounded-xl border border-gray-100"
                  >
                    <span className="font-light text-gray-700">{faq.question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Halaska Method */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-lg font-light text-gray-700 mb-2">
                Powered by the Halaska Method™
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                A design approach built from years of experience by Chris Halaska<br />
                and the knowledge base from Halaska Studio
              </p>
            </div>
          </div>

          {/* Recent Projects Section - Always at bottom */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-sm font-light text-gray-600">Recent Projects</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recentProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuestion(0);
                    setCurrentInput(project.name);
                    setProjectData({
                      whatToCreate: '',
                      whoIsItFor: '',
                      goal: '',
                      feeling: '',
                      email: ''
                    });
                  }}
                  className="flex items-center gap-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-full transition-colors border border-gray-200"
                >
                  <span className="text-base">{project.icon}</span>
                  <span className="truncate max-w-xs font-light">{project.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-16"></div>
        </div>
      </main>
    </>
  );
}
