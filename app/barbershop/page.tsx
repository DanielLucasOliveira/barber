import { redirect, useRouter } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/search";
import Link from "next/link";

interface BarbershopPageProps {
    searchParams: {
        search?: string
    }
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {

    if (!searchParams.search) {
        return redirect("/");
    }

    const barbershop = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: 'insensitive'
            }
        }
    })
    return (
        <>
            <Header />
            <div className="py-6 px-5 flex flex-col gap-6">
                <Search defaultValues={{
                    search: searchParams.search,
                }}/>
                <h1 className="text-gray-400 font-bold text-xs uppercase">
                    Resultados para &quot;{searchParams.search}&quot;

                </h1>
                <div className="grid grid-cols-2 gap-4">
                    {barbershop.map((barbershop) => (
                        <div key={barbershop.id} className="w-full">
                            <BarbershopItem barbershop={barbershop} />
                        </div>
                    ))}
                </div>
                <div>
                    <Link href="/">
                        <Button className="absolute right-4 p-5 mr-2">
                            Voltar
                        </Button>
                    </Link>
                </div>
            </div>


        </>

    );
}

export default BarbershopPage;