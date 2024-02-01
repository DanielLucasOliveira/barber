"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { signIn, signOut, useSession, } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";

const Header = () => {

    const { data } = useSession();

    const handleLogoutClick = () => signOut();

    const handleLoginClick = () => signIn("google");

    return (
        <Card className="rounded-none">
            <CardContent className="p-5 justify-between items-center flex flex-row">
                <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <MenuIcon size={16} />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SideMenu/>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;