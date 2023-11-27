import { ApiProperty } from "@nestjs/swagger";

export class SaveStoryResponseDto {
  @ApiProperty({
    default: 45,
  })
  id: number;

  @ApiProperty({ default: `bobby_axelrod` })
  username: string;

  @ApiProperty({ default: `Bobby's story` })
  title: string;

  @ApiProperty({
    default: `Bobby Axelrod's echoing fist thud heightened the suspense in the dimly lit room.
  Shadows danced ominously, and an unseen presence closed in, sending shivers down his spine.
  The chilling silence was disrupted by a low growl, as the temperature plummeted, creating an icy atmosphere.
  Stumbling backward, Bobby felt trapped in a nightmarish labyrinth, desperate to escape the encroaching dread.
  A sinister voice declared his inability to escape the lurking horrors, intensifying the malevolent force that
  had been awakened.`,
  })
  story: string;

  @ApiProperty({ default: `horror` })
  genre: string;

  @ApiProperty({
    default: "2023-11-27T06:59:49.784Z",
  })
  updatetime: string;
}
