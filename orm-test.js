"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = exports.Cliente = exports.Producto_venta = exports.Producto = void 0;
require("reflect-metadata");
// Entidades
const typeorm_1 = require("typeorm");
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
let Producto = class Producto {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Producto.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Producto.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Producto.prototype, "precio_unitario", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Producto.prototype, "categoria", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Producto.prototype, "porcentaje_iva", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Producto.prototype, "disponible", void 0);
__decorate([
    typeorm_1.OneToMany(() => Producto_venta, Producto_venta => Producto_venta.producto),
    __metadata("design:type", Array)
], Producto.prototype, "producto_venta", void 0);
Producto = __decorate([
    typeorm_1.Entity()
], Producto);
exports.Producto = Producto;
let Producto_venta = class Producto_venta {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Producto_venta.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Producto, producto => producto.id),
    __metadata("design:type", Producto)
], Producto_venta.prototype, "producto", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Venta, venta => venta.id),
    __metadata("design:type", Array)
], Producto_venta.prototype, "venta", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Producto_venta.prototype, "cantidad", void 0);
Producto_venta = __decorate([
    typeorm_1.Entity()
], Producto_venta);
exports.Producto_venta = Producto_venta;
let Cliente = class Cliente {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cliente.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cliente.prototype, "identificacion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cliente.prototype, "fecha_de_nacimiento", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cliente.prototype, "direccion", void 0);
__decorate([
    typeorm_1.OneToMany(() => Venta, venta => venta.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "venta", void 0);
Cliente = __decorate([
    typeorm_1.Entity()
], Cliente);
exports.Cliente = Cliente;
let Venta = class Venta {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Venta.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Cliente, cliente => cliente.id),
    __metadata("design:type", Cliente)
], Venta.prototype, "cliente", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Venta.prototype, "fecha_de_venta", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Producto),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Venta.prototype, "productos", void 0);
Venta = __decorate([
    typeorm_1.Entity()
], Venta);
exports.Venta = Venta;
// Conexión
const typeorm_2 = require("typeorm");
typeorm_2.createConnection({
    type: 'postgres',
    url: 'postgres://fnwprpro:SxXTT1W46Ol7iJddsfzpdTrCeI7043Eu@tuffi.db.elephantsql.com:5432/fnwprpro',
    entities: [Producto, Venta, Cliente, Producto_venta],
    synchronize: true
}).then(async (conexion) => {
    // Queries
    // Insert
    await conexion
        .createQueryBuilder();
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
    const producto = await conexion.createQueryBuilder().select("producto")
        .from(Producto, "producto").where("id = 2").getMany();
    console.log(producto);
    // users es un array de JSONs que representan Users
    //Filter 
    // get users that are not active (usando managers)
    //const cumplenEnEnero : Cliente[] = await conexion.manager
    //.find(Cliente, { where: { fecha_de_nacimiento: Like("___01%") }});
    //console.log(cumplenEnEnero);
});
