import { createClient } from "@gigflow/supabase/client";
import { upload } from "@gigflow/supabase/storage";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

interface UploadParams {
  file: File;
  path: string[];
  bucket: string;
}

interface UploadResult {
  url: string;
  path: string[];
}

export function useUpload() {
  const supabase: SupabaseClient = createClient();
  const [isLoading, setLoading] = useState<boolean>(false);

  const uploadFile = async ({
    file,
    path,
    bucket,
  }: UploadParams): Promise<UploadResult> => {
    setLoading(true);

    try {
      const url = await upload(supabase, {
        path,
        file,
        bucket,
      });

      return {
        url,
        path,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadFile,
    isLoading,
  };
}