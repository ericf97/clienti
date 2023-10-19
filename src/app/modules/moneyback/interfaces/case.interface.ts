export interface Case {
  country?: string;
  amount: number;
  authId?: number;
  caseId?: number;
  description?: string; 
  dateDeposit: string | Date;
  dateSaved: Date;
  email: string;
  lastName: string;
  depositType: string;
  moneyType: string;
  name: string;
  nameEnterprise: string;
  nameState: string;
  phone?: number | string;
  stateId?: number;
  userId?: number;
}
