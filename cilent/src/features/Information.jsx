import { Separator } from "@/components/ui/separator";
import Link from "./Information/Link";

export default function CalenderToolbar(){
    return (
        <div className="font-sans antialiased">
            <h1 className="text-base font-bold text-blue-950">Information</h1>
            <Separator />
            <Link type='github' pre="Watch the code at ">Github</Link>
            <Link src='https://github.com/emhamitay/dnd-framework--w-example' type='github' pre="Watch the Drag and Drop framework Code at ">Github</Link>
            <Link src='https://www.npmjs.com/package/bhi-dnd' type='npm' pre="At "></Link>
            <Link type='github' pre="Watch the tutorial code at ">Github</Link>
            <Link type='npm' pre="At "></Link>
        </div>
    );
}