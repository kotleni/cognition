import {Button} from '@/components/ui/button';

export default function AuthPage() {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="w-90 h-min-100 flex flex-row gap-2 bg-primary text-primary-foreground rounded-sm p-4">
                <h2 className="text-lg font-medium">Auth using social</h2>
                <Button variant="default">TODO</Button>
            </div>
        </div>
    );
}
