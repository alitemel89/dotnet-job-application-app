import { ArrowLeftOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Select, SelectItem } from "@tremor/react";

interface Props {
  userEmail: string;
}

export function ProfileButton({ userEmail }: Props) {
  return (
    <div className="btn">
      <Select content={userEmail} aria-aria-description="Hello" >
        <SelectItem value="1" icon={UserCircleIcon}>
          Profile
        </SelectItem>
        <SelectItem value="2" icon={ArrowLeftOnRectangleIcon}>
          Log out
        </SelectItem>
      </Select>
    </div>
  );
}
