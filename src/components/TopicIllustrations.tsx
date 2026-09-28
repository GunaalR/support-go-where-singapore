import React from 'react';

interface TopicIllustrationProps {
  topic: string;
  className?: string;
}

export function TopicIllustration({ topic, className = "w-12 h-12" }: TopicIllustrationProps) {
  switch (topic) {
    case 'caregiving':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#FDF2F2" />
          <path d="M32 44C32 44 20 36 20 27C20 22.58 23.58 19 28 19C30.54 19 32 20.5 32 20.5C32 20.5 33.46 19 36 19C40.42 19 44 22.58 44 27C44 36 32 44 32 44Z" fill="#F87171" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 36C26 39 30 42 32 43" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" />
          <circle cx="27" cy="25" r="2" fill="white" />
        </svg>
      );
    case 'citizenship':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#F0FDFA" />
          <rect x="20" y="20" width="24" height="24" rx="4" fill="#99F6E4" stroke="#0D9488" strokeWidth="2.5" />
          <circle cx="32" cy="30" r="4" fill="#0D9488" />
          <path d="M25 40C25 36.5 28 35 32 35C36 35 39 36.5 39 40" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'counselling':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#FEF3C7" />
          <path d="M22 24H42C44.2 24 46 25.8 46 28V36C46 38.2 44.2 40 42 40H32L24 45V40H22C19.8 40 18 38.2 18 36V28C18 25.8 19.8 24 22 24Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="27" cy="32" r="2" fill="#B45309" />
          <circle cx="32" cy="32" r="2" fill="#B45309" />
          <circle cx="37" cy="32" r="2" fill="#B45309" />
        </svg>
      );
    case 'disability':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#EEF2FF" />
          <circle cx="34" cy="20" r="4" fill="#818CF8" stroke="#4F46E5" strokeWidth="2.2" />
          <path d="M33 26V35H40M33 35L26 44M33 35L29 28H23" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="38" r="8" stroke="#4F46E5" strokeWidth="2.5" />
        </svg>
      );
    case 'education':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#EEF2FF" />
          <path d="M32 18L48 26L32 34L16 26L32 18Z" fill="#C7D2FE" stroke="#4F46E5" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M22 29V39C22 41.5 26.5 44 32 44C37.5 44 42 41.5 42 39V29" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M48 26V37" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="48" cy="38" r="2" fill="#4338CA" />
        </svg>
      );
    case 'family':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#EFF6FF" />
          <circle cx="25" cy="24" r="5" fill="#93C5FD" stroke="#2563EB" strokeWidth="2.2" />
          <circle cx="39" cy="27" r="4.5" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2.2" />
          <path d="M17 44C17 38.5 20.5 34 26 34C28.2 34 30.1 34.8 31.5 36.2" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M33 44C33 39.5 36 36 40 36C44 36 47 39.5 47 44" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="35" r="3" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
          <path d="M28 44C28 41.5 30 40 32 40C34 40 36 41.5 36 44" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'financial':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#FEFCE8" />
          <rect x="18" y="24" width="28" height="20" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="32" cy="34" r="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <path d="M24 24V20C24 17.8 25.8 16 28 16H36C38.2 16 40 17.8 40 20V24" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="32" y1="32" x2="32" y2="36" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'healthcare':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#F0FDF4" />
          <rect x="27" y="19" width="10" height="26" rx="2" fill="#86EFAC" stroke="#16A34A" strokeWidth="2.5" />
          <rect x="19" y="27" width="26" height="10" rx="2" fill="#86EFAC" stroke="#16A34A" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="2" fill="white" />
        </svg>
      );
    case 'housing':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#FFF7ED" />
          <path d="M19 28L32 18L45 28V44H19V28Z" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="28" y="34" width="8" height="10" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2" />
          <path d="M39 21V17H43V24" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'mentalhealth':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#FDF4FF" />
          <path d="M32 19C24 19 19 24 19 31C19 36 22 39 25 41V45H39V41C42 39 45 36 45 31C45 24 40 19 32 19Z" fill="#F0ABFC" stroke="#C026D3" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M28 30C28 28 30 26 32 26C34 26 36 28 36 30" stroke="#86198F" strokeWidth="2" strokeLinecap="round" />
          <circle cx="27" cy="33" r="1.5" fill="#86198F" />
          <circle cx="37" cy="33" r="1.5" fill="#86198F" />
        </svg>
      );
    case 'retirement':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#FAF5FF" />
          <path d="M20 44C20 44 22 36 29 36C36 36 38 44 38 44" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="29" cy="27" r="5" fill="#E9D5FF" stroke="#9333EA" strokeWidth="2.5" />
          <path d="M38 22C42 22 45 25 45 29C45 32 43 35 40 36" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 44C43 41 45 38 48 38" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="44" x2="48" y2="44" stroke="#7E22CE" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'work':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#F0FDFA" />
          <rect x="18" y="24" width="28" height="20" rx="3" fill="#99F6E4" stroke="#0D9488" strokeWidth="2.5" />
          <path d="M26 24V20C26 18.3 27.3 17 29 17H35C36.7 17 38 18.3 38 20V24" stroke="#0D9488" strokeWidth="2.5" />
          <line x1="18" y1="33" x2="46" y2="33" stroke="#0D9488" strokeWidth="2" />
          <rect x="30" y="31" width="4" height="4" rx="1" fill="#115E59" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#F3F4F6" />
          <circle cx="32" cy="32" r="14" stroke="#4B5563" strokeWidth="2.5" />
          <path d="M32 24V32L38 36" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}
