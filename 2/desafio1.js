//Descripción de la actividad. Dados los objetos indicados:

//const objetos = [ { manzanas:3, peras:2, carne:1, jugos:5, dulces:2 }, { manzanas:1, sandias:1, huevos:6, jugos:1, panes:4 } ]

//Realizar una lista nueva (array) que contenga todos los tipos de productos (no cantidades), consejo: utilizar Object.keys y Array.includes. Mostrar el array por consola. Posteriormente, obtener el total de productos vendidos por todos los objetos (utilizar Object.values)

const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

let newArray = [];
let suma = 0;

objetos.forEach(objeto=>{
    const keys = Object.keys(objeto);
    keys.forEach( key => {

        if(!newArray.includes(key)) newArray.push(key);

    })
    suma += Object.values(objeto).reduce((inicial, actual) => inicial + actual, 0);
})

console.log({ newArray });
console.log({ suma })