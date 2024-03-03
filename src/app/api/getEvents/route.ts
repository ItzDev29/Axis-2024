import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
import {headers} from "next/headers"
export async function GET(req:Request) {
    try {
        const client=new MongoClient(process.env.MONGODB_URI ?? ' ' 
        );
         await client.connect();
     const db=client.db("events");

     const headersList = headers()
     const eventType = headersList.get('event-type')
     const category = headersList.get('category')
     console.log(category);
     if (!eventType) {
        return  NextResponse.json({ message: "Bad Request" }, { status: 400 });
      }
      let events;
      if (eventType == '1') {
        events = await db.collection('events').find({ event_wor: "1",showFlag:true,category:category }).toArray();
      } else if (eventType == '2') {
        events = await db.collection('events').find({ event_wor: "2" ,showFlag:true,category:category}).toArray();
      } else {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
      }
     console.log(events);
      return NextResponse.json({events }, { status: 200 });
    } catch (error) {
     
      return NextResponse.json(
        { message:error },
        { status: 500 }
      );
    }
  }