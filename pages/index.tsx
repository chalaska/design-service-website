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
  },
  {
    name: "Healthcare app user interface",
    type: "Product Design",
    thumbnail: "⚕️",
    color: "bg-red-100"
  },
  {
    name: "Restaurant chain rebrand",
    type: "Brand",
    thumbnail: "🍽️",
    color: "bg-orange-100"
  },
  {
    name: "Financial services dashboard",
    type: "Website",
    thumbnail: "💰",
    color: "bg-green-100"
  },
  {
    name: "Educational platform design",
    type: "Product Design",
    thumbnail: "📚",
    color: "bg-blue-100"
  },
  {
    name: "Music streaming app interface",
    type: "Product Design",
    thumbnail: "🎵",
    color: "bg-purple-100"
  },
  {
    name: "Travel booking website",
    type: "Website",
    thumbnail: "✈️",
    color: "bg-sky-100"
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
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [availableChips, setAvailableChips] = useState<string[]>(questions[0].chips);
  const [isFocused, setIsFocused] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [projectsToShow, setProjectsToShow] = useState(6);
  const [faqModal, setFaqModal] = useState<{question: string, answer: string} | null>(null);

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
        setSelectedChips([]);
        setAvailableChips(questions[currentQuestion + 1]?.chips || []);
        // Enable focus mode when moving to question 2 or beyond
        if (currentQuestion + 1 >= 1) {
          setIsFocused(true);
        }
      }
    }
  };

  const handleChipSelect = (chipText: string) => {
    if (!hasStarted) setHasStarted(true);
    
    // Add chip text to current input, separated by comma if there's existing text
    const newInput = currentInput.trim() 
      ? `${currentInput.trim()}, ${chipText}`
      : chipText;
    
    setCurrentInput(newInput);
    setAvailableChips(prev => prev.filter(chip => chip !== chipText));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const handleFAQClick = (faq: {question: string, answer: string}) => {
    setFaqModal(faq);
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
    setAvailableChips(questions[0].chips);
    setIsFocused(false);
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

      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative" style={{ fontFamily: 'Geist, system-ui, -apple-system, sans-serif' }}>
        {/* FAQ Modal */}
        {faqModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded border border-gray-100 p-8 max-w-md w-full relative">
              <button
                onClick={() => setFaqModal(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pr-8">{faqModal.question}</h3>
              <p className="text-gray-600 font-light leading-relaxed">{faqModal.answer}</p>
            </div>
          </div>
        )}

        {/* Overlay for focus mode */}
        {isFocused && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-5 transition-opacity duration-300"
            onClick={() => setIsFocused(false)}
          />
        )}

        {/* Menu */}
        <div className={`fixed top-6 right-6 z-10 transition-opacity duration-300 ${isFocused ? 'opacity-30' : 'opacity-100'}`}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-2"
          >
            <span className="text-xs font-light uppercase tracking-wide">MENU</span>
            <span className={`text-lg font-extralight transition-transform duration-300 ${menuOpen ? 'rotate-45' : ''}`}>
              {menuOpen ? '—' : '+'}
            </span>
          </button>
          
          {menuOpen && (
            <div className="text-right space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <button 
                onClick={() => {
                  document.querySelector('.halaska-method')?.scrollIntoView({ behavior: 'smooth' });
                  setMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
              >
                How we work
              </button>
              <button 
                onClick={() => {
                  document.querySelector('.pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                  setMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => {
                  document.querySelector('.recent-projects')?.scrollIntoView({ behavior: 'smooth' });
                  setMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
              >
                Past clients
              </button>
              <button 
                onClick={() => {
                  setShowContactForm(true);
                  setTimeout(() => {
                    document.querySelector('.contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                  setMenuOpen(false);
                }}
                className="block w-full text-right text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
              >
                Get in touch
              </button>
            </div>
          )}
        </div>

        <div className={`w-full max-w-2xl transition-opacity duration-300 ${isFocused && !isComplete ? 'relative z-20' : ''}`}>
          
          {/* Logo Section */}
          <div className={`text-center mb-16 transition-opacity duration-300 ${isFocused && !isComplete ? 'opacity-30' : 'opacity-100'}`}>
            <div className="text-8xl font-extralight text-gray-800 mb-4 tracking-wider">—</div>
            <div className="text-3xl font-medium text-gray-700 mb-2 tracking-wide">em-dash</div>
            <div className="text-lg text-gray-500 font-light">Professional Design Service</div>
          </div>

          {!isComplete ? (
            /* Question Flow */
            <div className={`text-center transition-opacity duration-300 ${isFocused ? 'relative z-30' : ''}`}>
              <div className={`bg-white rounded border border-gray-100 p-8 mb-8 relative ${isFocused ? 'shadow-2xl' : ''} transition-shadow duration-300`}>
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

                {/* Question title inside the box - left aligned */}
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 leading-tight text-left">
                  {questions[currentQuestion].question}
                </h1>

                <input
                  type={questions[currentQuestion].key === 'email' ? 'email' : 'text'}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={questions[currentQuestion].placeholder}
                  className="w-full text-lg p-6 border border-gray-200 rounded focus:border-gray-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white font-light"
                  autoFocus
                />

                {/* Available chips for first question */}
                {currentQuestion === 0 && availableChips.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {availableChips.map((chip, index) => (
                        <button
                          key={index}
                          onClick={() => handleChipSelect(chip)}
                          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 px-3 py-2 rounded border border-gray-200 transition-colors font-light"
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
                          onClick={() => setFaqModal(faq)}
                          className="text-sm bg-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-800 px-3 py-2 rounded border border-gray-300 transition-colors font-light"
                        >
                          {faq.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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

                  {hasStarted && currentQuestion > 0 && (
                    <button
                      onClick={() => {
                        setCurrentQuestion(currentQuestion - 1);
                        setCurrentInput('');
                        // Disable focus mode if going back to question 1
                        if (currentQuestion - 1 === 0) {
                          setIsFocused(false);
                        }
                      }}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-light transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                  )}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={!currentInput.trim()}
                  className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded transition-all disabled:hover:scale-100"
                >
                  {currentQuestion === questions.length - 1 ? 'Complete' : 'Continue'}
                </button>
              </div>
            </div>
          ) : (
            /* Project Brief & Actions */
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">
                Your Project Brief
              </h1>

              {/* Project Brief Card */}
              <div className="bg-white rounded border border-gray-100 p-8 mb-8 text-left">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Project Overview</h2>
                
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
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded transition-all"
                >
                  Submit & Pay - $99/month
                </button>
                
                <button
                  onClick={() => {
                    setShowContactForm(true);
                    setTimeout(() => {
                      document.querySelector('.contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="block w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-8 rounded border border-gray-200 transition-all text-center"
                >
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

          {/* FAQ Section - Show after completion */}
          {isComplete && (
            <div className="mt-12 bg-white rounded border border-gray-100 p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Questions & Answers
              </h2>
              
              <div className="grid gap-3">
                {commonQuestions.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => setFaqModal(faq)}
                    className="text-left p-4 hover:bg-gray-50 transition-colors rounded border border-gray-100"
                  >
                    <span className="font-medium text-gray-700">{faq.question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sections with dimming effect */}
          <div className={`transition-opacity duration-300 ${isFocused && !isComplete ? 'opacity-30' : 'opacity-100'}`}>
            {/* Halaska Method */}
            <div className="mt-16 text-center halaska-method">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-lg font-light text-gray-700 mb-2">
                Powered by the Halaska Method™
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                A design approach built from years of experience by Chris Halaska<br />
                and the knowledge base from Halaska Studio
              </p>
              
              {/* How we work details */}
              <div className="text-left space-y-4 border-t border-gray-100 pt-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Discovery & Strategy</h4>
                  <p className="text-sm text-gray-600 font-light">We start with understanding your business, audience, and goals through a comprehensive brief and research phase.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Design & Iteration</h4>
                  <p className="text-sm text-gray-600 font-light">Initial concepts delivered within 3-5 days, followed by unlimited revisions until you're completely satisfied.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Delivery & Support</h4>
                  <p className="text-sm text-gray-600 font-light">Final files delivered with ongoing support included. Most projects completed within 2-3 weeks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-16 text-center pricing-section">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-light text-gray-800 mb-6">
                Simple, Transparent Pricing
              </h3>
              
              <div className="mb-8">
                <div className="text-4xl font-light text-gray-900 mb-2">
                  From $6,000<span className="text-lg text-gray-500">/month</span>
                </div>
                <p className="text-gray-600 font-light">
                  Scale velocity and capacity as your needs grow
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                    Submit Briefs
                  </h4>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    Add your design briefs and tasks directly to our platform. Clear requirements get the best results.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                    Immediate Start
                  </h4>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    Our designers begin work immediately on your submitted tasks. No delays, no waiting lists.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                    Regular Updates
                  </h4>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    Expect progress updates and deliverables at least every 48 hours. Stay informed throughout.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 font-light mb-4">
                  Need higher velocity or additional capacity? We can scale our team to match your timeline and workload.
                </p>
                <button
                  onClick={() => {
                    setShowContactForm(true);
                    setTimeout(() => {
                      document.querySelector('.contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-xl transition-all"
                >
                  Discuss Your Needs
                </button>
              </div>
            </div>
          </div>

          {/* Recent Projects Section - Card Layout */}
          <div className="mt-16 recent-projects">
            <h3 className="text-lg font-light text-gray-600 mb-6 text-center">Recent Projects</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recentProjects.slice(0, projectsToShow).map((project, index) => (
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

            {/* Load More Button */}
            {projectsToShow < recentProjects.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setProjectsToShow(prev => Math.min(prev + 6, recentProjects.length))}
                  className="bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 font-medium py-3 px-6 rounded-xl border border-gray-200 transition-all"
                >
                  Load more projects
                </button>
              </div>
            )}
          </div>

          {/* Contact Form Section */}
          <div className="mt-16 contact-form">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500">
              {!showContactForm ? (
                /* Contact Card */
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-light text-gray-800 mb-4">Ready to work together?</h3>
                  <p className="text-gray-600 font-light mb-6 leading-relaxed">
                    Let's discuss your project and see how we can help bring your vision to life. 
                    We typically respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-8 rounded-xl transition-all"
                  >
                    Get in touch
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-light text-gray-800">Send us a message</h3>
                    <button
                      onClick={() => setShowContactForm(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <form className="space-y-6" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full p-4 border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white font-light"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full p-4 border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white font-light"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Project Type
                      </label>
                      <select name="project_type" required className="w-full p-4 border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white font-light">
                        <option value="">Select project type</option>
                        <option value="Brand Identity">Brand Identity</option>
                        <option value="Website Design">Website Design</option>
                        <option value="Product Design">Product Design</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Marketing Materials">Marketing Materials</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Tell us about your project
                      </label>
                      <textarea
                        name="project_description"
                        rows={4}
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white font-light resize-none"
                        placeholder="Describe your project, goals, and any specific requirements..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Timeline
                      </label>
                      <select name="timeline" required className="w-full p-4 border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white font-light">
                        <option value="">Select timeline</option>
                        <option value="Rush (1-2 weeks)">Rush (1-2 weeks)</option>
                        <option value="Standard (2-4 weeks)">Standard (2-4 weeks)</option>
                        <option value="Flexible (1-2 months)">Flexible (1-2 months)</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>

                    <input type="hidden" name="_subject" value="New Contact Form Submission - em-dash" />
                    <input type="hidden" name="_next" value="https://your-site.vercel.app/?submitted=true" />
                    
                    <button
                      type="submit"
                      className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-8 rounded-xl transition-all"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

            <div className="h-16"></div>
          </div>
        </div>
      </main>
    </>
  );
}
