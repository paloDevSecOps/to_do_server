import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import featureFlagGuard from 'src/guards/feature_flag_guard';

@Controller('posts')
@UseGuards(featureFlagGuard('postFeatureFlagEnabled'))
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): string {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(): string {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): string {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.postsService.remove(+id);
  }
}
