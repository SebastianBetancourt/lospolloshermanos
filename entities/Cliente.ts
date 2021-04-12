import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Venta} from "./Venta";

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