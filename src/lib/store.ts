'use client';

import { Registration, College, ATSResult, Branch } from '@/types';
import { tamilNaduColleges, branchProjects, commonGaps, generateRefCode } from './mockData';

// In-memory store (simulating backend)
let registrations: Registration[] = [];
let colleges: College[] = [...tamilNaduColleges];

export function getColleges(): College[] {
  return [...colleges].sort((a, b) => b.verifiedCount - a.verifiedCount);
}

export function getCollegeById(id: string): College | undefined {
  return colleges.find(c => c.id === id);
}

export function getCollegeByName(name: string): College | undefined {
  return colleges.find(c => c.name === name);
}

export function getCollegeRank(collegeName: string): number {
  const sorted = getColleges();
  const index = sorted.findIndex(c => c.name === collegeName);
  return index + 1;
}

export function incrementCollegeCount(collegeName: string): void {
  const college = colleges.find(c => c.name === collegeName);
  if (college) {
    college.verifiedCount += 1;
  }
}

export function addRegistration(reg: Omit<Registration, 'id' | 'studentCode' | 'createdAt'>): Registration {
  const newReg: Registration = {
    ...reg,
    id: `REG${Date.now()}`,
    studentCode: generateRefCode(),
    createdAt: new Date()
  };
  registrations.push(newReg);
  return newReg;
}

export function getRegistrationByPhone(phone: string): Registration | undefined {
  return registrations.find(r => r.phone === phone);
}

export function getRegistrationByCode(code: string): Registration | undefined {
  return registrations.find(r => r.studentCode === code);
}

export function verifyRegistration(phone: string): boolean {
  const reg = registrations.find(r => r.phone === phone);
  if (reg && !reg.verified) {
    reg.verified = true;
    incrementCollegeCount(reg.college);
    return true;
  }
  return false;
}

export function getTotalVerified(): number {
  return colleges.reduce((sum, c) => sum + c.verifiedCount, 0);
}

export function getRegistrationsByRef(refCode: string): Registration[] {
  return registrations.filter(r => r.refCode === refCode);
}

// Mock ATS Scoring
export function mockATSScore(file?: File): ATSResult {
  // Simulate processing delay would happen in real implementation
  const score = Math.floor(Math.random() * 35) + 45; // 45-80 range

  // Pick 3 random gaps
  const shuffledGaps = [...commonGaps].sort(() => Math.random() - 0.5);
  const gaps = shuffledGaps.slice(0, 3);

  // Mock extracted data (in real impl, would parse PDF)
  const mockNames = ['Rahul Kumar', 'Priya Sharma', 'Arun Selvam', 'Divya Krishnan'];
  const mockBranches: Branch[] = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'];

  const extractedBranch = mockBranches[Math.floor(Math.random() * mockBranches.length)];
  const projects = branchProjects[extractedBranch];

  return {
    score,
    gaps,
    projects,
    extractedName: file ? mockNames[Math.floor(Math.random() * mockNames.length)] : undefined,
    extractedCollege: file ? tamilNaduColleges[Math.floor(Math.random() * 10)].name : undefined,
    extractedBranch: file ? extractedBranch : undefined
  };
}

export function getProjectsForBranch(branch: Branch): typeof branchProjects['CSE'] {
  return branchProjects[branch];
}

// Representative stats
export function getRepStats(refCode: string) {
  const referrals = registrations.filter(r => r.refCode === refCode);
  const verified = referrals.filter(r => r.verified).length;

  let tier: 'bronze' | 'silver' | 'gold' | 'platinum' = 'bronze';
  if (verified >= 50) tier = 'platinum';
  else if (verified >= 25) tier = 'gold';
  else if (verified >= 10) tier = 'silver';

  return {
    total: referrals.length,
    verified,
    tier,
    nextTierAt: tier === 'bronze' ? 10 : tier === 'silver' ? 25 : tier === 'gold' ? 50 : null,
    reward: tier === 'bronze' ? null : tier === 'silver' ? '₹25 + Certificate' : tier === 'gold' ? 'LinkedIn Recommendation' : 'Top Rep Feature'
  };
}

// Session storage helpers for client-side state
export function saveToSession(key: string, data: unknown): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}

export function getFromSession<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
}
