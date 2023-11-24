import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({


    imports : [
        TypeOrmModule.forRootAsync({

            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : (c:ConfigService) => ({

                type:'postgres',
                host : c.get('POSTGRES_HOST'),
                port : c.get('POSTGRES_PORT'),
                username : c.get('POSTGRES_USER'),
                password : c.get('POSTGRES_PASSWORD'),
                database : c.get('POSTGRES_DB'),

                entities : [    __dirname + "/../**/*.entity{.ts,.js}"],
                autoLoadEntities : true,
                synchronize : true,



            })





        })
    ]





})
export class DblishModule {}
