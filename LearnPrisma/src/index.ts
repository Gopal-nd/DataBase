import { PrismaClient } from '@prisma/client'
import { get } from 'http'
import { title } from 'process'
const prisma = new PrismaClient()

async function main() {
    const allUsers = await prisma.user.findMany({})
    console.log(allUsers)
}
interface user{
    username:string
        password:string
        firstName?:string
        lastName?:string
}

async function create(User:user) {
 await prisma.user.create({
    data:{
    username:User.username,
    password:User.password,
    firstName:User.firstName,
    lastName:User.lastName
    }
})
}
const User ={
    username:"rajesh",
    password:"XXXX",
  
}
// create(User)
main()

const todo ={
    title:"Go to Gym",
    description:"Do work out for hours",
    userId:1
}

type todoType = {
    title:string
    description:string
    userId:number
}
async function AddTodo(todo: todoType){
await prisma.todo.create({
    data:{
        title:todo.title,
        description:todo.description,
        userId:todo.userId
    }
})
}

AddTodo(todo)

async function getTodos(userID:number){
    const todos = await prisma.todo.findMany({
        where:{
            userId:userID
        },
        select:{
            title:true,
            description:true,
            user:{
                select:{
                    username:true,
                    password:true
                }
            }
            
        }
    })
    console.log(todos)
}

getTodos(1)