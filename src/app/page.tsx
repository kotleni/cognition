import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default function Home() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <section className="w-full">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Learning
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Quiz's</NavigationMenuLink>
                                <NavigationMenuLink>Words</NavigationMenuLink>
                                <NavigationMenuLink>Cards</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Account
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Profile</NavigationMenuLink>
                                <NavigationMenuLink>SignOut</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </section>
        </div>
    );
}
