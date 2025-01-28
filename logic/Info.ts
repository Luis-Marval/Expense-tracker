

type data = String | number;

export interface ExpenseList{
  id:number,
  description:string,
  date:Date,
  amount:number
}

export type ExpenseFalse = ExpenseList[] | false

export interface Traser {
  add(description:string,amount:number):void
  update(id:number,description?:string,amount?:number):void
  list():Promise<ExpenseFalse> 
  sumary(month?:number):void
  delete(id:number):void
  load():any
}
