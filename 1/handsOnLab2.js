//Se creará una clase que permitirá llevar cuentas individuales según cada responsable.

//Definir clase Contador La clase se creará con un nombre, representando al responsable del contador. El contador debe inicializarse en 0 Debe existir una variable estática que funcione como contador global de todas las instancias de contador creadas.

//Definir el método getResponsable, el cual debe devolver el responsable de dicho contador. Definir el método contar, el cual debe incrementar, tanto su cuenta individual, como la cuenta global. Definir el método getCuentaIndividual, el cual debe devolver sólo la cuenta individual del contador Definir el método getCuentaGlobal, el cual debe devolver la variable estática con el conteo global. Realizar prueba de individualidad entre las instancias.

class Contador {
    constructor(responsable){
        this.responsable=responsable;
        this.conteo=0;
    }
    static contadorGlobal = 0;
    getResponsable = () =>{
        return this.responsable;
    }
    contar = () =>{
        this.conteo++;
        Contador.contadorGlobal++;
    }
    getCuentaIndividual = () =>{
        return this.conteo;
    }
    getCuentaGlobal = () =>{
        return Contador.contadorGlobal;
    }
}

//Pruebas
const contador1 = new Contador('Mauricio');
contador1.contar();
contador1.contar();
const contador2 = new Contador('Julia');
console.log(contador1.getCuentaIndividual())
console.log(contador2.getCuentaGlobal())