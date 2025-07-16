interface SideContainerProps {
    children: React.ReactElement;
}

export function SideContainer(props: SideContainerProps) {
    return <div className="w-full h-full">{props.children}</div>;
}
