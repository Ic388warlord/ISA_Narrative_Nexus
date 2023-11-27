import { ApiProperty } from "@nestjs/swagger";

export class DeleteStoryResponseDto {
  @ApiProperty({
    default: "Story has been deleted.",
  })
  message: string;

  @ApiProperty({
    default: {
      id: 6,
      title: "Odyssey",
      story: `In the vast expanse of the cosmic frontier, "Odyssey" unfolds as a captivating science fiction saga that transcends the boundaries of space and time. Fueled by futuristic technologies and interstellar wonders, the narrative weaves a tapestry of exploration, discovery, and the resilience of the human spirit against the backdrop of distant galaxies. As the crew of the interstellar vessel embarks on an odyssey through uncharted realms, they encounter extraterrestrial civilizations, navigate cosmic anomalies, and grapple with the existential questions that arise when confronted with the infinite unknown. "Odyssey" invites readers to embark on a riveting journey, blending the awe-inspiring marvels of science fiction with profound reflections on the human condition in the cosmic tableau.`,
      genre: "sci-fi",
      username: "jane_doe",
      updatedat: "2023-11-26T21:12:21.201Z",
    },
  })
  deletedStory: string;
}
