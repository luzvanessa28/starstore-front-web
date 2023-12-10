export interface IUser {
  avatar:     string;
  creationAt: Date;
  email:      string;
  id:         number;
  name:       string;
  password:   string;
  role:       Role;
  updatedAt:  Date;
 }

 export enum Role {
  Admin = "admin",
  Customer = "customer",
 }
