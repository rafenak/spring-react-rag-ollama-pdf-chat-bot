-- Ensure the 'llm' database exists and create it if not
DO
$$
BEGIN
    -- Check if the 'llm' database exists
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'llm') THEN
        -- Create the 'llm' database if it doesn't exist
        PERFORM pg_catalog.pg_create_database('llm');
    END IF;
END
$$;

-- Ensure the 'llm' database exists and create it if not
DO
$$
BEGIN
    -- Check if the 'llm' database exists
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'llm') THEN
        -- Create the 'llm' database if it doesn't exist
        PERFORM pg_catalog.pg_create_database('llm');
    END IF;
END
$$;

-- Wait until the 'llm' database is available
-- Using pg_sleep to ensure the database creation has been completed
SELECT pg_sleep(2);

-- Connect to the 'llm' database and install the pgvector extension
\c llm;

-- Install pgvector extension if it's not already installed
DO
$$
BEGIN
    -- Check if pgvector extension is already installed
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pgvector') THEN
        -- Install pgvector extension if it doesn't exist
        CREATE EXTENSION pgvector;
    END IF;
END
$$;


