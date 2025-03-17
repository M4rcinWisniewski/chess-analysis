import { Button } from "./ui/button";


interface IconTypes {
    icon: React.JSX.Element ,
    onClick: () => void
}

export default function IconButton({icon, onClick}: IconTypes) {

    return (
        <Button onClick={onClick} className={`
            flex justify-center items-center w-10 h-10 p-2 bg-blue-300
        `}>
            {icon}
        </Button>
    )
}