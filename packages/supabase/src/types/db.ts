export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          account_id: string
          balance: number | null
          bank_connection_id: string | null
          base_balance: number | null
          base_currency: string | null
          created_at: string
          created_by: string
          currency: string | null
          enabled: boolean
          id: string
          manual: boolean | null
          name: string | null
          team_id: string
          type: Database["public"]["Enums"]["account_type"] | null
        }
        Insert: {
          account_id: string
          balance?: number | null
          bank_connection_id?: string | null
          base_balance?: number | null
          base_currency?: string | null
          created_at?: string
          created_by: string
          currency?: string | null
          enabled?: boolean
          id?: string
          manual?: boolean | null
          name?: string | null
          team_id: string
          type?: Database["public"]["Enums"]["account_type"] | null
        }
        Update: {
          account_id?: string
          balance?: number | null
          bank_connection_id?: string | null
          base_balance?: number | null
          base_currency?: string | null
          created_at?: string
          created_by?: string
          currency?: string | null
          enabled?: boolean
          id?: string
          manual?: boolean | null
          name?: string | null
          team_id?: string
          type?: Database["public"]["Enums"]["account_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_bank_connection_id_fkey"
            columns: ["bank_connection_id"]
            isOneToOne: false
            referencedRelation: "bank_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_bank_accounts_company_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_connections: {
        Row: {
          access_token: string | null
          created_at: string
          enrollment_id: string | null
          error_details: string | null
          expires_at: string | null
          id: string
          institution_id: string
          last_accessed: string | null
          logo_url: string | null
          name: string
          provider: Database["public"]["Enums"]["bank_providers"] | null
          reference_id: string | null
          status: Database["public"]["Enums"]["connection_status"] | null
          team_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          enrollment_id?: string | null
          error_details?: string | null
          expires_at?: string | null
          id?: string
          institution_id: string
          last_accessed?: string | null
          logo_url?: string | null
          name: string
          provider?: Database["public"]["Enums"]["bank_providers"] | null
          reference_id?: string | null
          status?: Database["public"]["Enums"]["connection_status"] | null
          team_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          enrollment_id?: string | null
          error_details?: string | null
          expires_at?: string | null
          id?: string
          institution_id?: string
          last_accessed?: string | null
          logo_url?: string | null
          name?: string
          provider?: Database["public"]["Enums"]["bank_providers"] | null
          reference_id?: string | null
          status?: Database["public"]["Enums"]["connection_status"] | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_company_id"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancers: {
        Row: {
          bio: string | null
          created_at: string
          daily_rate: number | null
          experience_years: number | null
          headline: string | null
          id: string
          is_active: boolean
          preferred_work_style: string | null
          updated_at: string | null
          user_id: string | null
          vat_number: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          daily_rate?: number | null
          experience_years?: number | null
          headline?: string | null
          id?: string
          is_active?: boolean
          preferred_work_style?: string | null
          updated_at?: string | null
          user_id?: string | null
          vat_number?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          daily_rate?: number | null
          experience_years?: number | null
          headline?: string | null
          id?: string
          is_active?: boolean
          preferred_work_style?: string | null
          updated_at?: string | null
          user_id?: string | null
          vat_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_freelancers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          base_currency: string | null
          created_at: string
          document_classification: boolean | null
          email: string | null
          id: string
          inbox_email: string | null
          inbox_forwarding: boolean | null
          inbox_id: string | null
          logo_url: string | null
          name: string | null
        }
        Insert: {
          base_currency?: string | null
          created_at?: string
          document_classification?: boolean | null
          email?: string | null
          id?: string
          inbox_email?: string | null
          inbox_forwarding?: boolean | null
          inbox_id?: string | null
          logo_url?: string | null
          name?: string | null
        }
        Update: {
          base_currency?: string | null
          created_at?: string
          document_classification?: boolean | null
          email?: string | null
          id?: string
          inbox_email?: string | null
          inbox_forwarding?: boolean | null
          inbox_id?: string | null
          logo_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      tracker_entries: {
        Row: {
          assigned_id: string | null
          billed: boolean | null
          created_at: string | null
          currency: string | null
          date: string | null
          description: string | null
          duration: number | null
          id: string
          project_id: string | null
          project_members: Json | null
          rate: number | null
          start: string | null
          stop: string | null
          team_id: string | null
        }
        Insert: {
          assigned_id?: string | null
          billed?: boolean | null
          created_at?: string | null
          currency?: string | null
          date?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          project_id?: string | null
          project_members?: Json | null
          rate?: number | null
          start?: string | null
          stop?: string | null
          team_id?: string | null
        }
        Update: {
          assigned_id?: string | null
          billed?: boolean | null
          created_at?: string | null
          currency?: string | null
          date?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          project_id?: string | null
          project_members?: Json | null
          rate?: number | null
          start?: string | null
          stop?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tracker_entries_assigned_id_fkey"
            columns: ["assigned_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracker_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "tracker_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracker_entries_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      tracker_projects: {
        Row: {
          billable: boolean | null
          created_at: string | null
          currency: string | null
          description: string | null
          estimate: number | null
          get_assigned_users_for_project: Json | null
          get_project_total_amount: number | null
          id: string
          name: string
          project_members: Json | null
          rate: number | null
          status: Database["public"]["Enums"]["trackerstatus"]
          team_id: string | null
          total_duration: number | null
        }
        Insert: {
          billable?: boolean | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimate?: number | null
          get_assigned_users_for_project?: Json | null
          get_project_total_amount?: number | null
          id?: string
          name: string
          project_members?: Json | null
          rate?: number | null
          status: Database["public"]["Enums"]["trackerstatus"]
          team_id?: string | null
          total_duration?: number | null
        }
        Update: {
          billable?: boolean | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimate?: number | null
          get_assigned_users_for_project?: Json | null
          get_project_total_amount?: number | null
          id?: string
          name?: string
          project_members?: Json | null
          rate?: number | null
          status?: Database["public"]["Enums"]["trackerstatus"]
          team_id?: string | null
          total_duration?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tracker_projects_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          embedding: string | null
          id: string
          name: string
          slug: string
          system: boolean | null
          team_id: string
          vat: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          name: string
          slug: string
          system?: boolean | null
          team_id: string
          vat?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          name?: string
          slug?: string
          system?: boolean | null
          team_id?: string
          vat?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_categories_company_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          amount_text: string | null
          assigned_id: string | null
          balance: number | null
          bank_account_id: string | null
          base_amount: number | null
          base_currency: string | null
          calculated_vat: number | null
          category: Database["public"]["Enums"]["transactioncategories"] | null
          category_slug: string | null
          created_at: string
          currency: string
          date: string
          description: string | null
          frequency: Database["public"]["Enums"]["transaction_frequency"] | null
          fts_vector: unknown | null
          id: string
          internal_id: string
          is_fulfilled: boolean | null
          manual: boolean | null
          method: Database["public"]["Enums"]["transactionmethods"]
          name: string
          note: string | null
          recurring: boolean | null
          status: Database["public"]["Enums"]["transactionstatus"] | null
          team_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          amount_text?: string | null
          assigned_id?: string | null
          balance?: number | null
          bank_account_id?: string | null
          base_amount?: number | null
          base_currency?: string | null
          calculated_vat?: number | null
          category?: Database["public"]["Enums"]["transactioncategories"] | null
          category_slug?: string | null
          created_at?: string
          currency: string
          date: string
          description?: string | null
          frequency?:
            | Database["public"]["Enums"]["transaction_frequency"]
            | null
          fts_vector?: unknown | null
          id?: string
          internal_id: string
          is_fulfilled?: boolean | null
          manual?: boolean | null
          method: Database["public"]["Enums"]["transactionmethods"]
          name: string
          note?: string | null
          recurring?: boolean | null
          status?: Database["public"]["Enums"]["transactionstatus"] | null
          team_id: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          amount_text?: string | null
          assigned_id?: string | null
          balance?: number | null
          bank_account_id?: string | null
          base_amount?: number | null
          base_currency?: string | null
          calculated_vat?: number | null
          category?: Database["public"]["Enums"]["transactioncategories"] | null
          category_slug?: string | null
          created_at?: string
          currency?: string
          date?: string
          description?: string | null
          frequency?:
            | Database["public"]["Enums"]["transaction_frequency"]
            | null
          fts_vector?: unknown | null
          id?: string
          internal_id?: string
          is_fulfilled?: boolean | null
          manual?: boolean | null
          method?: Database["public"]["Enums"]["transactionmethods"]
          name?: string
          note?: string | null
          recurring?: boolean | null
          status?: Database["public"]["Enums"]["transactionstatus"] | null
          team_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_transactions_assigned_id_fkey"
            columns: ["assigned_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transactions_company_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_slug_company_id_fkey"
            columns: ["category_slug", "team_id"]
            isOneToOne: false
            referencedRelation: "transaction_categories"
            referencedColumns: ["slug", "team_id"]
          },
        ]
      }
      user_invites: {
        Row: {
          code: string | null
          created_at: string | null
          email: string | null
          id: string
          invited_by: string | null
          role: Database["public"]["Enums"]["teamroles"] | null
          team_id: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["teamroles"] | null
          team_id?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["teamroles"] | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_user_invites_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          locale: string | null
          team_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          locale?: string | null
          team_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          locale?: string | null
          team_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_auth_user"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_company_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      users_on_team: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["teamroles"] | null
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["teamroles"] | null
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["teamroles"] | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_on_team_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_on_team_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_profit_v3: {
        Args: {
          team_id: string
          date_from: string
          date_to: string
          base_currency?: string
        }
        Returns: {
          date: string
          value: number
          currency: string
        }[]
      }
      nanoid: {
        Args: {
          size?: number
          alphabet?: string
          additionalbytesfactor?: number
        }
        Returns: string
      }
      nanoid_optimized: {
        Args: {
          size: number
          alphabet: string
          mask: number
          step: number
        }
        Returns: string
      }
    }
    Enums: {
      account_type:
        | "depository"
        | "credit"
        | "other_asset"
        | "loan"
        | "other_liability"
      bank_providers: "gocardless" | "plaid" | "teller"
      bankproviders: "gocardless" | "plaid" | "teller"
      connection_status: "disconnected" | "connected" | "unknown"
      inbox_status: "processing" | "pending" | "archived" | "new" | "deleted"
      inbox_type: "invoice" | "expense"
      reporttypes: "profit" | "revenue" | "burn_rate" | "expense"
      teamroles: "owner" | "member"
      trackerstatus: "in_progress" | "completed"
      transaction_frequency:
        | "weekly"
        | "biweekly"
        | "monthly"
        | "semi_monthly"
        | "annually"
        | "irregular"
        | "unknown"
      transactioncategories:
        | "travel"
        | "office_supplies"
        | "meals"
        | "software"
        | "rent"
        | "income"
        | "equipment"
        | "transfer"
        | "internet_and_telephone"
        | "facilities_expenses"
        | "activity"
        | "uncategorized"
        | "taxes"
        | "other"
        | "salary"
        | "fees"
      transactionmethods:
        | "payment"
        | "card_purchase"
        | "card_atm"
        | "transfer"
        | "other"
        | "unknown"
        | "ach"
        | "interest"
        | "deposit"
        | "wire"
        | "fee"
      transactionstatus: "posted" | "pending" | "excluded" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

