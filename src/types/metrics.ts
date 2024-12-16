export interface AdMetrics {
  id: string;
  date: string;
  platform: 'Kwai' | 'Facebook' | 'TikTok';
  spend: number;
  revenue: number;
  profit: number;
  roas: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
}

export interface MetricsFormData {
  date: string;
  platform: 'Kwai' | 'Facebook' | 'TikTok';
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
}