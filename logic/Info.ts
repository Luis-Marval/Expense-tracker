

type data = String | number;

export interface Args{
  description?:string
  amount?:number
  category?:string
}


export interface ExpenseList{
  id:number,
  description:string,
  date:Date,
  amount:number
}

export type ExpenseFalse = ExpenseList[] | false

export interface Traser {
  add(description:string,amount:number):void
  update(id:number,datos:Args):void
  list():Promise<ExpenseFalse> 
  summary(month?:number):void
  delete(id:number):void
  load():any
}
