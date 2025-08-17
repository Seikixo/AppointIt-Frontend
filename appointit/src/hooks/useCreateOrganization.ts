import { createOrganizationApi } from "@/services/organization";
import type { Organization } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  const createOrgMutation = useMutation({
    mutationFn: (data: Organization) => createOrganizationApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (err: any) => {
      if (err && typeof err === "object") {
        console.error("Validation errors:", err);
      } else {
        console.error("Failed to create organization:", err);
      }
    },
  });

  const createOrganization = async (data: Organization) => {
    return createOrgMutation.mutateAsync(data);
  };

  return {
    createOrganization,
    isPending: createOrgMutation.isPending,
  };
};
