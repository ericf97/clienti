export interface Case {
  addressUser?: string;
  amountLost: number;
  caseId?: number;
  email: string;
  lastName?: string;
  name: string;
  nameEnterprise: string;
  nameState: 'initial' | 'pending' | 'resolved' | 'closed';
  stateId: number;
  phone?: number;
  userId?: number | number[];
  deposit?: 'paypal' | 'cash' | 'deposit' | 'bank' | 'crypto';
}
