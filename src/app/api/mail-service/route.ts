import { sendMail } from "../../../service/mailservice";
import { type NextRequest } from "next/server";
import { NextResponse } from 'next/server';
export async function POST(req:Request) {
  try {
    const {subject,email,text}=await req.json();
 console.log(email)
 console.log(text)
       await sendMail(
        subject,email,text

              );
       return NextResponse.json( { message:"SUCCESS" },{status:200})
     
  } catch (error) {
    return NextResponse.json(
      { message:error },
      { status: 500 }
    );
  }
};

