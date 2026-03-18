#!/bin/bash
# Run this script to set up The Big 14 database schema

# Navigate to your project
cd /home/openclaw/.openclaw/workspace/the-big-14

# Run the schema using Supabase CLI
supabase db reset --linked

# Or if you want to run specific SQL:
supabase sql < supabase/schema.sql

echo "Schema applied successfully!"
