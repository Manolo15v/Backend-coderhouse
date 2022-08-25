class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`${this.nombre} ${this.apellido}`);
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    countMascotas() {
        console.log(this.mascotas.length)
    }

    addBook(nombreLibro, autorLibro) {
        const libro = {
            nombre: nombreLibro,
            autor: autorLibro,
        }

        this.libros.push(libro)
    }

    getBookNames() {
        console.log(this.libros.map(libro => libro.nombre))
    }
}

const usuario1 = new Usuario("Manuel", "Velazco", [{nombre: 'El ingenioso caballero Don Quijote de la Mancha', autor: 'Miguel de Cervantes'}], ['gato'])

usuario1.getFullName()

usuario1.countMascotas()

usuario1.addMascota('perro')

usuario1.countMascotas()

usuario1.getBookNames()

usuario1.addBook('El principito', 'Antoine de Saint-Exupéry')

usuario1.getBookNames()