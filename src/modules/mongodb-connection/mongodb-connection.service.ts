import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongodbConnectionService {

    private mongodbConnection: Connection;

    constructor(private configService: ConfigService) {
        this.createConnectionDB();
    }

    async createConnectionDB() {
        const user = this.configService.get('mongo.user');
        const password = this.configService.get('mongo.password');
        const database = this.configService.get('mongo.database');
        const host = this.configService.get('mongo.host');
        const srv = this.configService.get('mongo.srv');

        let DB_URI = '';

        srv ? DB_URI = `mongodb+srv://${user}:${password}@${host}/${database}?authSource=admin` : console.log('Invalid connection');

        this.mongodbConnection = await createConnection(DB_URI);

        this.mongodbConnection.once('open', () => {
            console.log('Connected to ' + database);
        })
        this.mongodbConnection.once('error', () => {
            console.log('Error connecting to ' + database);
        })
    }

    getConnection(): Connection {
        return this.mongodbConnection;
    }
}
