//Se creará una clase que permitirá llevar una gestión completa de usuarios que deseen acceder a dichos eventos.

//Definir clase TicketManager, el cual tendrá un arreglo de eventos que iniciará vacío La clase debe contar con una variable privada “precioBaseDeGanancia”, la cual añadirá un costo adicional al precio de cada evento. Debe contar con el método “getEventos” El cual mostrará los eventos guardados. Debe contar con el método “agregarEvento” El cual recibirá los siguientes parámetros: nombre lugar precio (deberá agregarse un 0.15 del valor original) capacidad (50 por defecto) fecha (hoy por defecto) El método deberá crear además el campo id autoincrementable y el campo “participantes” que siempre iniciará con un arreglo vacío.

//Debe contar con un método “agregarUsuario” El cual recibirá: id del evento (debe existir, agregar validaciones) id del usuario El método debe evaluar que el evento exista y que el usuario no haya estado registrado previamente (validación de fecha y capacidad se evitará para no alargar el reto) Si todo está en orden, debe agregar el id del usuario en el arreglo “participantes” de ese evento. Debe contar con un método “ponerEventoEnGira” El cual recibirá: id del evento nueva localidad nueva fecha El método debe copiar el evento existente, con una nueva localidad, nueva fecha, nuevo id y sus participantes vacíos (Usar spread operator para el resto de las propiedades)

class TicketManager {
    #precioBaseGanancia = 0.15;
    constructor () {
        this.eventos = [];
    }
    getEventos = () =>{
        return this.eventos;
    }
    agregarEvento = (nombre,lugar,precio,capacidad=50,fecha=new Date().toLocaleDateString()) => {
        const evento = {
            nombre,
            lugar,
            precio:precio+precio*this.#precioBaseGanancia,
            capacidad,
            fecha,
            participantes:[]
        }
        if(this.eventos.length===0){
            evento.id=1;
        }else{
            evento.id = this.eventos[this.eventos.length-1].id +1;
        }
        this.eventos.push(evento);
    }
    agregarUsuario = (idEvento,idUsuario) =>{
        const eventoIndex= this.eventos.findIndex(e=>e.id===idEvento);
        if(eventoIndex===-1) {
            console.log("Evento no encontrado");
            return;
        }
        const usuarioRegistrado = this.eventos[eventoIndex].participantes.includes(idUsuario);
        if(usuarioRegistrado){
            console.log("Usuario ya registrado");
            return;
        }
        this.eventos[eventoIndex].participantes.push(idUsuario);
    }
    ponerEventoEnGira = (idEvento,nuevaLocalidad,nuevaFecha) =>{
        const eventoIndex = this.eventos.findIndex(e=>e.id===idEvento);
        if(eventoIndex===-1) {
            console.log("Evento no encontrado");
            return;
        }
        const evento = this.eventos[eventoIndex];
        const newEvento = {
            ...evento,
            lugar:nuevaLocalidad,
            fecha:nuevaFecha,
            id:this.eventos[this.eventos.length-1].id+1,
            participantes:[]
        }
        this.eventos.push(newEvento);
    }
}

//Pruebas

const manejadorEventos = new TicketManager();
manejadorEventos.agregarEvento('Evento coder 1','Argentina',200,50);
manejadorEventos.agregarUsuario(1,2);
manejadorEventos.ponerEventoEnGira(1,'Mexico','30/11/2024');
console.log(manejadorEventos.getEventos());