import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { CalendarIcon, Filter, Save } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";

import { format } from "date-fns";

import Image from "next/image";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const PageHeader = ({
  title,
  icon,
  badge,
  description,
  filters,
  customFilter,
  queryPantauan = false,
}: {
  title: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  description?: string;
  filters?: boolean;
  customFilter?: React.ReactNode;
  queryPantauan?: boolean;
}) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 1, 13),
    to: new Date(2025, 1, 13),
  });
  const [showQueryModal, setShowQueryModal] = useState(false);

  return (
    <>
      <div className="border-b py-4 pb-5 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between w-full">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-primary">
              {icon}
              {title}
              {badge}
            </h1>
          </div>
          {description && (
            <p className="text-base sm:text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {customFilter && customFilter}
        {filters && (
          <div className="flex flex-wrap items-center gap-2 max-sm:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <div className="flex flex-row gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-8 justify-start text-left font-normal dark:bg-secondary/50",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "dd/MM/yyyy")} -{" "}
                          {format(date.to, "dd/MM/yyyy")}
                        </>
                      ) : (
                        format(date.from, "dd/MM/yyyy")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <Button className="h-8 max-sm:text-xs">Terapkan</Button>
              {queryPantauan && (
                <Button
                  className="h-8 max-sm:text-xs"
                  onClick={() => setShowQueryModal(true)}
                >
                  Query Pantauan
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <Dialog open={showQueryModal} onOpenChange={setShowQueryModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Query Pantauan</DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                  <div className="flex flex-row gap-2">
                    {/* <div className="relative aspect-square size-16">
                      <Image
                        src={NasDemLogo}
                        alt="NasDem Logo"
                        className="rounded-lg object-cover"
                        fill
                      />
                    </div> */}
                    <div className="flex flex-col">
                      <h1 className="text-xl font-bold">NasDem</h1>
                      <p className="text-base text-muted-foreground">
                        Query pantauan
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="default"
                    size="sm"
                    className="text-xs h-8 rounded-lg"
                  >
                    <Save size={12} className="mr-2" />
                    Update Query
                  </Button>
                </div>
                <ScrollArea className="h-[100px] w-full rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">
                    NasDem, achmad sere, daeng sere, ahmad sahroni, ali mazi,
                    Amelia Anggraini, Ananda Tohpati, Andina Narang, Arif
                    Rahman, Arjuna Sakir, Asep Wahyuwijaya, Charles
                    Meikyansah...
                  </p>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PageHeader;
