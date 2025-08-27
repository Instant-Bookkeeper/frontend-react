import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/services/auth.service";
import type { UserProfile } from "@/services/user.service";
import { Link, useNavigate } from "react-router";

export default function Header({ user }: { user: UserProfile }) {
  const navigate = useNavigate();
  const { name } = user;
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-16 border-b border-border bg-white">
      <div className="h-full max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="size-16">
          <img
            src="/ecom-central-logo.png"
            alt="ECOM Central Logo"
            height={1024}
            width={1024}
            className="object-contain h-full"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((w) => w[0])
                  .join()
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:!bg-destructive/70 hover:!text-white"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
