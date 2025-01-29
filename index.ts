import { Expense } from "./logic/Expense.js";

const hola = new Expense();

const command = process.argv[2];

switch (command) {
  case "add": 
    const amount = parseInt(process.argv[6]);
    if(process.argv[3] == "--description" && typeof process.argv[4] === "string" && process.argv[5] == "--amount" && typeof amount === 'number'){
      const result = await hola.add(process.argv[4], amount);
      console.log(`Expense added successfully (ID: ${result})`)
    }else{
      console.log("Ingrese la descripcion y el monto de la transaccion")
    }
  break;
  case "list":
    const list = await hola.list();
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
        const summary = await hola.summary(month);
        if(!summary === false){
          
          console.log(`# Total expenses for ${String(process.argv[4]).charAt(0).toUpperCase() +String(process.argv[4]).slice(1)}: $${summary}\n`)
        }else{
          console.log('No se encuentra un ninguna transaccion')
        }
      }else{
        console.log('Ingrese un mes valido')
      }
    }else{
      const summary = await hola.summary();
      if(!summary === false){
        console.log(`# Total expenses: $${summary}\n`)
      }else{
        console.log('No se encuentra un ninguna tansaccion')
      }
    }
  break;
  case 'update':
    const id = parseInt(process.argv[3]);
    console.log(process.argv)

  break
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
