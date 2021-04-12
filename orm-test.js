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
exports.User = void 0;
require("reflect-metadata");
// Entidades
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
// Conexión
const typeorm_2 = require("typeorm");
typeorm_2.createConnection({
    type: 'postgres',
    url: 'postgres://fnwprpro:SxXTT1W46Ol7iJddsfzpdTrCeI7043Eu@tuffi.db.elephantsql.com:5432/fnwprpro',
    entities: [User],
    synchronize: true
}).then(async (conexion) => {
    // Queries
    // Insert
    await conexion
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
        { firstName: "Timber", isActive: true },
        { firstName: "Phantom", isActive: false }
    ])
        .execute();
    // Select
    // get all users (usando QueryBuilder)
    const users = await conexion.createQueryBuilder().select("user").from(User, "user").getMany();
    // users es un array de JSONs que representan Users
    console.log(users);
    //Filter 
    // get users that are not active (usando managers)
    const nonActiveUsers = await conexion.manager.find(User, { where: { isActive: false } });
    console.log(nonActiveUsers[0].firstName);
});
