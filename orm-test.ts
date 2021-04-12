import "reflect-metadata";
// Entidades
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
	
	@Column()
    isActive: boolean;
}

// Conexión
import {createConnection, Connection} from "typeorm";

createConnection({
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
            { firstName: "Timber", isActive : true }, 
            { firstName: "Phantom",  isActive : false }
        ])
        .execute();

    // Select
    // get all users (usando QueryBuilder)
    const users : User[] = await conexion.createQueryBuilder().select("user").from(User, "user").getMany();

    // users es un array de JSONs que representan Users
    console.log(users);

    //Filter 
    // get users that are not active (usando managers)
    const nonActiveUsers : User[] = await conexion.manager.find(User, { where: { isActive : false }});
    console.log(nonActiveUsers[0].firstName);
});