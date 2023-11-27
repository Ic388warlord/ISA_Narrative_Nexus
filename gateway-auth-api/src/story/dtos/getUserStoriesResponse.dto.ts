import { ApiProperty } from "@nestjs/swagger";

export class GetUserStoriesResponseDto {
  @ApiProperty({
    default: [
      {
        id: 5,
        story:
          "Startled by a sudden shrieking sound, the inhabitants of the distant planet Omega-9 looked to the sky in astonishment. The once serene atmosphere was pierced by a luminous spacecraft descending from the cosmos, leaving trails of unknown energy in its wake. As the alien vessel touched down, the air hummed with anticipation, and the extraterrestrial visitors emerged, heralding a new era of intergalactic contact and mysterious possibilities for the curious denizens of Omega-9.",
        genre: "sci-fi",
        username: "bobby_axelrod",
        updatedat: "2023-11-18T21:11:05.185Z",
        title: "Omega 9 Planet",
      },
      {
        id: 6,
        story:
          "Bobby Axelrod slammed his fist onto the sleek mahogany desk, the impact reverberating through the high-stakes world of finance that he ruled with an iron fist. Determined to maintain his dominance, he orchestrated a series of strategic moves, deploying his financial acumen like a masterful tactician on a modern battlefield. As the tension escalated, Axelrod's relentless pursuit of power ignited a fierce corporate war, leaving adversaries scrambling to decipher his next move. In the heart of the financial district, where fortunes rose and fell like the tides, Bobby Axelrod stood as a formidable force, a titan of action shaping the destiny of Wall Street.",
        genre: "action",
        username: "bobby_axelrod",
        updatedat: "2023-11-18T21:12:21.201Z",
        title: "Billions",
      },
    ],
  })
  stories: string[];
}
