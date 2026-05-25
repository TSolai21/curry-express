-- Create Reviews Table
CREATE TABLE public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  text text NOT NULL,
  author text NOT NULL,
  source text DEFAULT 'Website',
  image text
);

-- Create Offers Table
CREATE TABLE public.offers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  badge text,
  badge_color text,
  subtitle text,
  description text,
  price text,
  original_price text,
  image text,
  col_span integer DEFAULT 1,
  row_span integer DEFAULT 1
);

-- Set Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public reviews are viewable by everyone."
  ON public.reviews FOR SELECT
  USING ( true );

CREATE POLICY "Public offers are viewable by everyone."
  ON public.offers FOR SELECT
  USING ( true );

-- Allow authenticated users to insert, update, and delete
CREATE POLICY "Authenticated users can insert reviews."
  ON public.reviews FOR INSERT
  TO authenticated
  WITH CHECK ( true );

CREATE POLICY "Authenticated users can update reviews."
  ON public.reviews FOR UPDATE
  TO authenticated
  USING ( true );

CREATE POLICY "Authenticated users can delete reviews."
  ON public.reviews FOR DELETE
  TO authenticated
  USING ( true );

CREATE POLICY "Authenticated users can insert offers."
  ON public.offers FOR INSERT
  TO authenticated
  WITH CHECK ( true );

CREATE POLICY "Authenticated users can update offers."
  ON public.offers FOR UPDATE
  TO authenticated
  USING ( true );

CREATE POLICY "Authenticated users can delete offers."
  ON public.offers FOR DELETE
  TO authenticated
  USING ( true );
