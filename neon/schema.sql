-- Metadatos de fotos futuras; los archivos binarios viven en almacenamiento aparte.
CREATE TABLE IF NOT EXISTS album_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  captured_on DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS album_photos_captured_on_idx
  ON album_photos (captured_on DESC NULLS LAST, created_at DESC);
