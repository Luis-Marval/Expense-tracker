import { Expense } from "./logic/Expense.js";
import { Args } from "./logic/Info.js"
import { help } from "./logic/help.js"

const expense = new Expense();

if(!process.argv[2] || process.argv[2].toLowerCase() == "help"){
  const helpCommand = process.argv[3]
  console.log(help(helpCommand))
  process.exit(0)
}

const command = process.argv[2].toLowerCase();


switch (command) {
  case "add": 
    const amount = parseInt(process.argv[6]);
    if(process.argv[3] == "--description" && typeof process.argv[4] === "string" && process.argv[5] == "--amount" && typeof amount === 'number'){
      const result = await expense.add(process.argv[4], amount);
      console.log(`Expense added successfully (ID: ${result})`)
    }else{
      console.log("Ingrese la descripcion y el monto de la transaccion")
    }
  break;
  case "list":
    const list = await expense.list();
    if(!list === false){
      console.log(`# Id Date Description Amount`)
      list.map(element => {
        console.log(`# ${element.id} ${element.date.getFullYear()}-${element.date.getMonth()+1}-${element.date.getDate()}  ${element.description} ${element.amount}`)
      });
    }else{
      console.log('No se encuentra un ninguna tansaccion')
    }
  break;
  case "summary":
    if(process.argv[3] === "--month"){
      const month = mount(process.argv[4].toLowerCase());
      if(Number.isNaN(mount)){
        console.log('Ingrese un mes valido')
      }
      if( month > 0 &&  month < 13){
        const summary = await expense.summary(month);
        if(!summary === false){
          
          console.log(`# Total expenses for ${String(process.argv[4]).charAt(0).toUpperCase() +String(process.argv[4]).slice(1)}: $${summary}\n`)
        }else{
          console.log('No se encuentra un ninguna transaccion')
        }
      }else{
        console.log('Ingrese un mes valido')
      }
    }else{
      const summary = await expense.summary();
      if(!summary === false){
        console.log(`# Total expenses: $${summary}\n`)
      }else{
        console.log('No se encuentra un ninguna tansaccion')
      }
    }
  break;
  case 'update':
    const updateId = parseInt(process.argv[3]);
    const updateData =  args(process.argv)
    expense.update(updateId,updateData)
  break
  case 'delete':
    const deleteId = parseInt(process.argv[3]);
    console.log(await expense.delete(deleteId))
  break
  default:
    console.error("El comando ingresado no existe, coloque npm run expense help para ver los comandos\n")
}

function mount(month:string):number{
  switch (month) {
    case "january": return 1
    case "febrary": return 2
    case "march": return 3
    case "april": return 4
    case "may": return 5
    case "june": return 6
    case "july": return 7
    case "august": return 8
    case "september": return 9
    case "october": return 10
    case "november": return 11
    case "december": return 12
    default: return NaN
  }
}

function args(args:string[]):Args{
  const arr:Args = {}
  for(const arg of args){
    if(arg === "--description"){
      arr['description'] = (args[args.indexOf(arg)+1]).toString()
    }
    if(arg === "--amount"){
      arr['amount'] = parseInt(args[args.indexOf(arg)+1])
    }
    if(arg === "--category"){
      arr['amount'] = parseInt(args[args.indexOf(arg)+1])
    }
  }
  return arr
}