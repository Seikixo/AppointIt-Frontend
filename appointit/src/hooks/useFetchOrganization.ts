import { getOrganizationApi } from "@/services/organization";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrganization = (orgId?: number) => {
  const {
    data: organization,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["organizations", orgId],
    queryFn: () => orgId ? getOrganizationApi(orgId) : Promise.resolve(null),
    enabled: !!orgId, // Only run query if orgId exists
  });

  return {
    organization,
    isLoading,
    isError,
  };
};
