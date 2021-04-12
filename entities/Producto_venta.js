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
exports.Producto_venta = void 0;
const typeorm_1 = require("typeorm");
const Producto_1 = require("./Producto");
const Venta_1 = require("./Venta");
let Producto_venta = class Producto_venta {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Producto_venta.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Producto_1.Producto, producto => producto.id),
    __metadata("design:type", Producto_1.Producto)
], Producto_venta.prototype, "producto", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Venta_1.Venta, venta => venta.id),
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
