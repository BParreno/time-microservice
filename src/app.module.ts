import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; 
import { AppService } from './app.service';     
import { TimeModule } from './time/time.module';

@Module({
  imports: [TimeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}