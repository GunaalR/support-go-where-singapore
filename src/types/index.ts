export type Language = 'en' | 'zh' | 'ms' | 'ta';

export type Variant = 'A' | 'B';

export type ActionStatus = 'automatic' | 'apply';

export interface Scheme {
  id: string;
  title: string;
  subtitle: string;
  agency: string;
  agencyAbbr: string;
  topicId: string;
  summary: string;
  description: string;
  tags: string[];
  eligibility: string[];
  benefits: string[];
  requiredDocs: string[];
  disbursement: string;
  actionStatus: ActionStatus;
  estimatedValue: number;
  // Variant B specific attributes
  isRecommendedInB?: boolean;
  recommendationReason?: string;
  whatYouNeed: string[];
  featured?: boolean;
}

export interface Topic {
  id: string;
  title: string;
  colorBg: string;
  schemeCount: number;
  description: string;
  iconType: string;
}

export interface BudgetInput {
  age: number;
  householdIncome: 'tier_1' | 'tier_2' | 'tier_3';
  dwellingType: 'small_apartment' | 'medium_apartment' | 'large_apartment';
  hasDependants: boolean;
  numChildren: number;
}

export interface BudgetResult {
  utilitiesSubsidy: number;
  livingCostCredit: number;
  caregiverSupport: number;
  skillsCredit: number;
  totalAnnualBenefit: number;
}

export interface FirstMovePlan {
  schemeId: string;
  timeframe: 'Today' | 'This weekend' | 'Remind me' | null;
  sharedWithSomeone: boolean;
  buddyMessage?: string;
}

export interface DemoHousehold {
  name: string;
  householdLabel: string;
  dwellingType: string;
  estimatedTotal: number;
}
