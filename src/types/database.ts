export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      metrics: {
        Row: {
          id: string
          created_at: string
          date: string
          platform: 'Kwai' | 'Facebook' | 'TikTok'
          spend: number
          revenue: number
          impressions: number
          clicks: number
          profit: number
          roas: number
          ctr: number
          cpc: number
        }
        Insert: {
          id?: string
          created_at?: string
          date: string
          platform: 'Kwai' | 'Facebook' | 'TikTok'
          spend: number
          revenue: number
          impressions: number
          clicks: number
        }
        Update: {
          date?: string
          platform?: 'Kwai' | 'Facebook' | 'TikTok'
          spend?: number
          revenue?: number
          impressions?: number
          clicks?: number
        }
      }
      todos: {
        Row: {
          id: string
          created_at: string
          title: string
          completed: boolean
          important: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          completed?: boolean
          important?: boolean
        }
        Update: {
          title?: string
          completed?: boolean
          important?: boolean
        }
      }
    }
  }
}