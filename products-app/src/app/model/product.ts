import { Department } from './department';
export interface Product {
   name:string;
   departments:Department[];
   departmentsIds:string[];
   stock:number;
   price:number;
  _id?:string;
}
