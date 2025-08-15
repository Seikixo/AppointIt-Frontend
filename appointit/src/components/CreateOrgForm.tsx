import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { selectUser } from "@/store/authSlice";
import { useState } from "react";
import { Button } from "./ui/button";
import { useCreateOrganization } from "@/hooks/useCreateOrganization";
import type { Organization } from "@/types/types";

export default function CreateOrgForm() {
  const user = useSelector(selectUser);
  const createOrganization = useCreateOrganization();
  const [data, setData] = useState({
    user_id: 0,
    name: "",
    description: "",
    email: "",
    contact_number: "",
    address: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    try {
      await createOrganization({ ...data, user_id: user?.id } as Organization);
    } catch (error: any) {
      console.log("Error creating org: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="name">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="John Doe"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />
      </div>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="jd@example.com"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
      </div>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="contact-no">
          Contact #
        </Label>
        <Input
          type="text"
          id="contact_number"
          placeholder="0912-3XX-XXXX"
          value={data.contact_number}
          onChange={(e) => setData({ ...data, contact_number: e.target.value })}
        />
      </div>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="address">
          Address
        </Label>
        <Input
          type="text"
          id="address"
          placeholder="The address of your organization"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
      </div>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="description">
          Description (optional)
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder="Describe your organization"
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
