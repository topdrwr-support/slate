/*
  # Create access requests table

  1. New Tables
    - `access_requests`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `company` (text, required)
      - `position` (text, required)
      - `work_email` (text, required, unique)
      - `status` (text, default: 'pending')
      - `created_at` (timestamptz, default: now())
      - `updated_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on `access_requests` table
    - Add policy for admins to read all requests
    - Add policy for public to create requests
*/

CREATE TABLE IF NOT EXISTS access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company text NOT NULL,
  position text NOT NULL,
  work_email text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT status_check CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Enable RLS
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;

-- Allow admins to read all requests
CREATE POLICY "Admins can read all access requests"
  ON access_requests
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Allow admins to update requests
CREATE POLICY "Admins can update access requests"
  ON access_requests
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Allow anyone to create requests
CREATE POLICY "Anyone can create access requests"
  ON access_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_access_requests_updated_at
  BEFORE UPDATE ON access_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();