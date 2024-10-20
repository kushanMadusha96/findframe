import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageButtonProps {
    title: string;
    img: string;
    style?: React.CSSProperties;
}

export default function ImageButton(props: ImageButtonProps) {
    return (
        <Button className="bg-white text-black font-medium border border-[#E5E5E8] hover:bg-slate-200" style={props.style}>
            <Image src={props.img} alt="fb-logo" width={20} height={20} style={{ marginRight: 10 }}></Image>
            {props.title}
        </Button>
    );
}