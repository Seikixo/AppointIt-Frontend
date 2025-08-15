export type Organization = {
  user_id: number;
  name: string;
  description: string;
  email: string;
  contact_number: string;
  address: string;
};

export type onSubmit = {
  onSubmitForm: () => void;
};

export interface CreateOrgFormProps {
  onMutationStateChange?: (state: {
    status: "idle" | "loading" | "success" | "error";
    error?: Error;
  }) => void;
}
