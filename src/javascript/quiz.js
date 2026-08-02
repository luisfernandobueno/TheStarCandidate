
let questions = [
  {
    "id": 1,
    "category": "Behavioral",
    "difficulty": "Easy",
    "question": "Tell me about yourself.",
    "options": [
      "Talk about your personal hobbies for several minutes.",
      "Give a concise summary of your professional background, relevant skills, and current goals.",
      "Read your resume word for word.",
      "Only mention your education."
    ],
    "correctAnswer": 1,
    "explanation": "Interviewers want a brief professional introduction that connects your experience to the role."
  },
  {
    "id": 2,
    "category": "Behavioral",
    "difficulty": "Easy",
    "question": "Why do you want to work here?",
    "options": [
      "Because the salary seems good.",
      "I need any job available.",
      "Because your company's values, culture, and opportunities align with my goals.",
      "My friend told me to apply."
    ],
    "correctAnswer": 2,
    "explanation": "Show that you've researched the company and can connect your motivations to the role."
  },
  {
    "id": 3,
    "category": "STAR Method",
    "difficulty": "Easy",
    "question": "What does the 'T' in the STAR method stand for?",
    "options": [
      "Target",
      "Task",
      "Training",
      "Technique"
    ],
    "correctAnswer": 1,
    "explanation": "STAR stands for Situation, Task, Action, Result."
  },
  {
    "id": 4,
    "category": "STAR Method",
    "difficulty": "Medium",
    "question": "Which section of the STAR method should describe what YOU personally did?",
    "options": [
      "Situation",
      "Task",
      "Action",
      "Result"
    ],
    "correctAnswer": 2,
    "explanation": "The Action section should focus on your personal contribution."
  },
  {
    "id": 5,
    "category": "Behavioral",
    "difficulty": "Medium",
    "question": "When answering 'Tell me about a challenge you faced', what should you avoid?",
    "options": [
      "Explaining the context.",
      "Describing the actions you took.",
      "Blaming coworkers and complaining extensively.",
      "Mentioning the final result."
    ],
    "correctAnswer": 2,
    "explanation": "Focus on professionalism and how you handled the situation."
  },
  {
    "id": 6,
    "category": "Communication",
    "difficulty": "Easy",
    "question": "What is the best way to answer an interview question you don't immediately know?",
    "options": [
      "Stay silent.",
      "Invent an answer.",
      "Take a moment to think and answer honestly.",
      "Change the subject."
    ],
    "correctAnswer": 2,
    "explanation": "Taking a few seconds to organize your thoughts is perfectly acceptable."
  },
  {
    "id": 7,
    "category": "Behavioral",
    "difficulty": "Medium",
    "question": "When discussing a weakness, what is generally the best approach?",
    "options": [
      "Claim you have no weaknesses.",
      "Mention a genuine weakness and explain how you're improving it.",
      "Talk about someone else's weakness.",
      "Choose a weakness unrelated to work and make a joke."
    ],
    "correctAnswer": 1,
    "explanation": "Employers value self-awareness and continuous improvement."
  },
  {
    "id": 8,
    "category": "Professionalism",
    "difficulty": "Easy",
    "question": "Why is it important to ask questions at the end of an interview?",
    "options": [
      "To make the interview longer.",
      "To show interest and learn more about the role and company.",
      "Because the interviewer expects difficult questions.",
      "To negotiate salary immediately."
    ],
    "correctAnswer": 1,
    "explanation": "Thoughtful questions demonstrate preparation and genuine interest."
  },
  {
    "id": 9,
    "category": "STAR Method",
    "difficulty": "Hard",
    "question": "Which answer best demonstrates a strong STAR response?",
    "options": [
      "A long story without a clear ending.",
      "Situation, Task, specific Actions, and measurable Results.",
      "Only explaining what the team accomplished.",
      "Giving opinions without examples."
    ],
    "correctAnswer": 1,
    "explanation": "A complete STAR answer is structured and includes measurable outcomes whenever possible."
  },
  {
    "id": 10,
    "category": "Interview Skills",
    "difficulty": "Medium",
    "question": "What is the primary purpose of behavioral interview questions?",
    "options": [
      "To test your memory.",
      "To understand how you've handled real situations in the past.",
      "To measure typing speed.",
      "To verify your resume formatting."
    ],
    "correctAnswer": 1,
    "explanation": "Past behavior is often used to predict future performance in similar situations."
  },
  {
    "id": 11,
    "category": "Behavioral",
    "difficulty": "Medium",
    "question": "What is the best way to answer 'Why should we hire you?'",
    "options": [
      "Say you're better than every other candidate.",
      "Connect your skills, experience, and attitude to the company's needs.",
      "Say you'll accept any salary.",
      "Tell the interviewer they'll regret not hiring you."
    ],
    "correctAnswer": 1,
    "explanation": "Focus on the value you can bring to the role using specific examples."
  },
  {
    "id": 12,
    "category": "Professionalism",
    "difficulty": "Easy",
    "question": "If you're running late to an interview, what should you do?",
    "options": [
      "Don't show up.",
      "Arrive without saying anything.",
      "Notify the interviewer as soon as possible and apologize.",
      "Blame traffic regardless of the reason."
    ],
    "correctAnswer": 2,
    "explanation": "Communicating promptly demonstrates professionalism and respect."
  },
  {
    "id": 13,
    "category": "Behavioral",
    "difficulty": "Medium",
    "question": "When describing a past achievement, what makes your answer stronger?",
    "options": [
      "Using measurable results whenever possible.",
      "Making the story as long as possible.",
      "Talking mostly about your coworkers.",
      "Skipping the outcome."
    ],
    "correctAnswer": 0,
    "explanation": "Numbers and measurable results make your accomplishments more credible."
  },
  {
    "id": 14,
    "category": "Communication",
    "difficulty": "Easy",
    "question": "What should you do if you don't understand an interview question?",
    "options": [
      "Guess what they meant.",
      "Ask the interviewer to clarify or repeat the question.",
      "Answer a different question instead.",
      "Remain silent."
    ],
    "correctAnswer": 1,
    "explanation": "Clarifying a question is better than answering incorrectly."
  },
  {
    "id": 15,
    "category": "STAR Method",
    "difficulty": "Medium",
    "question": "What should the 'Result' section of a STAR answer emphasize?",
    "options": [
      "What you learned and the outcome of your actions.",
      "The company's history.",
      "Everything that went wrong.",
      "Only what your manager did."
    ],
    "correctAnswer": 0,
    "explanation": "Highlight the positive outcome and what the experience taught you."
  },
  {
    "id": 16,
    "category": "Behavioral",
    "difficulty": "Hard",
    "question": "Why do interviewers ask about a failure you've experienced?",
    "options": [
      "To embarrass you.",
      "To evaluate your resilience, accountability, and ability to learn.",
      "To compare you with previous employees.",
      "To test your memory."
    ],
    "correctAnswer": 1,
    "explanation": "Employers value candidates who can learn from mistakes."
  },
  {
    "id": 17,
    "category": "Professionalism",
    "difficulty": "Easy",
    "question": "What is generally considered appropriate interview attire?",
    "options": [
      "Whatever you wear at home.",
      "Clean, neat clothing appropriate for the company culture.",
      "Sportswear.",
      "Clothes with offensive slogans."
    ],
    "correctAnswer": 1,
    "explanation": "A professional appearance helps create a positive first impression."
  },
  {
    "id": 18,
    "category": "Communication",
    "difficulty": "Medium",
    "question": "Which communication habit creates the best impression during an interview?",
    "options": [
      "Interrupting to show enthusiasm.",
      "Speaking clearly and listening carefully.",
      "Answering every question with one word.",
      "Looking at your phone frequently."
    ],
    "correctAnswer": 1,
    "explanation": "Clear communication and active listening are essential interview skills."
  },
  {
    "id": 19,
    "category": "Behavioral",
    "difficulty": "Medium",
    "question": "How should you respond if you're asked about a conflict with a coworker?",
    "options": [
      "Complain extensively about them.",
      "Describe how you worked toward a respectful resolution.",
      "Say you've never disagreed with anyone.",
      "Refuse to answer."
    ],
    "correctAnswer": 1,
    "explanation": "Focus on conflict resolution rather than assigning blame."
  },
  {
    "id": 20,
    "category": "Interview Skills",
    "difficulty": "Easy",
    "question": "Why is researching the company before an interview important?",
    "options": [
      "It helps you tailor your answers and ask informed questions.",
      "It's not important.",
      "Only to memorize the company's history.",
      "To impress the interviewer with random facts."
    ],
    "correctAnswer": 0,
    "explanation": "Preparation demonstrates genuine interest in the position."
  },
  {
    "id": 21,
    "category": "Behavioral",
    "difficulty": "Hard",
    "question": "Which answer best demonstrates adaptability?",
    "options": [
      "Refusing to change your routine.",
      "Giving an example of successfully adjusting to unexpected changes.",
      "Avoiding new responsibilities.",
      "Waiting for others to solve problems."
    ],
    "correctAnswer": 1,
    "explanation": "Concrete examples of adapting to change are highly valued."
  },
  {
    "id": 22,
    "category": "Teamwork",
    "difficulty": "Medium",
    "question": "When discussing teamwork, what should you emphasize?",
    "options": [
      "Only your personal achievements.",
      "Your contributions while collaborating effectively with others.",
      "That teamwork is unnecessary.",
      "That you prefer to work completely alone."
    ],
    "correctAnswer": 1,
    "explanation": "Show that you can contribute individually while supporting a team."
  },
  {
    "id": 23,
    "category": "Problem Solving",
    "difficulty": "Hard",
    "question": "What do interviewers want to hear when asking about solving a difficult problem?",
    "options": [
      "A structured explanation of how you analyzed and solved it.",
      "That someone else solved it for you.",
      "That you ignored the issue.",
      "Only the final outcome."
    ],
    "correctAnswer": 0,
    "explanation": "Employers want to understand your thought process as well as the result."
  },
  {
    "id": 24,
    "category": "Career Goals",
    "difficulty": "Medium",
    "question": "What is the best approach when discussing your future career goals?",
    "options": [
      "Show goals that align with growth in the company.",
      "Say you have no plans.",
      "Mention that you'll leave as soon as possible.",
      "Avoid answering."
    ],
    "correctAnswer": 0,
    "explanation": "Employers appreciate ambition that aligns with the role and organization."
  },
  {
    "id": 25,
    "category": "Professionalism",
    "difficulty": "Easy",
    "question": "What should you do after an interview?",
    "options": [
      "Forget about it immediately.",
      "Send a polite thank-you message expressing appreciation for the opportunity.",
      "Call the interviewer repeatedly for updates.",
      "Complain about the interview online."
    ],
    "correctAnswer": 1,
    "explanation": "A brief thank-you message reinforces your interest and professionalism."
  },
  {
    "id": 26,
    "category": "Time Management",
    "difficulty": "Easy",
    "question": "How should you answer a behavioral question if you have multiple examples in mind?",
    "options": [
      "Combine all of them into one long story.",
      "Choose the example that best matches the question and explain it clearly.",
      "Tell the interviewer all of them.",
      "Ask the interviewer to choose for you."
    ],
    "correctAnswer": 1,
    "explanation": "A focused, relevant example is more effective than several unrelated stories."
  },
  {
    "id": 27,
    "category": "STAR Method",
    "difficulty": "Medium",
    "question": "What is a common mistake when using the STAR method?",
    "options": [
      "Giving too much background and not enough action.",
      "Describing measurable results.",
      "Explaining your role clearly.",
      "Keeping your answer organized."
    ],
    "correctAnswer": 0,
    "explanation": "Many candidates spend too much time on the Situation and not enough on the Action and Result."
  },
  {
    "id": 28,
    "category": "Communication",
    "difficulty": "Easy",
    "question": "What should you do if you need a few seconds to think before answering?",
    "options": [
      "Answer immediately, even if you're unsure.",
      "Take a brief pause before responding.",
      "Skip the question.",
      "Ask another question instead."
    ],
    "correctAnswer": 1,
    "explanation": "A short pause helps organize your thoughts and shows confidence."
  },
  {
    "id": 29,
    "category": "Professionalism",
    "difficulty": "Medium",
    "question": "If you made a mistake in a previous job, how should you describe it?",
    "options": [
      "Blame your coworkers.",
      "Explain what happened, what you learned, and how you improved.",
      "Pretend it never happened.",
      "Say it wasn't important."
    ],
    "correctAnswer": 1,
    "explanation": "Taking responsibility and showing growth demonstrates maturity."
  },
  {
    "id": 30,
    "category": "Customer Service",
    "difficulty": "Medium",
    "question": "When answering a question about dealing with a difficult customer, what should you emphasize?",
    "options": [
      "Winning the argument.",
      "Remaining calm, listening, and resolving the issue professionally.",
      "Ignoring the customer's concerns.",
      "Telling the customer they were wrong."
    ],
    "correctAnswer": 1,
    "explanation": "Employers value professionalism, empathy, and problem-solving."
  },
  {
    "id": 31,
    "category": "Behavioral",
    "difficulty": "Hard",
    "question": "Why do interviewers ask about your greatest accomplishment?",
    "options": [
      "To understand what you consider meaningful and how you create value.",
      "To compare you with celebrities.",
      "To hear your entire life story.",
      "To test your memory."
    ],
    "correctAnswer": 0,
    "explanation": "Your answer reveals your priorities, impact, and confidence."
  },
  {
    "id": 32,
    "category": "Leadership",
    "difficulty": "Medium",
    "question": "If you've never been a manager, how can you answer leadership questions?",
    "options": [
      "Say leadership only comes with a job title.",
      "Use examples where you took initiative or guided others.",
      "Skip the question.",
      "Invent a leadership story."
    ],
    "correctAnswer": 1,
    "explanation": "Leadership can be demonstrated without formal authority."
  },
  {
    "id": 33,
    "category": "Interview Skills",
    "difficulty": "Easy",
    "question": "What is one benefit of practicing interview answers aloud?",
    "options": [
      "You'll memorize every sentence perfectly.",
      "You'll become more comfortable speaking naturally.",
      "You'll never be asked different questions.",
      "You'll eliminate nervousness completely."
    ],
    "correctAnswer": 1,
    "explanation": "Practice improves confidence and communication."
  },
  {
    "id": 34,
    "category": "Professionalism",
    "difficulty": "Easy",
    "question": "During an interview, your phone should be:",
    "options": [
      "On loud volume.",
      "Turned off or silenced and put away.",
      "Checked occasionally.",
      "On the table in case of messages."
    ],
    "correctAnswer": 1,
    "explanation": "Avoid distractions and show respect for the interviewer's time."
  },
  {
    "id": 35,
    "category": "Behavioral",
    "difficulty": "Medium",
    "question": "What is the best way to discuss a project that didn't achieve the desired outcome?",
    "options": [
      "Focus only on the failure.",
      "Explain the lessons learned and how you applied them later.",
      "Avoid mentioning it.",
      "Blame external circumstances."
    ],
    "correctAnswer": 1,
    "explanation": "Reflection and improvement are often more important than success alone."
  },
  {
    "id": 36,
    "category": "Teamwork",
    "difficulty": "Medium",
    "question": "What quality do employers usually value most in team members?",
    "options": [
      "Refusing feedback.",
      "Collaboration and clear communication.",
      "Always working alone.",
      "Competing with coworkers."
    ],
    "correctAnswer": 1,
    "explanation": "Strong teamwork contributes to better workplace performance."
  },
  {
    "id": 37,
    "category": "Interview Skills",
    "difficulty": "Hard",
    "question": "When should you tailor your interview answers to a specific company?",
    "options": [
      "Only after you're hired.",
      "Throughout the interview whenever relevant.",
      "Never.",
      "Only if asked directly."
    ],
    "correctAnswer": 1,
    "explanation": "Connecting your answers to the company's needs makes them more impactful."
  },
  {
    "id": 38,
    "category": "Professionalism",
    "difficulty": "Medium",
    "question": "If an interviewer challenges one of your answers, what should you do?",
    "options": [
      "Become defensive.",
      "Remain respectful and explain your reasoning calmly.",
      "Argue until they agree.",
      "End the interview."
    ],
    "correctAnswer": 1,
    "explanation": "Professionalism includes handling disagreement respectfully."
  },
  {
    "id": 39,
    "category": "Problem Solving",
    "difficulty": "Hard",
    "question": "A strong problem-solving answer should primarily demonstrate:",
    "options": [
      "Your decision-making process.",
      "How complicated the problem was.",
      "How lucky you were.",
      "How many people helped you."
    ],
    "correctAnswer": 0,
    "explanation": "Interviewers want to understand how you think through challenges."
  },
  {
    "id": 40,
    "category": "Career Development",
    "difficulty": "Easy",
    "question": "How should you answer 'Where do you see yourself in five years?'",
    "options": [
      "Describe realistic professional growth related to the role.",
      "Say you haven't thought about it.",
      "Tell them you'll probably work somewhere else.",
      "Focus only on salary."
    ],
    "correctAnswer": 0,
    "explanation": "Show ambition while aligning your goals with the company's opportunities."
  },
  {
    "id": 41,
    "category": "Communication",
    "difficulty": "Medium",
    "question": "What speaking pace is generally best during an interview?",
    "options": [
      "Very fast to fit in more information.",
      "Clear, natural, and easy to follow.",
      "Extremely slow.",
      "As quickly as possible."
    ],
    "correctAnswer": 1,
    "explanation": "Speaking clearly makes your answers easier to understand."
  },
  {
    "id": 42,
    "category": "Confidence",
    "difficulty": "Easy",
    "question": "What is the difference between confidence and arrogance in an interview?",
    "options": [
      "There is no difference.",
      "Confidence acknowledges strengths while remaining respectful and open to learning.",
      "Arrogance always gets better results.",
      "Confidence means claiming to know everything."
    ],
    "correctAnswer": 1,
    "explanation": "Employers appreciate confidence balanced with humility."
  },
  {
    "id": 43,
    "category": "Behavioral",
    "difficulty": "Hard",
    "question": "Why is it useful to quantify your achievements whenever possible?",
    "options": [
      "It makes your examples more credible and memorable.",
      "It guarantees you'll get the job.",
      "Interviewers only care about numbers.",
      "It makes your answers longer."
    ],
    "correctAnswer": 0,
    "explanation": "Specific results strengthen your credibility."
  },
  {
    "id": 44,
    "category": "Preparation",
    "difficulty": "Easy",
    "question": "Which of the following is an effective way to prepare for an interview?",
    "options": [
      "Research the company and review the job description.",
      "Avoid thinking about possible questions.",
      "Rely entirely on improvisation.",
      "Memorize every answer word-for-word."
    ],
    "correctAnswer": 0,
    "explanation": "Preparation helps you provide relevant, confident answers."
  },
  {
    "id": 45,
    "category": "Behavioral",
    "difficulty": "Medium",
    "question": "When describing a success, who should receive credit?",
    "options": [
      "Only yourself.",
      "Recognize both your contribution and the team's efforts when appropriate.",
      "Only your manager.",
      "No one."
    ],
    "correctAnswer": 1,
    "explanation": "Balancing confidence with teamwork creates a stronger impression."
  },
  {
    "id": 46,
    "category": "Adaptability",
    "difficulty": "Medium",
    "question": "What kind of example best demonstrates adaptability?",
    "options": [
      "Learning a new process quickly after a major change.",
      "Refusing to change your routine.",
      "Avoiding unfamiliar tasks.",
      "Waiting for instructions before every action."
    ],
    "correctAnswer": 0,
    "explanation": "Adaptability is shown through flexibility and willingness to learn."
  },
  {
    "id": 47,
    "category": "Decision Making",
    "difficulty": "Hard",
    "question": "When explaining a difficult decision, what should you highlight?",
    "options": [
      "The reasoning behind your choice and its outcome.",
      "Only the final decision.",
      "How stressful it felt.",
      "Who disagreed with you."
    ],
    "correctAnswer": 0,
    "explanation": "Interviewers want to understand your judgment and reasoning."
  },
  {
    "id": 48,
    "category": "Work Ethic",
    "difficulty": "Easy",
    "question": "What does a strong work ethic usually include?",
    "options": [
      "Reliability, responsibility, and consistent effort.",
      "Working only when supervised.",
      "Avoiding difficult tasks.",
      "Never asking for help."
    ],
    "correctAnswer": 0,
    "explanation": "A strong work ethic combines dependability with commitment."
  },
  {
    "id": 49,
    "category": "Self Awareness",
    "difficulty": "Medium",
    "question": "Why is self-awareness important during an interview?",
    "options": [
      "It helps you discuss your strengths and areas for improvement honestly.",
      "It lets you avoid difficult questions.",
      "It replaces technical skills.",
      "It prevents follow-up questions."
    ],
    "correctAnswer": 0,
    "explanation": "Self-awareness demonstrates maturity and a willingness to grow."
  },
  {
    "id": 50,
    "category": "Interview Skills",
    "difficulty": "Medium",
    "question": "What is the primary purpose of using the STAR method in interviews?",
    "options": [
      "To organize real experiences into clear, structured answers.",
      "To make answers longer.",
      "To memorize interview scripts.",
      "To avoid discussing results."
    ],
    "correctAnswer": 0,
    "explanation": "The STAR method helps candidates provide complete and easy-to-follow examples."
  }
]

export default questions;
