export interface Case {
    addressUser?: string,
    amountLost: number,
    caseId: number,
    email: string,
    lastName?:string
    name:string,
    nameEnterprise: string,
    nameState: string,
    stateId: number;
    phone?:number,
    userId: number | number[],
}
