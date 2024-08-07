import { Button } from "./ui/button";

export default function FilterChips() {
  return (
    <>
      <div>
        <div className="flex gap-2">
          <div>
            <Button className="bg-transparent border border-slate-400 hover:bg-slate-100 text-slate-600">
              By Type
            </Button>
          </div>
          <div>
            <Button className="bg-transparent border border-slate-400 hover:bg-slate-100 text-slate-600">
              Any Price
            </Button>
          </div>
          <div>
            <Button className="bg-transparent border border-slate-400 hover:bg-slate-100 text-slate-600">
              All Property
            </Button>
          </div>
          <div>
            <Button className="bg-transparent border border-slate-400 hover:bg-slate-100 text-slate-600">
              By Bed/Bath
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
