import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  authorId: number;
}
