import React from "react";
import { Settings2 } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Command, CommandInput } from "@qt/ui/search";
import Search from "@qt/ui/searchBar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@qt/ui/table";

export default function PaymentsPage() {
  return (
    <main className="w-full">
      <br />
      <div className="flex items-center gap-2 px-4">
        <Search placeholder="Search payments here" />

        <Settings2 />
      </div>
      <br />
      <div className="m-10">
        <Table className="w-full border-collapse divide-x-0 border border-gray-300">
          <TableHeader>
            <TableRow>
              <TableHead>Slno.</TableHead>
              <TableHead>Transaction Id</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Requested ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Paid on</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>₹ 7,800</TableCell>
              <TableCell>
                <Button className="h-6 bg-green-200">Paid</Button>
              </TableCell>
              <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>₹ 7,800</TableCell>
              <TableCell>
                <Button className="h-6 bg-green-200">Paid</Button>
              </TableCell>
              <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>₹ 7,800</TableCell>
              <TableCell>
                <Button className="h-6 bg-green-200">Paid</Button>
              </TableCell>
              <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>₹ 7,800</TableCell>
              <TableCell>
                <Button className="h-6 bg-green-200">Paid</Button>
              </TableCell>
              <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>₹ 7,800</TableCell>
              <TableCell>
                <Button className="h-6 bg-green-200">Paid</Button>
              </TableCell>
              <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>₹ 7,800</TableCell>
              <TableCell>
                <Button className="h-6 bg-green-200">Paid</Button>
              </TableCell>
              <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>₹ 7,800</TableCell>
              <TableCell>
                <Button className="h-6 bg-green-200">Paid</Button>
              </TableCell>
              <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell>#12435267725252727</TableCell>
              <TableCell>₹ 7,800</TableCell>
              <TableCell>
                <Button className="h-6 bg-green-200">Paid</Button>
              </TableCell>
              <TableCell>10/09/2023</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-between gap-5 p-6">
          <div>
            <span className="font-semibold ">30 rows total</span>
          </div>
          <div className="flex gap-3">
            <Button variant={"secondary"}>Previous</Button>
            <Button>Next</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
