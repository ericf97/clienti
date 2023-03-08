export interface Case {
  addressUser?: string;
  amountLost: number;
  authId?: number;
  caseId?: number;
  dateDeposit: string | Date;
  email: string;
  lastName: string;
  depositType: string;
  moneyType: string;
  name: string;
  nameEnterprise: string;
  nameState: string;
  phone?: number;
  stateId?: number;
  userId?: number;
}
