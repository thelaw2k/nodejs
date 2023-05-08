//Consigna:

//Definiremos la función “mostrarLista”, la cual recibirá un arreglo con elementos como parámetro.

//Si la lista está vacía, devolver un mensaje indicando “Lista vacía”.
//Si la lista cuenta con elementos, mostrarlos 1 por 1 en consola. Finalizar el proceso indicando la longitud de la lista (Utilizar template strings)
//Invocar la función con los casos de prueba.

const mostrarLista = (elementos=[]) =>{
    if(elementos.length===0) return "Lista vacía";
    elementos.forEach(elemento=>console.log(elemento));
    return elementos.length;
}
//Prueba fallida
let resultado1 = mostrarLista();
console.log(resultado1); // Lista vacía

//Prueba válida
let resultado2 = mostrarLista([1,2,3,4])
console.log(resultado2)