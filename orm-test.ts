import "reflect-metadata";
// Entidades
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany, LessThanOrEqual, JoinTable, ManyToMany, Like, SimpleConsoleLogger} from "typeorm";

/*@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
	
	@Column()
    isActive: boolean;
}*/


//import {Producto} from "./Producto";
//import {Venta} from "./Venta";




@Entity()
export class Producto{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column()
    precio_unitario: number;
    @Column()
    categoria: string;
    @Column()
    porcentaje_iva: number;
    @Column()
    disponible: boolean;
    @OneToMany(() => Producto_venta, Producto_venta => Producto_venta.producto)
    producto_venta: Producto_venta[];
}



@Entity()
export class Producto_venta{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Producto, producto => producto.id)
    producto: Producto;
    @ManyToOne(() => Venta, venta => venta.id)
    venta: Venta[];
    @Column()
    cantidad: number;
}




@Entity()
export class Cliente{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    identificacion: string;
    @Column()
    nombre: string;
    @Column()
    telefono: string;
    @Column() 
    fecha_de_nacimiento: string;
    @Column()
    direccion: string;
    @OneToMany(() => Venta, venta => venta.cliente)
    venta: Venta[];
}



@Entity()
export class Venta{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cliente, cliente => cliente.id)
    cliente: Cliente;

    @Column() 
    fecha_de_venta: string;

    @ManyToMany(type => Producto)
    @JoinTable()
    productos: Producto[];
}





// Conexión
import {createConnection, Connection} from "typeorm";

createConnection({
    type: 'postgres',
    url: 'postgres://fnwprpro:SxXTT1W46Ol7iJddsfzpdTrCeI7043Eu@tuffi.db.elephantsql.com:5432/fnwprpro',
	entities: [Producto, Venta, Cliente, Producto_venta],
    synchronize: true
}).then(async (conexion) => {

    // Queries
    // Insert
    await conexion
        .createQueryBuilder()
 /*       .insert()
        .into(Cliente)
        .values([
            {identificacion: "1106011547",
             nombre: "Daniel Ramirez", 
             telefono: "3158477452", 
             fecha_de_nacimiento: "22-01-2001",
             direccion: "Cra 2, #43-67"},

             {identificacion: "115489878",
             nombre: "Carlos Mol", 
             telefono: "3021547895", 
             fecha_de_nacimiento: "07-01-2002",
             direccion: "Cra 10, #15-89"},


             {identificacion: "1154878988",
             nombre: "Joab Arias", 
             telefono: "3062544125", 
             fecha_de_nacimiento: "15-04-2000",
             direccion: "Cra 7, #68-77"},


             {identificacion: "1123265455",
             nombre: "Eduardo Fernandez", 
             telefono: "3652541848", 
             fecha_de_nacimiento: "14-08-1956",
             direccion: "Cra 9, #23-21"},
        ])
        .execute();


        await conexion
        .createQueryBuilder()
        .insert()
        .into(Producto)
        .values([
            {nombre: "Pollo Apanado", 
             descripcion: "Pollo con una deliciosa y crujiente cobertura espacial, servido con miel", 
             precio_unitario: 5000,
             categoria: "pollo",
             porcentaje_iva: 19,
             disponible: true},

             {nombre: "CocaCola", 
             descripcion: "Bedida artificial con demasiada azucar de Cola  muy refrescante", 
             precio_unitario: 20000,
             categoria: "bebidas",
             porcentaje_iva: 19,
             disponible: true},

             {nombre: "Pollo Asado", 
             descripcion: "Pollo completo asado al carbon con especias especiales", 
             precio_unitario: 15000,
             categoria: "pollo",
             porcentaje_iva: 15,
             disponible: true},

             {nombre: "Papas a la Francesa", 
             descripcion: "Papas fritas con la receta de la casa, crujientes por fuera, suaves por dentro", 
             precio_unitario: 6000,
             categoria: "acompañamientos",
             porcentaje_iva: 19,
             disponible: true}
        ])
        .execute();


        await conexion
        .createQueryBuilder()
        .insert()
        .into(Venta)
        .values([
            {cliente: await conexion.createQueryBuilder().select("cliente")
            .from(Cliente, "cliente").where("cliente.id = 1").getOne(),
            fecha_de_venta: "21-05-2021",
            productos: 
            await conexion.createQueryBuilder().select("producto")
            .from(Producto, "producto").getMany()
            },

            {cliente: await conexion.createQueryBuilder().select("cliente")
            .from(Cliente, "cliente").where("cliente.id = 1").getOne(),
            fecha_de_venta: "20-06-2021",
            productos: 
            [await conexion.createQueryBuilder().select("producto")
            .from(Producto, "producto").where("producto.id = 3").getOneOrFail()]
            },

            {cliente: await conexion.createQueryBuilder().select("cliente")
            .from(Cliente, "cliente").where("cliente.id = 2").getOne(),
            fecha_de_venta: "15-01-2021",
            productos: 
            [await conexion.createQueryBuilder().select("producto")
            .from(Producto, "producto").where("producto.id = 2 or producto.id = 1").getOneOrFail()]
            },


            {cliente: await conexion.createQueryBuilder().select("cliente")
            .from(Cliente, "cliente").where("cliente.id = 3").getOne(),
            fecha_de_venta: "01-02-2021",
            productos: 
            [await conexion.createQueryBuilder().select("producto")
            .from(Producto, "producto").where("producto.id = 2 or producto.id = 3").getOneOrFail()]
            },

            {cliente: await conexion.createQueryBuilder().select("cliente")
            .from(Cliente, "cliente").where("cliente.id = 4").getOne(),
            fecha_de_venta: "13-04-2021",
            productos: 
            [await conexion.createQueryBuilder().select("producto")
            .from(Producto, "producto").where("producto.id = 3").getOneOrFail()]
            },
            
            
        ])
        .execute();


 */
    // Select
    // get all clientes
    //await conexion.createQueryBuilder().delete()
    //.from(Producto, "producto").where("precio_unitario <= 6000").execute();

    const producto : Producto[] = await conexion.createQueryBuilder().select("producto")
    .from(Producto, "producto").where("id = 2").getMany();

    console.log(producto)
    // users es un array de JSONs que representan Users
   
   
    //Filter 
    // get users that are not active (usando managers)
    //const cumplenEnEnero : Cliente[] = await conexion.manager
    //.find(Cliente, { where: { fecha_de_nacimiento: Like("___01%") }});
    //console.log(cumplenEnEnero);
});