import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class EditStoryDto {
  @IsNotEmpty()
  @ApiProperty({ default: 15 })
  storyid: number;

  @IsNotEmpty()
  @ApiProperty({
    default:
      "In the decrepit mansion, the air hung heavy with an unsettling stillness, broken only by the creaking of floorboards beneath an invisible weight. As the moon cast eerie shadows through broken windows, a spectral figure materialized, whispering chilling incantations that echoed through the desolate halls. A flickering candle revealed bloodstains on the walls, remnants of a dark ritual that had unfolded in that very room. The unsettling silence was abruptly shattered by a distant, agonized moan, as if the house itself harbored the tortured souls of a bygone horror.",
  })
  story: string;
}
