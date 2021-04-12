import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany} from "typeorm";
import {Producto} from "./Producto";
import {Cliente} from "./Cliente";

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