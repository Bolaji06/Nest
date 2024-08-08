import { propertyType } from "@/utils/links";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";

export default function FilterChips() {

  const types = ["rent", "buy"]
  return (
    <>
      <div>
        <div className="flex gap-2">
          <div className="relative">
            <Popover>
              <PopoverTrigger className="border hover:bg-slate-200 border-slate-300 px-3 py-2 rounded-md text-sm">By Price</PopoverTrigger>
              <PopoverContent>
                <div>
                <p className="text-slate-400 pb-3">Price range</p>
                  <form action="" className="grid gap-4">
                    <Input placeholder="Min. price"/>
                    <Input placeholder="Max. price"/>
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="relative">
            <Popover>
              <PopoverTrigger className="border hover:bg-slate-200 border-slate-300 px-3 py-2 rounded-md text-sm">Property type</PopoverTrigger>
              <PopoverContent>
                <p className="pb-2 text-slate-400 ">Home types</p>
                <div>
                  {
                    propertyType.map((type) => {
                      return (
                        <div key={type} className="flex gap-3 items-center mb-2 cursor-pointer">
                          <Input id={type} type="checkbox" className="w-3 h-3"/>
                          <label htmlFor={type} className="capitalize text-sm cursor-pointer">{type}</label>
                        </div>
                        
                      )
                    })
                  }
                </div>

              </PopoverContent>
            </Popover>
          </div>
          <div>
          <Popover>
              <PopoverTrigger className="border hover:bg-slate-200 border-slate-300 px-3 py-2 rounded-md text-sm">Type</PopoverTrigger>
              <PopoverContent>
                <p className="text-slate-400 pb-3">Type mode</p>
                {
                  types.map((type) => {
                    return (
                      <div key={type} className="flex gap-3 items-center mb-2 cursor-pointer">
                        <Input id={type} type="checkbox" className="w-3 h-3"/>
                        <label htmlFor={type} className="capitalize text-sm cursor-pointer">{type}</label>
                      </div>
                      
                    )
                  })
                }
              </PopoverContent>
            </Popover>
          </div>
          <div>
          <Popover>
              <PopoverTrigger className="border hover:bg-slate-200 border-slate-300 px-3 py-2 rounded-md text-sm">Number Bed/Bath</PopoverTrigger>
              <PopoverContent>
              <div>
              <p className="text-slate-400 pb-3">Number Bathroom / Bedroom</p>
                  <form action="" className="grid gap-4">
                    <Input placeholder="Num. bed"/>
                    <Input placeholder="Num. bath"/>
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
}
