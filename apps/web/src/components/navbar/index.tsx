import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    setIsOpen(false);
    location.href = "/login";
  };

  let userdetails;
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    userdetails = jwtDecode<any>(accessToken)?.user;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <span className="hidden text-xl font-bold text-gray-900 md:inline-block">
          DriverPortal
        </span>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback className="bg-teal-100 text-teal-800">
                        Name
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{userdetails?.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-2"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop menu */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2">
            {/* <Avatar>
                            <AvatarFallback className="bg-teal-100 text-teal-800">{"getInitials(username)"}</AvatarFallback>
                        </Avatar> */}
            <span className="font-medium">Welcome, {userdetails?.email}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
