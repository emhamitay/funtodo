import { Separator } from "@/components/ui/separator";
import Link from "./Information/Link";

export default function Information() {
  return (
    <div className="font-sans antialiased">
      <h1 className="text-base font-bold text-blue-950">Information</h1>
      <Separator />
      <Link
        src="https://github.com/emhamitay/funtodo"
        type="github"
        pre="View the complete source code on "
      >
        FunTodo Fullstack Repository
      </Link>
      <Link
        src="https://github.com/emhamitay/TutorialFramework"
        type="github"
        pre="Explore the tutorial framework at "
      >
        Tutorial Framework
      </Link>
      <Link
        src="https://github.com/emhamitay/dnd-framework--w-example"
        type="github"
        pre="Check out the drag and drop framework at "
      >
        Drag & Drop Framework
      </Link>
      <Link
        src="https://www.npmjs.com/package/bhi-dnd"
        type="npm"
        pre="Available on npm as "
      >
        {" "}
        bhi-dnd
      </Link>
    </div>
  );
}
