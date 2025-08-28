import { getOrganizationApi } from "@/services/organization";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrganization = (orgId?: number) => {
  const {
    data: organization,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["organizations", orgId],
    queryFn: () => getOrganizationApi(orgId!),
    enabled: !!orgId,
  });

  return {
    organization,
    isLoading,
    isError,
  };
};
