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
    question: 'What do you need designed?',
    placeholder: 'Type your project or select one below...',
    chips: ['Product Design', 'Brand Identity', 'Website Design', 'Mobile App', 'Marketing Materials']
  },
  {
    key: 'whoIsItFor' as keyof ProjectData,
    question: 'Who is it for?',
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
    key: 'email' as keyof ProjectData,
    question: "What's your email?",
    placeholder: 'your@email.com',
    chips: []
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
  { 
    name: "Sustainable fashion e-commerce platform", 
    type: "Website", 
    thumbnail: "🌿",
    color: "bg-green-100"
  },
  { 
    name: "Food delivery mobile application", 
    type: "Product Design", 
    thumbnail: "🍔",
    color: "bg-orange-100"
  },
  { 
    name: "Tech startup visual identity", 
    type: "Brand", 
    thumbnail: "⚡",
    color: "bg-blue-100"
  },
  { 
    name: "Fitness coaching business materials", 
    type: "Brand", 
    thumbnail: "💪",
    color: "bg-purple-100"
  },
  { 
    name: "Real estate marketing suite", 
    type: "Marketing", 
    thumbnail: "🏠",
    color: "bg-gray-100"
  },
  { 
    name: "Artisan coffee roaster branding", 
    type: "Brand", 
    thumbnail: "☕",
    color: "bg-yellow-100"
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
  const [showFAQResult, setShowFAQResult] = useState<{question: string, answer: string} | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleChipClick = (chipText: string) => {
    setCurrentInput(chipText);
    if (!hasStarted) setHasStarted(true);
    
    // Auto-advance after chip selection
    setTimeout(() => {
      const currentKey = questions[currentQuestion].key;
      setProjectData(prev => ({
        ...prev,
        [currentKey]: chipText
      }));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentInput('');
      }
    }, 300);
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

  const resetToHome = () => {
    setCurrentQuestion(0);
    setProjectData({
      whatToCreate: '',
      whoIsItFor: '',
      goal: '',
      feeling: '',
      email: ''
    });
    setCurrentInput('');
    setHasStarted(false);
  };

  if (showFAQResult) {
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6" style={{ fontFamily: 'Geist, system-ui, -apple-system, sans-serif' }}>
        {/* Menu */}
        <div className="fixed top-6 right-6 z-10">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="text-xs font-light uppercase tracking-wide">MENU</span>
            <span className="text-lg font-extralight">—</span>
          </button>
          
          {menuOpen && (
            <div className="absolute top-8 right-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 min-w-48">
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    handleFAQClick(commonQuestions[0]);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
                >
                  How we work
                </button>
                <button 
                  onClick={() => {
                    handleFAQClick(commonQuestions[4]);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Who we're for
                </button>
                <button 
                  onClick={() => {
                    handleFAQClick(commonQuestions[1]);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
                >
                  How much
                </button>
                <button 
                  onClick={() => {
                    // Scroll to recent projects section
                    document.querySelector('.recent-projects')?.scrollIntoView({ behavior: 'smooth' });
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Past clients
                </button>
                <a 
                  href="https://calendly.com/your-calendly-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-left text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Get in touch
                </a>
              </div>
            </div>
          )}
        </div>

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
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 relative">
                {/* Progress in top right */}
                {hasStarted && (
                  <div className="absolute top-6 right-6 text-right">
                    <div className="flex justify-end gap-1 mb-2">
                      {questions.map((_, index) => (
                        <div
                          key={index}
                          className={`text-lg font-extralight ${
                            index <= currentQuestion ? 'text-gray-800' : 'text-gray-300'
                          }`}
                        >
                          —
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 font-light">
                      {currentQuestion + 1} of {questions.length}
                    </p>
                  </div>
                )}

                {/* Question title inside the box */}
                <h1 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 leading-tight">
                  {questions[currentQuestion].question}
                </h1>

                <input
                  type={questions[currentQuestion].key === 'email' ? 'email' : 'text'}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={questions[currentQuestion].placeholder}
                  className="w-full text-lg p-6 border border-gray-200 rounded-2xl focus:border-gray-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white font-light"
                  autoFocus
                />

                {/* Input Chips for first question */}
                {currentQuestion === 0 && questions[currentQuestion].chips.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {questions[currentQuestion].chips.map((chip, index) => (
                        <button
                          key={index}
                          onClick={() => handleChipClick(chip)}
                          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-full transition-colors font-light border border-gray-200"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQ Suggestion Chips for first question */}
                {currentQuestion === 0 && (
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <p className="text-xs text-gray-400 mb-3 font-light uppercase tracking-wide">Common Questions</p>
                    <div className="flex flex-wrap gap-2">
                      {commonQuestions.slice(0, 3).map((faq, index) => (
                        <button
                          key={index}
                          onClick={() => handleFAQClick(faq)}
                          className="text-sm bg-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-full transition-colors font-light border border-gray-300"
                        >
                          {faq.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-between">
                <div className="flex gap-4">
                  {hasStarted && currentQuestion > 0 && (
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
                  
                  {hasStarted && (
                    <button
                      onClick={resetToHome}
                      className="bg-white hover:bg-gray-100 text-gray-600 font-medium py-4 px-6 rounded-xl border border-gray-200 transition-all"
                    >
                      Home
                    </button>
                  )}
                </div>
                
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
                onClick={resetToHome}
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

          {/* Recent Projects Section - Card Layout */}
          <div className="mt-12 recent-projects">
            <h3 className="text-lg font-light text-gray-600 mb-6 text-center">Recent Projects</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                    setHasStarted(true);
                  }}
                  className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-gray-200 transition-colors group text-left"
                >
                  <div className={`${project.color} rounded-xl h-24 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <span className="text-2xl">{project.thumbnail}</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                      {project.type}
                    </span>
                    <span className="text-sm font-light text-gray-700 leading-tight">
                      {project.name}
                    </span>
                  </div>
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
