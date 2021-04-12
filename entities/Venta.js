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
exports.Venta = void 0;
const typeorm_1 = require("typeorm");
const Producto_1 = require("./Producto");
const Cliente_1 = require("./Cliente");
let Venta = class Venta {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Venta.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Cliente_1.Cliente, cliente => cliente.id),
    __metadata("design:type", Cliente_1.Cliente)
], Venta.prototype, "cliente", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Venta.prototype, "fecha_de_venta", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Producto_1.Producto),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Venta.prototype, "productos", void 0);
Venta = __decorate([
    typeorm_1.Entity()
], Venta);
exports.Venta = Venta;
