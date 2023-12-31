import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SaveStoryDto {
  @IsNotEmpty()
  @ApiProperty({
    default: `Bobby Axelrod's echoing fist thud heightened the suspense in the dimly lit room.
  Shadows danced ominously, and an unseen presence closed in, sending shivers down his spine.
  The chilling silence was disrupted by a low growl, as the temperature plummeted, creating an icy atmosphere.
  Stumbling backward, Bobby felt trapped in a nightmarish labyrinth, desperate to escape the encroaching dread.
  A sinister voice declared his inability to escape the lurking horrors, intensifying the malevolent force that
  had been awakened.`,
  })
  story: string;

  @IsNotEmpty()
  @ApiProperty({ default: `horror` })
  genre: string;

  @IsNotEmpty()
  @ApiProperty({ default: `bobby_axelrod` })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ default: `Bobby's story` })
  title: string;
}
