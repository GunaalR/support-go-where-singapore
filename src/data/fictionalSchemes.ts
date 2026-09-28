import { Scheme } from '../types';

export const FICTIONAL_SCHEMES: Scheme[] = [
  {
    id: 'family-grocery-grant',
    title: 'Family Grocery Support Grant (FGSG)',
    subtitle: 'Quarterly vouchers for household nutrition and essential groceries',
    agency: 'Community Wellbeing Alliance',
    agencyAbbr: 'CWA',
    topicId: 'financial',
    featured: true,
    actionStatus: 'apply',
    estimatedValue: 800,
    isRecommendedInB: true,
    recommendationReason: 'High financial value ($800) and straightforward 5-minute online submission.',
    summary: 'Provides quarterly supermarket vouchers to support working households with daily food and grocery necessities.',
    description: 'The Family Grocery Support Grant helps moderate-income households manage grocery inflation through four quarterly electronic vouchers spendable across participating community merchants.',
    tags: ['Grocery Support', 'Household Aid', 'Vouchers'],
    eligibility: [
      'Household residing in 1-room to 4-room community apartments',
      'Combined monthly household income within the moderate support tier',
      'At least one dependent child or elderly parent living in the household'
    ],
    benefits: [
      '$200 digital vouchers released every quarter ($800 annual total)',
      'Spendable at participating neighbourhood grocery partners',
      'Immediate confirmation upon form submission'
    ],
    requiredDocs: [
      'Copy of recent residential utility statement (fictional)',
      'Household members identification confirmation'
    ],
    whatYouNeed: [
      'Recent residential utility statement for address verification',
      'Basic list of household members residing together',
      'Preferred mobile number for electronic voucher delivery'
    ],
    disbursement: 'Distributed in four quarterly tranches in January, April, July, and October.'
  },
  {
    id: 'community-utilities-credit',
    title: 'Community Utilities Credit (CUC)',
    subtitle: 'Direct quarterly billing rebates for household energy and water',
    agency: 'Energy & Infrastructure Board (Fictional)',
    agencyAbbr: 'EIB',
    topicId: 'financial',
    featured: true,
    actionStatus: 'automatic',
    estimatedValue: 600,
    summary: 'Direct rebate credited automatically to your residential utility account quarterly.',
    description: 'An automatic credit applied directly to utility billing statements, reducing monthly utility charges for qualified residential dwelling types without requiring any action.',
    tags: ['Utilities', 'Automatic Credit', 'All Households'],
    eligibility: [
      'Automatically assessed based on residential dwelling category',
      'Applies to all eligible 1-room to 5-room residential apartments',
      'No application or documentation needed'
    ],
    benefits: [
      '$150 offset applied directly per quarter ($600 annual total)',
      'Direct deduction on your monthly utility statement'
    ],
    requiredDocs: ['No documentation required — automated enrolment.'],
    whatYouNeed: ['Nothing required — automatic billing deduction.'],
    disbursement: 'Automatically deducted on utility statements each calendar quarter.'
  },
  {
    id: 'caregiver-respite-allowance',
    title: 'Neighbourhood Caregiver Respite Allowance',
    subtitle: 'Financial and respite support for informal family caregivers',
    agency: 'Social Care Network',
    agencyAbbr: 'SCN',
    topicId: 'caregiving',
    actionStatus: 'apply',
    estimatedValue: 950,
    isRecommendedInB: true,
    recommendationReason: 'Provides immediate quarterly relief to reduce out-of-pocket caregiving costs.',
    summary: 'Cash allowance and respite care hours to relieve out-of-pocket costs for family members caring for frail seniors.',
    description: 'Designed to ease the daily strain of informal caregiving by subsidising consumable medical items, transport arrangements, and professional respite care sessions.',
    tags: ['Caregiving', 'Respite Care', 'Quarterly Cash'],
    eligibility: [
      'Care recipient requires assistance with 2 or more daily living tasks',
      'Caregiver lives in the same household or provides regular assistance',
      'Care recipient is not receiving overlapping full-time institutional funding'
    ],
    benefits: [
      '$950 per year cash allowance distributed in two equal disbursements',
      '24 hours of complimentary certified community respite care hours'
    ],
    requiredDocs: [
      'Care assessment summary note from a general practitioner',
      'Caregiver declaration form'
    ],
    whatYouNeed: [
      'Simple GP or clinic assessment summary note',
      'Brief written declaration of primary caregiving role',
      'Bank details for electronic allowance disbursement'
    ],
    disbursement: 'Paid biannually directly to the designated primary caregiver account.'
  },
  {
    id: 'lifelong-skills-grant',
    title: 'Lifelong Learning & Skills Grant',
    subtitle: 'Subsidies for vocational, digital, and workplace competency programmes',
    agency: 'Workforce Development Council',
    agencyAbbr: 'WDC',
    topicId: 'work',
    actionStatus: 'automatic',
    estimatedValue: 500,
    summary: 'Pre-loaded educational credit in your learner portal account for accredited modules.',
    description: 'An automatic credit accessible through the HelpCompass learning directory to encourage personal upskilling, professional reskilling, and digital literacy development.',
    tags: ['Upskilling', 'Skills Credit', 'Automatic'],
    eligibility: [
      'All resident adults aged 25 and above',
      'Automatically deposited into learner digital wallet',
      'Does not expire within the current calendar cycle'
    ],
    benefits: [
      '$500 opening credit balance to offset course enrolment fees',
      'Directly applicable at more than 300 accredited learning institutions'
    ],
    requiredDocs: ['No submission needed — automatically active upon account login.'],
    whatYouNeed: ['Nothing required — credit is already pre-loaded into learner account.'],
    disbursement: 'Instant credit applied at course checkout.'
  },
  {
    id: 'student-development-subsidy',
    title: 'Student Development Resource Subsidy',
    subtitle: 'Educational supplies and enrichment grants for school-going dependants',
    agency: 'Education Resource Trust',
    agencyAbbr: 'ERT',
    topicId: 'education',
    actionStatus: 'apply',
    estimatedValue: 450,
    summary: 'Subsidies for supplementary school textbooks, school uniforms, and digital devices.',
    description: 'A targeted grant to ensure school-going children have full access to study materials, co-curricular gear, and digital learning devices regardless of household finances.',
    tags: ['Education', 'Students', 'Study Grant'],
    eligibility: [
      'Child enrolled in primary or secondary educational institution',
      'Gross monthly household income within eligible tiers',
      'Active school attendance record'
    ],
    benefits: [
      '$450 annual grant per student for educational expenses and transport subsidies',
      'Bookstore vouchers and transport concessions'
    ],
    requiredDocs: [
      'School enrolment confirmation letter',
      'Proof of dependent relationship (fictional child ID)'
    ],
    whatYouNeed: [
      'School enrolment confirmation letter or student handbook copy',
      'Proof of dependent relationship',
      'Direct-credit account details'
    ],
    disbursement: 'Credited directly at the beginning of each academic school term.'
  },
  {
    id: 'senior-mobility-grant',
    title: 'Senior Mobility & Active Living Grant',
    subtitle: 'Point-of-sale subsidies for assistive devices and wellness programmes',
    agency: 'Community Health Partnership',
    agencyAbbr: 'CHP',
    topicId: 'healthcare',
    actionStatus: 'automatic',
    estimatedValue: 350,
    summary: 'Automatic discount applied at participating community healthcare and transport facilities.',
    description: 'Automatically subsidises purchases of walking aids, safety grab-bars, and preventive health screenings at neighbourhood health kiosks.',
    tags: ['Seniors', 'Healthcare', 'Point-of-sale'],
    eligibility: [
      'Resident seniors aged 60 and above',
      'Automatic qualification based on year of birth'
    ],
    benefits: [
      'Up to $350 annual subsidy offset on mobility aids and health checks',
      'Automatic discount applied at checkout'
    ],
    requiredDocs: ['Automatic entitlement verified upon presentation of identity.'],
    whatYouNeed: ['No documents required — automated entitlement.'],
    disbursement: 'Immediate point-of-sale reduction at accredited vendors.'
  }
];
