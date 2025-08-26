import { getOrganizationApi } from "@/services/organization";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrganization = (
  orgId?: number,
  enabled: boolean = true
) => {
  const {
    data: organization,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["organizations", orgId],
    queryFn: () => getOrganizationApi(orgId!),
    enabled: enabled && !!orgId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    organization,
    isLoading,
    isError,
  };
};
