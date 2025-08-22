import CreateOrgButton from "@/components/CreateOrgButton";
import { useFetchOrganization } from "@/hooks/useFetchOrganization";
import { selectUser } from "@/store/authSlice";
import { useSelector } from "react-redux";

export default function Organization() {
  const user = useSelector(selectUser);
  console.log("User details", user);
  const { organization } = useFetchOrganization(user?.organization?.id || 0);
  console.log("Organization: ", organization.organization);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p>{organization.organization.name}</p>
      <CreateOrgButton />
    </div>
  );
}
