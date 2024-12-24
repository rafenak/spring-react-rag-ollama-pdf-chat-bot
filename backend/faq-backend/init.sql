-- Create the 'llm' database (only if it doesn't already exist)
-- This command will be executed only if the database is not already created by PostgreSQL
DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'llm') THEN
        PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE llm');
    END IF;
END
$$;

-- Connect to the 'llm' database
\c llm;

-- Enable the pgvector extension in the 'llm' database
CREATE EXTENSION IF NOT EXISTS pgvector;
