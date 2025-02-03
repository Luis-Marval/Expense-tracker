import fs from "node:fs/promises"
import { ExpenseList,ExpenseFalse,Traser,Args } from "./Info.js"

export class Expense implements Traser{
  constructor(){}

  async add(description:string,amount:number): Promise<number>{
    let ExpenseList:ExpenseFalse = await this.load()
    let id:number = 0;
    if(ExpenseList){
      id = ExpenseList.slice(-1)[0].id
      ++id
      ExpenseList.push({
        "id":id,"description":description,"date":new Date(),"amount":amount
      })
    }
    else if(!ExpenseList){
      ExpenseList = [{
        "id":id,"description":description,"date":new Date(),"amount":amount
      }]
    }
    const data = JSON.stringify({ ExpenseList }) 
    await fs.writeFile("./Expense.json",data) 
    return id
  }

  async load(): Promise<ExpenseFalse>{
    try {
    const exits = await fs.stat("./Expense.json")
      if(exits){
        const result = await fs.readFile("./Expense.json",{encoding:"utf8"})
        fs.writeFile("./ExpenseBack.json",result) 
        const { ExpenseList }:{ ExpenseList: ExpenseList[] }  = JSON.parse(result)
        return ExpenseList;
      }
    } catch (error:any) {
      if(error.code == "ENOENT"){
        return false
      }
    }
    return false
  }

  async update(id:number,datos:Args):Promise<true | false>{
    let ExpenseList:ExpenseFalse = await this.load()
    if(!ExpenseList){
      return false
    }
    if(datos.description){
      ExpenseList[id-1].description = datos.description
    }    
    if(datos.amount){
      ExpenseList[id-1].amount = datos.amount
    }
    const data = JSON.stringify({ ExpenseList })
    await fs.writeFile("./Expense.json",Buffer.from(data))
    return true

  }

  async list():Promise<ExpenseFalse> {
    try {
      const expenseList = await this.load()
      if(!expenseList){
        return false
      }
      expenseList.map(Element => {
        Element.id++
        Element.date = new Date(Element.date)
        return Element
      });
      return expenseList
    } catch (error) {
      return false
    }
  }

  async summary(month?:number):Promise<number|false>{
    const expenseList = await this.load()
      if(!expenseList){
        return false
      }
    let mount = 0
    expenseList.map((value) => {
      const actual = new Date(value.date).getMonth()+1
      if(typeof month == "undefined"){
        mount += value.amount
      }
      if(typeof month == "number" && month == actual){
        mount += value.amount
      }else{
        mount += 0
      }
    })
    return mount;
  }

  async delete(id:number):Promise<true|false>{
    let ExpenseList:ExpenseFalse = await this.load()
    if(!ExpenseList){
      return false
    }
    ExpenseList.splice(id-1,1)
    console.log(ExpenseList)
    const data = JSON.stringify({ ExpenseList }) 
    await fs.writeFile("./Expense.json",Buffer.from(data))
    return true
  }
}