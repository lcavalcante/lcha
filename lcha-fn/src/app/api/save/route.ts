export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export function GET(request: Request) {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}

export async function POST(request: Request) {
  try {
  await client.connect();
  const db = client.db('cha');
  const name = await request.text()
  const result = await db.collection('people').insertOne({ name });

  if (!result.acknowledged) {
    return new Response("failed" + result , { status: 500 });
  }

  return new Response("Pinged your deployment. You successfully connected to MongoDB!");;

  } catch (e) {
    return new Response("failed" + e, { status: 500 });
  }
  finally {
    client.close();
  }
}
