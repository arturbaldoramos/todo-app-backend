import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoEntity } from "./entity/todo.entity";

import { UsersEntity } from "./entity/todo.entity";
import { CreateUserDto } from "./dto/create-todo.dto";

@Injectable()
export class TodoService{
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) {}

    async findAll() {
        return await this.todoRepository.find()
    }

    async findOneOrFail(id: string) {
        try{
            return this.todoRepository.findOneOrFail(id)
        }
        catch(error){
            throw new NotFoundException(error.message);
        }
    }

    async create(data: CreateTodoDto) {
        return await this.todoRepository.save(this.todoRepository.create(data))
    }
    
    async   update(id: string, data: UpdateTodoDto) {
        const todo  = await this.findOneOrFail(id);

        this.todoRepository.merge(todo, data);
        return await this.todoRepository.save(todo)
    }

    async deletById(id: string) {
        await this.findOneOrFail(id)

        await this.todoRepository.softDelete(id)
    }
}

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
    ) {}

    async findOneOrFail(id: number) {
        try{
            return this.usersRepository.findOneOrFail(id)
        }
        catch(error){
            throw new NotFoundException(error.message);
        }
    }
    async create(data: CreateUserDto) {
        return await this.usersRepository.save(this.usersRepository.create(data))
    }
    
}