
export interface Category {
  id: number;
  title: string;
  slug: string;
  icon: string | null;
}

export interface SoftwareSummary {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  short_description: string;
  category: string; // In list view, category is returned as title string
  download_count: number;
  latest_version: string;
  rating: number;
}

export interface DownloadPart {
  part_number: number;
  file_size: string;
  download_url: string;
}

export interface Release {
  id: number;
  version: string;
  platform: string;
  specific_install_guide: string;
  parts: DownloadPart[];
}

export interface Feature {
  text: string;
}

export interface CategoryDetail {
  id: number;
  title: string;
  slug: string;
  icon: string | null;
}

export interface SoftwareDetail {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  description: string;
  installation_guide: string;
  developer: string;
  category: CategoryDetail;
  download_count: number;
  rating: number;
  tags: string[];
  features: Feature[];
  releases: Release[];
  updated_at: string;
}

export type Page = 'home' | 'detail';
