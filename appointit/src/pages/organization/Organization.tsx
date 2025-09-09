import CreateOrgButton from "@/pages/organization/components/CreateOrgButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchOrganization } from "@/hooks/useFetchOrganization";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import type { Service } from "@/types/types";
import { CardCarousel } from "@/components/CardCarousel";

export default function Organization() {
  const { user } = useContext(AuthContext);
  const { organization, isLoading } = useFetchOrganization(
    user?.organizations[0]?.id
  );

  const services = organization?.organization?.services;
  console.log("Org services details:", services);

  const appointments = services.flatMap((service: any) => service.appointments);
  console.log("Services appointments", appointments);

  const renderServiceCard = (service: Service) => (
    <Card className="flex flex-col gap-2 p-4 min-w-[300px] h-full w-full">
      <p className="font-semibold text-base">{service.name}</p>
      <p className="text-sm">{service.description}</p>
      <p className="text-sm font-medium">${service.price}</p>
      <p className="text-xs">Duration: {service.duration} min</p>
      <p className="text-xs text-muted-foreground">
        Updated: {service.updated_at}
      </p>
    </Card>
  );

  return (
    <div className="w-full h-full flex flex-col p-2 items-center">
      <div className="self-end mb-4">
        <CreateOrgButton />
      </div>

      {isLoading ? (
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
        <div className="flex w-full flex-col">
          <Card className="flex flex-col gap-1 w-full p-4 mb-6">
            <div className="font-bold">{organization?.organization.name}</div>
            <div>{organization?.organization.address}</div>
            <div>{organization?.organization.contact_number}</div>
            <div>{organization?.organization.email}</div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <h2 className="mb-4">Appointments</h2>
              <div>
                <Card>
                  {appointments?.map((appointment: any) => (
                    <ul className="flex flex-row gap-2">
                      <li key={appointment.id}>{appointment.id}</li>
                      <li>{appointment.notes}</li>
                      <li>{appointment.appointment_date}</li>
                    </ul>
                  ))}
                </Card>
              </div>
            </div>

            <div>
              <h2 className="mb-4">Services</h2>
              <CardCarousel
                items={services}
                renderCard={renderServiceCard}
                uniqueId="service-carousel"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
