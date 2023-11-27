import { ApiProperty } from "@nestjs/swagger";

export class GetUserStoryResponseDto {
  @ApiProperty({
    default: {
      id: 6,
      story:
        "Bobby Axelrod slammed his fist onto the sleek mahogany desk, the impact reverberating through the high-stakes world of finance that he ruled with an iron fist. Determined to maintain his dominance, he orchestrated a series of strategic moves, deploying his financial acumen like a masterful tactician on a modern battlefield. As the tension escalated, Axelrod's relentless pursuit of power ignited a fierce corporate war, leaving adversaries scrambling to decipher his next move. In the heart of the financial district, where fortunes rose and fell like the tides, Bobby Axelrod stood as a formidable force, a titan of action shaping the destiny of Wall Street.",
      genre: "action",
      username: "bobby_axelrod",
      updatedat: "2023-11-18T21:12:21.201Z",
      title: "Billions",
    },
  })
  story: string;
}
