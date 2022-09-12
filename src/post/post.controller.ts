import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Post as Posts } from '@prisma/client';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOkResponse({ description: 'list all post' })
  async getAllPost(): Promise<Posts[]> {
    return this.postService.posts({});
  }

  @Get('published')
  @ApiOkResponse({ description: 'list all published post' })
  async getAllPublishedPost(): Promise<Posts[]> {
    return await this.postService.posts({
      where: {
        published: true,
      },
    });
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'get post by id' })
  async getPostById(@Param('id') id): Promise<Posts | null> {
    console.log(Number(id));

    return this.postService.post({ id: parseInt(id) });
  }

  @Post('create')
  @ApiOkResponse({ description: 'create new post' })
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    return this.postService.createPost(createPostDTO);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'edit post by id' })
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDTO: UpdatePostDTO,
  ) {
    return this.postService.updatePost({
      where: { id: parseInt(id.toString()) },
      data: updatePostDTO,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'delete post by id' })
  async deletePostById(@Param('id') id: Number) {
    return this.postService.deletePost({
      id: parseInt(id.toString()),
    });
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: number): Promise<Posts> {
    return this.postService.updatePost({
      where: {
        id: parseInt(id.toString()),
      },
      data: {
        published: true,
      },
    });
  }
}
