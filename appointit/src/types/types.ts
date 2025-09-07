export type Organization = {
  id?: number;
  user_id: number;
  name: string;
  description: string;
  email: string;
  contact_number: string;
  address: string;
};

export type Service = {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  updated_at: string;
};

type UserRole = "admin" | "customer";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  organizations: Organization | null;
};

export type Credentials = {
  email: string;
  password: string;
};

export type onSubmit = {
  onSubmitForm: () => void;
};

export type AuthContextValue = {
  loading: boolean;
  user: any;
};

export interface CreateOrgFormProps {
  onMutationStateChange?: (state: {
    status: "idle" | "loading" | "success" | "error";
    error?: Error;
  }) => void;
}
