"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const allUsers = yield prisma.user.findMany({});
        console.log(allUsers);
    });
}
function create(User) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.create({
            data: {
                username: User.username,
                password: User.password,
                firstName: User.firstName,
                lastName: User.lastName
            }
        });
    });
}
const User = {
    username: "rajesh",
    password: "XXXX",
};
// create(User)
main();
const todo = {
    title: "Go to Gym",
    description: "Do work out for hours",
    userId: 1
};
function AddTodo(todo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.create({
            data: {
                title: todo.title,
                description: todo.description,
                userId: todo.userId
            }
        });
    });
}
AddTodo(todo);
function getTodos(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield prisma.todo.findMany({
            where: {
                userId: userID
            },
            select: {
                title: true,
                description: true,
                user: {
                    select: {
                        username: true,
                        password: true
                    }
                }
            }
        });
        console.log(todos);
    });
}
getTodos(1);
