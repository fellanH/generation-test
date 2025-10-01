export type JobStatus = 'queued' | 'running' | 'succeeded' | 'failed' | 'transferring' | 'transferred';

export interface Model {
  key: string;
  display_name: string;
  kind: 'model' | 'workflow';
  schema_json: unknown;
}

export interface Job {
  id: string;
  owner_id: string;
  model_key: string;
  is_workflow: boolean;
  input_json: unknown;
  fal_request_id?: string | null;
  status: JobStatus;
  error_message?: string | null;
  created_at: string;
}

export interface Asset {
  id: string;
  owner_id: string;
  job_id: string | null;
  storage_path: string;
  original_source_url: string | null;
  mime_type: string | null;
  bytes: number | null;
  width: number | null;
  height: number | null;
  model_key: string | null;
  visibility: 'private' | 'public';
  created_at: string;
}

