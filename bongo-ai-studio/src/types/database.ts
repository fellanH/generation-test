export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          full_name?: string
          avatar_url?: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
          full_name?: string
          avatar_url?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          avatar_url?: string
        }
      }
      assets: {
        Row: {
          id: string
          user_id: string
          fal_job_id: string
          model_name: string
          prompt: string
          parameters: any
          original_url: string
          storage_path: string
          public_url: string
          file_size: number
          file_type: string
          width?: number
          height?: number
          cost?: number
          status: 'processing' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          fal_job_id: string
          model_name: string
          prompt: string
          parameters?: any
          original_url: string
          storage_path: string
          public_url: string
          file_size: number
          file_type: string
          width?: number
          height?: number
          cost?: number
          status?: 'processing' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          fal_job_id?: string
          model_name?: string
          prompt?: string
          parameters?: any
          original_url?: string
          storage_path?: string
          public_url?: string
          file_size?: number
          file_type?: string
          width?: number
          height?: number
          cost?: number
          status?: 'processing' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          user_id: string
          fal_job_id: string
          model_name: string
          status: 'queued' | 'processing' | 'completed' | 'failed'
          parameters: any
          result?: any
          error_message?: string
          cost?: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          fal_job_id: string
          model_name: string
          status?: 'queued' | 'processing' | 'completed' | 'failed'
          parameters: any
          result?: any
          error_message?: string
          cost?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          fal_job_id?: string
          model_name?: string
          status?: 'queued' | 'processing' | 'completed' | 'failed'
          parameters?: any
          result?: any
          error_message?: string
          cost?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}