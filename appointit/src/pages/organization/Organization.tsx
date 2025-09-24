import CreateOrgButton from "@/pages/organization/components/CreateOrgButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchOrganization } from "@/hooks/useFetchOrganization";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import type { Service } from "@/types/types";
import { CardCarousel } from "@/components/CardCarousel";
import { formatTime } from "@/utils/formatTime";
import { Separator } from "@/components/ui/separator";

export default function Organization() {
  const { user } = useContext(AuthContext);
  const orgId = user?.organizations?.[0]?.id;
  const { organization, isLoading } = useFetchOrganization(orgId);

  const services = organization?.organization?.services ?? [];
  console.log("Org services details:", services);

  const appointments =
    services?.flatMap((service: any) => service.appointments ?? []) ?? [];
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
            <div className="font-bold">{organization?.organization?.name}</div>
            <div>{organization?.organization?.address}</div>
            <div>{organization?.organization?.contact_number}</div>
            <div>{organization?.organization?.email}</div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="mb-4">Appointments</h2>
              <div>
                <Card className="h-full p-4 min-h-[300px] overflow-auto">
                  <div className="grid gap-4">
                    {appointments?.map((appointment: any) => (
                      <div
                        key={appointment.id}
                        className="p-4 border border-transparent hover:border-accent hover:bg-slate-100 transition-all rounded-lg"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              Date & Time
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.appointment_date}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatTime(appointment.start_time)} -{" "}
                              {formatTime(appointment.end_time)}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">Status</div>
                            <div className="text-sm">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${
                                  appointment.status === "Confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : appointment.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : appointment.status === "Cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="mt-3 mb-2">
                            <div className="text-sm font-medium">Notes</div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.notes}
                            </div>
                          </div>
                        )}
                        <Separator />
                      </div>
                    ))}
                  </div>
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
