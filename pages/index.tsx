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
  "E-commerce website for sustainable fashion brand",
  "Mobile app for local food delivery service", 
  "Brand identity for tech startup",
  "Landing page for fitness coaching business",
  "Marketing materials for real estate agency",
  "Logo design for artisan coffee roaster",
  "Website redesign for consulting firm",
  "Social media templates for beauty brand"
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
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

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
          {/* Logo and Branding - Always Visible */}
          <div className="text-center mb-8">
            <div className="text-6xl font-light text-gray-900 mb-2">—</div>
            <div className="text-lg font-medium text-gray-700 mb-1">em-dash</div>
            <div className="text-sm text-gray-500">Professional Design Service</div>
          </div>
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

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowQuestions(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!currentInput.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100"
                >
                  {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
                </button>
              </div>
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

          {/* Recent Projects Section - Always Visible */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Recent Projects</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recentProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentInput(project);
                    if (!showQuestions) {
                      setShowQuestions(true);
                    }
                  }}
                  className="text-sm bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 px-3 py-2 rounded-full transition-colors border border-transparent hover:border-indigo-200"
                >
                  {project}
                </button>
              ))}
            </div>
          </div>

          {/* Halaska Method Section */}
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Powered by the Halaska Method™
              </h3>
              <p className="text-sm text-gray-600">
                A design approach built from years of experience by Chris Halaska and the knowledge base from Halaska Studio
              </p>
            </div>
          </div>

          {/* FAQ Section - Always Visible */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Common Questions
            </h2>
            
            <div className="grid gap-3">
              {commonQuestions.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="text-gray-400 text-lg">
                        {selectedFAQ === index ? '−' : '+'}
                      </span>
                    </div>
                  </button>
                  {selectedFAQ === index && (
                    <div className="px-4 pb-4 text-gray-600 border-t border-gray-100">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
