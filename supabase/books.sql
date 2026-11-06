CREATE TABLE IF NOT EXISTS public.books (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
    title text NOT NULL CHECK (char_length(btrim(title)) > 0 AND char_length(title) <= 80),
    author text NOT NULL CHECK (char_length(btrim(author)) > 0 AND char_length(author) <= 60),
    pages numeric NOT NULL CHECK (pages >= 1 AND pages <= 5000 AND pages = floor(pages) AND scale(pages) = 0),
    status text NOT NULL DEFAULT 'To Read' CHECK (status IN ('To Read', 'Reading', 'Finished')),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_books_user_created_at ON public.books (user_id, created_at DESC);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books FORCE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.books FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.books TO authenticated;

DROP POLICY IF EXISTS "books_select_own" ON public.books;
DROP POLICY IF EXISTS "books_insert_own" ON public.books;
DROP POLICY IF EXISTS "books_update_own" ON public.books;
DROP POLICY IF EXISTS "books_delete_own" ON public.books;

CREATE POLICY "books_select_own"
ON public.books FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "books_insert_own"
ON public.books FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "books_update_own"
ON public.books FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL AND user_id = auth.uid())
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "books_delete_own"
ON public.books FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

