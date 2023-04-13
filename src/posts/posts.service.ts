import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto): string {
    console.log(createPostDto);
    return `This action adds a new post. New post title: ${createPostDto.title}, new post content: ${createPostDto.content}.`;
  }

  findAll(): string {
    return `This action returns all posts`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto): string {
    return `This action updates a #${id} post. New title: ${updatePostDto.title}, New content: ${updatePostDto.content}`;
  }

  remove(id: number): string {
    return `This action removes a #${id} post`;
  }
}
