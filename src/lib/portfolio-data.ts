import { createPublicClient } from "@/lib/supabase";

export interface PortfolioItem {
  id: string;
  slug: string;
  client_name: string;
  industry: string;
  challenge: string | null;
  strategy: string | null;
  results: string | null;
  testimonial_quote: string | null;
  service_tags: string[];
  hero_image_url: string | null;
}

export async function getPublishedPortfolioItems(): Promise<PortfolioItem[]> {
  "use cache";
  try {
    const supabase = createPublicClient();
    if (!supabase) return [];

    const { data } = await supabase
      .from("portfolio_items")
      .select("id, slug, client_name, industry, challenge, strategy, results, testimonial_quote, service_tags, hero_image_url")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    return (data as PortfolioItem[]) || [];
  } catch (error) {
    console.error("Failed to fetch portfolio items:", error);
    return [];
  }
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  "use cache";
  try {
    const supabase = createPublicClient();
    if (!supabase) return null;

    const { data } = await supabase
      .from("portfolio_items")
      .select("id, slug, client_name, industry, challenge, strategy, results, testimonial_quote, service_tags, hero_image_url")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    return (data as PortfolioItem) || null;
  } catch (error) {
    console.error("Failed to fetch portfolio item by slug:", error);
    return null;
  }
}
