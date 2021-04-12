import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Producto} from "./Producto";
import {Venta} from "./Venta";

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
