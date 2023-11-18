import { Global, Module } from "@nestjs/common";
import { StringService } from "./util.service";

@Global()
@Module({ exports: [StringService], providers: [StringService] })
export class UtilModule {}
