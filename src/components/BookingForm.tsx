
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function BookingForm(){

    return(
        <>
            <div className="sticky w-full basis-[30%]">
              <div className="p-4 border w-full space-y-2 flex flex-col rounded-lg bg-white shadow-xl">
                <form action="" className="space-y-3">
                  <div>
                    <label htmlFor="phone" className="text-sm">
                      Phone number
                    </label>
                    <Input />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm">
                      Phone number
                    </label>
                    <Input />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm">
                      Message
                    </label>
                    <textarea
                      cols={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 ring-offset-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-secondary
                   hover:bg-transparent hover:text-brand-secondary hover:border border-brand-secondary"
                  >
                    Submit
                  </Button>

                  <div className="flex items-center gap-2">
                    <Input
                      type="checkbox"
                      className="w-3 h-3 checked:bg-brand-secondary"
                    />
                    <label htmlFor="approve" className="text-xs text-slate-500">
                      I approve an email been sent to my inbox and receive any
                      other notification
                    </label>
                  </div>
                </form>
                <div>
                  <p className="text-xs text-slate-500">
                    By pressing Request Info, you agree that Nest and real
                    estate professionals may contact you via phone/text about
                    your inquiry, which may involve the use of automated means.
                    You are not required to consent as a condition of purchasing
                    any property, goods or services. Message/data rates may
                    apply. You also agree to our Terms of Use Nest does not
                    endorse any real estate professionals
                  </p>
                </div>
              </div>
            </div>
        </>
    )
}