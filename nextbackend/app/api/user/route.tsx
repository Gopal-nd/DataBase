import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function GET(req:NextRequest){
return Response.json({
name:"gopal",
email:"gopal@gmail.com"
})
}

export async function POST(req:NextRequest,res:NextResponse){
    const body = await req.json()
    const {name, password }= body;
    // data base call
console.log(name,password)

    const token = req.headers.get('Authorization')

    const para  = req.nextUrl.searchParams.get('name')
    const user = await prisma.user.create({
        data:{
            name,
            password
        }
    })
    const isanyUser = await prisma.user.findUnique({
        where:{
            name
        }
    }
)
    // console.log(para,token)
  return  NextResponse.json({
        msg:'user cerated ',
        user,
        isanyUser
    })
}