import { College, Branch, ProjectSuggestion } from '@/types';

export const tamilNaduColleges: College[] = [
  { id: '1', name: 'Anna University, Chennai', shortName: 'AU Chennai', verifiedCount: 18, goal: 20 },
  { id: '2', name: 'PSG College of Technology, Coimbatore', shortName: 'PSG Tech', verifiedCount: 15, goal: 20 },
  { id: '3', name: 'SSN College of Engineering', shortName: 'SSN', verifiedCount: 14, goal: 20 },
  { id: '4', name: 'Sri Sivasubramaniya Nadar College', shortName: 'SSN', verifiedCount: 12, goal: 20 },
  { id: '5', name: 'Thiagarajar College of Engineering, Madurai', shortName: 'TCE Madurai', verifiedCount: 11, goal: 20 },
  { id: '6', name: 'Kongu Engineering College', shortName: 'KEC', verifiedCount: 10, goal: 20 },
  { id: '7', name: 'Kumaraguru College of Technology', shortName: 'KCT', verifiedCount: 9, goal: 20 },
  { id: '8', name: 'Coimbatore Institute of Technology', shortName: 'CIT', verifiedCount: 9, goal: 20 },
  { id: '9', name: 'Velammal Engineering College', shortName: 'VEC', verifiedCount: 8, goal: 20 },
  { id: '10', name: 'SRM Easwari Engineering College', shortName: 'SRM Easwari', verifiedCount: 8, goal: 20 },
  { id: '11', name: 'Rajalakshmi Engineering College', shortName: 'REC', verifiedCount: 7, goal: 20 },
  { id: '12', name: 'Saveetha Engineering College', shortName: 'SEC', verifiedCount: 7, goal: 20 },
  { id: '13', name: 'Sri Sairam Engineering College', shortName: 'Sairam', verifiedCount: 6, goal: 20 },
  { id: '14', name: 'Jeppiaar Engineering College', shortName: 'JEC', verifiedCount: 6, goal: 20 },
  { id: '15', name: 'St. Josephs College of Engineering', shortName: 'SJCE', verifiedCount: 5, goal: 20 },
  { id: '16', name: 'Panimalar Engineering College', shortName: 'PEC', verifiedCount: 5, goal: 20 },
  { id: '17', name: 'Vel Tech Engineering College', shortName: 'Vel Tech', verifiedCount: 4, goal: 20 },
  { id: '18', name: 'Sri Krishna College of Engineering', shortName: 'SKCE', verifiedCount: 4, goal: 20 },
  { id: '19', name: 'Bannari Amman Institute of Technology', shortName: 'BIT', verifiedCount: 4, goal: 20 },
  { id: '20', name: 'Mepco Schlenk Engineering College', shortName: 'Mepco', verifiedCount: 3, goal: 20 },
  { id: '21', name: 'Government College of Technology, Coimbatore', shortName: 'GCT', verifiedCount: 3, goal: 20 },
  { id: '22', name: 'Kamaraj College of Engineering', shortName: 'KCE', verifiedCount: 3, goal: 20 },
  { id: '23', name: 'Sethu Institute of Technology', shortName: 'SIT', verifiedCount: 2, goal: 20 },
  { id: '24', name: 'Francis Xavier Engineering College', shortName: 'FXEC', verifiedCount: 2, goal: 20 },
  { id: '25', name: 'Adhiyamaan College of Engineering', shortName: 'ACE', verifiedCount: 2, goal: 20 },
  { id: '26', name: 'K.S.Rangasamy College of Technology', shortName: 'KSRCT', verifiedCount: 1, goal: 20 },
  { id: '27', name: 'Paavai Engineering College', shortName: 'Paavai', verifiedCount: 1, goal: 20 },
  { id: '28', name: 'Erode Sengunthar Engineering College', shortName: 'ESEC', verifiedCount: 1, goal: 20 },
  { id: '29', name: 'Nandha Engineering College', shortName: 'NEC', verifiedCount: 0, goal: 20 },
  { id: '30', name: 'Other', shortName: 'Other', verifiedCount: 0, goal: 20 },
];

export const branches: Branch[] = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'];

export const branchProjects: Record<Branch, ProjectSuggestion[]> = {
  CSE: [
    {
      title: 'AI Resume Screener',
      description: 'Build an AI chatbot that screens resumes against a job description and provides match scores',
      resumeBullet: 'Built AI-powered resume screening tool using NLP, improving recruiter efficiency by 60%'
    },
    {
      title: 'Code Review Assistant',
      description: 'Create an AI tool that reviews code and suggests improvements',
      resumeBullet: 'Developed automated code review assistant using GPT, reducing review time by 40%'
    },
    {
      title: 'Smart Study Planner',
      description: 'AI-powered study schedule generator based on syllabus and exam dates',
      resumeBullet: 'Created AI study planner serving 500+ students with personalized schedules'
    }
  ],
  IT: [
    {
      title: 'AI Resume Screener',
      description: 'Build an AI chatbot that screens resumes against a job description',
      resumeBullet: 'Built AI-powered resume screening tool using NLP, improving recruiter efficiency by 60%'
    },
    {
      title: 'Automated Testing Bot',
      description: 'Create an AI that generates test cases from requirements',
      resumeBullet: 'Developed AI test case generator, achieving 85% code coverage automatically'
    },
    {
      title: 'IT Helpdesk Chatbot',
      description: 'Build an intelligent chatbot for common IT support queries',
      resumeBullet: 'Created IT support chatbot handling 200+ daily queries with 90% resolution rate'
    }
  ],
  ECE: [
    {
      title: 'Sensor Fault Detector',
      description: 'Build an AI model that reads sensor data and flags anomalies/faults in real-time',
      resumeBullet: 'Developed ML-based sensor fault detection system with 95% accuracy'
    },
    {
      title: 'Signal Classifier',
      description: 'Create an AI that classifies different types of signals',
      resumeBullet: 'Built deep learning signal classifier for 10+ signal types with 92% accuracy'
    },
    {
      title: 'IoT Anomaly Detector',
      description: 'AI system to detect unusual patterns in IoT device data',
      resumeBullet: 'Created IoT anomaly detection reducing false alarms by 70%'
    }
  ],
  EEE: [
    {
      title: 'Load Forecasting Model',
      description: 'Build AI load forecasting for a campus building to optimize energy usage',
      resumeBullet: 'Developed AI load forecasting model reducing energy costs by 25%'
    },
    {
      title: 'Power Quality Analyzer',
      description: 'AI-based power quality monitoring and prediction system',
      resumeBullet: 'Built ML power quality analyzer detecting 8 types of disturbances'
    },
    {
      title: 'Smart Grid Optimizer',
      description: 'AI tool for optimizing power distribution in microgrids',
      resumeBullet: 'Created smart grid optimization tool improving efficiency by 30%'
    }
  ],
  MECH: [
    {
      title: 'Predictive Maintenance AI',
      description: 'Predict machine breakdowns from vibration data using AI',
      resumeBullet: 'Built predictive maintenance model reducing unplanned downtime by 45%'
    },
    {
      title: 'Defect Detection System',
      description: 'AI visual inspection system for manufacturing defects',
      resumeBullet: 'Developed AI defect detection achieving 98% accuracy in quality control'
    },
    {
      title: 'Tool Wear Predictor',
      description: 'Predict CNC tool wear using sensor data and ML',
      resumeBullet: 'Created tool wear prediction system extending tool life by 20%'
    }
  ],
  CIVIL: [
    {
      title: 'Crack Detection AI',
      description: 'Detect cracks in site photos using computer vision and AI',
      resumeBullet: 'Built AI crack detection system analyzing 1000+ site images with 94% accuracy'
    },
    {
      title: 'Construction Progress Tracker',
      description: 'AI-powered progress monitoring from drone/site images',
      resumeBullet: 'Developed automated progress tracking reducing reporting time by 80%'
    },
    {
      title: 'Material Estimator',
      description: 'AI tool for accurate construction material estimation',
      resumeBullet: 'Created ML material estimator improving accuracy by 35%'
    }
  ]
};

export const commonGaps = [
  'No projects with measurable results',
  'Missing keywords for target roles',
  'No AI/ML project experience',
  'Weak action verbs in descriptions',
  'No quantified achievements',
  'Missing technical skills section',
  'No internship or practical experience',
  'Generic objective statement',
  'Poor formatting for ATS parsers',
  'No GitHub/portfolio links'
];

export function generateRefCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function generateJoinCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
