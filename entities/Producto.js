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
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
const Producto_venta_1 = require("./Producto_venta");
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
    typeorm_1.OneToMany(() => Producto_venta_1.Producto_venta, Producto_venta => Producto_venta.producto),
    __metadata("design:type", Array)
], Producto.prototype, "producto_venta", void 0);
Producto = __decorate([
    typeorm_1.Entity()
], Producto);
exports.Producto = Producto;
