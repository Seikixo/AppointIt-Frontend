import CreateOrgButton from "@/components/CreateOrgButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchOrganization } from "@/hooks/useFetchOrganization";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export default function Organization() {
  const { user } = useContext(AuthContext);
  const { organization, isLoading } = useFetchOrganization(
    user?.organizations[0]?.id
  );
  console.log("Org details:", organization);

  const services = organization.organization.services;
  console.log("Org services details:", services);
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
        <div className="flex w-full flex-col gap-4">
          <Card className="flex flex-col gap-1 w-full p-4">
            <div className="font-bold">{organization?.organization.name}</div>
            <div>{organization?.organization.address}</div>
            <div>{organization?.organization.contact_number}</div>
            <div>{organization?.organization.email}</div>
          </Card>

          <Card className="flex flex-col gap-2 w-full p-4">
            <h2 className="mb-4">Services</h2>
            {services.map((service: any) => (
              <div key={service.id} className="flex flex-row gap-2 mr-4">
                <p>{service.category_id}</p>
                <p>{service.name}</p>
                <p>{service.description}</p>
                <p>{service.price}</p>
                <p>{service.duration}</p>
                <p>{service.updated_at}</p>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
