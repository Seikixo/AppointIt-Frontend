import CreateOrgButton from "@/components/CreateOrgButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useFetchOrganization } from "@/hooks/useFetchOrganization";

export default function Organization() {
  const { user } = useAuth();
  const { organization, isLoading } = useFetchOrganization(
    user?.data.users.organizations[0].id
  );
  console.log("User details: ", user);
  console.log("Org:", organization);
  return (
    <div className="w-full h-full flex flex-col p-2 items-center">
      <div className="self-end mb-4">
        <CreateOrgButton />
      </div>

      {isLoading ? (
        // Skeleton immediately
        <div className="flex w-full">
          <Card className="w-full">
            <CardHeader className="p-2 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </CardHeader>
            <CardContent className="p-2 space-y-2">
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        </div>
      ) : (
        // Real card
        <div className="flex w-full">
          <Card className="flex flex-col gap-1 w-full p-4">
            <div className="font-bold">{organization?.organization.name}</div>
            <div>{organization?.organization.address}</div>
            <div>{organization?.organization.contact_number}</div>
            <div>{organization?.organization.email}</div>
          </Card>
        </div>
      )}
    </div>
  );
}
