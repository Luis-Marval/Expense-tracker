const expense = "Nombre:\nnpm run Expense <command> -- aplicacion para manejar los gastos\n\nSinopsis:\n<command>\n  add    Agrega un nuevo gasto\n  list    Muestra la lista de todos los gatos\n  summary Muestra un resumen de todos los gastos\n  update  Actualiza un gasto\n  delete  Elimina un gasto\n\nConsulta npm run Expense-help <command> para leer sobre los subcomando\n"

const add = "Nombre:\n Expense add - Agrega un nuevo gasto\n\nSinopsis:\n Expense add --description --amount\n\nOpciones: \n --description \n   descripcion de gasto agregado \n --amount\n   coste del gasto agregado\n"

const list = "Nombre:\n Expense list - Muestra la lista de todos los gatos\n"

const summary = "Nombre:\n Expense summary - Muestra un resumen de todos los gastos\n\nSinopsis:\n Expense summary [--mouth]\n\nOpciones: \n --mouth \n   muestra el total de gastos de un mes especifico\n"

const update = "Nombre:\n Expense update - Actualiza un gasto, pudiendo actualzar la descripcion o el costo\n\nSinopsis:\n Expense summary id --description --amount\n\nOpciones:\n  id\n  El id del gasto a actualizar \n --description \n   descripcion de gasto actualizado \n --amount\n   coste del gasto actualizado\n"

const del = "Nombre:\n Expense delete - elimina un gasto\n\nSinopsis:\n Expense delete id\n\nOpciones:\n  id\n  El id del gasto a eliminar\n"


export function help(command?:string){
  switch(command){
    case undefined: return expense
    case "add": return add
    case "update": return update
    case "summary": return summary
    case "list": return list
    case "delete": return del
    default: return "el comando ingresado no existe\n"
  }
}