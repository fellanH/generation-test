export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assets: {
        Row: {
          id: string
          user_id: string
          fal_job_id: string
          model_name: string
          model_version: string
          prompt: string | null
          parameters: Record<string, unknown>
          status: 'pending' | 'processing' | 'completed' | 'failed'
          result_url: string | null
          storage_url: string | null
          cost: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          fal_job_id: string
          model_name: string
          model_version: string
          prompt?: string | null
          parameters: Record<string, unknown>
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          result_url?: string | null
          storage_url?: string | null
          cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          fal_job_id?: string
          model_name?: string
          model_version?: string
          prompt?: string | null
          parameters?: Record<string, unknown>
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          result_url?: string | null
          storage_url?: string | null
          cost?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}