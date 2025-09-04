import CreateOrgButton from "@/pages/organization/components/CreateOrgButton";
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

  const services = organization?.organization?.services;
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
                <Card></Card>
              </div>
            </div>

            <div>
              <h2 className="mb-4">Services</h2>
              <div className="relative">
                <button
                  type="button"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-2 hidden md:block"
                  onClick={() => {
                    const el = document.getElementById("services-reel");
                    if (el) el.scrollBy({ left: -320, behavior: "smooth" });
                  }}
                  aria-label="Scroll left"
                >
                  &#8592;
                </button>
                <div
                  id="services-reel"
                  className="flex overflow-x-auto gap-4 pb-2 scroll-smooth snap-x snap-mandatory"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {services.map((service: any) => (
                    <Card
                      key={service.id}
                      className="flex flex-col gap-2 p-4 min-w-[220px] max-w-[320px] w-full snap-center"
                    >
                      <p className="text-xs text-muted-foreground">
                        Category: {service.category_id}
                      </p>
                      <p className="font-semibold text-base">{service.name}</p>
                      <p className="text-sm">{service.description}</p>
                      <p className="text-sm font-medium">${service.price}</p>
                      <p className="text-xs">
                        Duration: {service.duration} min
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Updated: {service.updated_at}
                      </p>
                    </Card>
                  ))}
                </div>
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-2 hidden md:block"
                  onClick={() => {
                    const el = document.getElementById("services-reel");
                    if (el) el.scrollBy({ left: 320, behavior: "smooth" });
                  }}
                  aria-label="Scroll right"
                >
                  &#8594;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
