import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useOutletContext } from "react-router";

type UserProfile = {
  user: {
    id: number;
    name: string;
    email: string;
  };
};
export default function ProfilePage() {
  const { user } = useOutletContext<UserProfile>();

  return (
    <div className="flex justify-center mt-10">
      <Card className="max-w-sm w-full p-6">
        <CardContent className="flex flex-col items-center text-center space-y-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder-avatar.png" alt="User Avatar" />
            <AvatarFallback className="text-3xl font-semibold">
              U
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
