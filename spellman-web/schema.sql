CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section VARCHAR(50) NOT NULL,
  key VARCHAR(100),
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  icon VARCHAR(50),
  color VARCHAR(50),
  display_order INTEGER,
  hook_words TEXT,
  background_video_url TEXT,
  video_poster_url TEXT,
  button_text VARCHAR(100),
  secondary_button_text VARCHAR(100),
  stat_title VARCHAR(50),
  stat_description TEXT,
  project_title VARCHAR(255),
  project_description TEXT,
  project_image_url TEXT,
  goal_title VARCHAR(255),
  short_description TEXT,
  long_description TEXT,
  org_name VARCHAR(255),
  address TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  newsletter_button_text VARCHAR(100),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section);
CREATE INDEX IF NOT EXISTS idx_site_content_display_order ON site_content(display_order);
