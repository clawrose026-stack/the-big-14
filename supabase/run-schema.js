const { Client } = require('pg');
const fs = require('fs');

const connectionString = 'postgresql://postgres:JoSA32%greymont@db.ugbzfqldtivqhjkkkban.supabase.co:5432/postgres';

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runSchema() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    const schema = fs.readFileSync('/home/openclaw/.openclaw/workspace/the-big-14/supabase/schema.sql', 'utf8');
    
    await client.query(schema);
    console.log('Schema applied successfully!');
    
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

runSchema();
