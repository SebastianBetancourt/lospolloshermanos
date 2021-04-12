import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Producto_venta} from "./Producto_venta";

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