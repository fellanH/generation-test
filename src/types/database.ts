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
      profiles: {
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
      jobs: {
        Row: {
          id: string
          user_id: string
          fal_request_id: string
          model_id: string
          status: string
          input_params: Json
          output_data: Json | null
          error_message: string | null
          cost: number | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          fal_request_id: string
          model_id: string
          status?: string
          input_params: Json
          output_data?: Json | null
          error_message?: string | null
          cost?: number | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          fal_request_id?: string
          model_id?: string
          status?: string
          input_params?: Json
          output_data?: Json | null
          error_message?: string | null
          cost?: number | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      assets: {
        Row: {
          id: string
          user_id: string
          job_id: string | null
          asset_type: string
          original_url: string
          storage_path: string
          storage_url: string
          file_size: number | null
          width: number | null
          height: number | null
          duration: number | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id?: string | null
          asset_type: string
          original_url: string
          storage_path: string
          storage_url: string
          file_size?: number | null
          width?: number | null
          height?: number | null
          duration?: number | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string | null
          asset_type?: string
          original_url?: string
          storage_path?: string
          storage_url?: string
          file_size?: number | null
          width?: number | null
          height?: number | null
          duration?: number | null
          metadata?: Json | null
          created_at?: string
        }
      }
    }
  }
}
