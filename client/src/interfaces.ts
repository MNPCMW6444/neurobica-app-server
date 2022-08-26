export interface User {
  _id: string;
  serialNumber: number;
  activated: boolean;
  deleted: boolean;
  fullname: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
