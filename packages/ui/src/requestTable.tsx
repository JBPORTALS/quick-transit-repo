import { Payment, columns } from "./requestTableColumn"
    import { DataTable } from "./dataTable"

    async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
        id: "abcdefgh1234",
        amount: 100,
        status: "success",
        email: "naga@gmail.com",
        name: "Nagaraja G...!",
        slno: 1,
        requestid: "#12345",
        package: "Hello",
        dimension: "42x42",
        weight: "1 KG",
        requestedon: "Tomorrow",
        },
        {
            id: "efghij1234",
            amount: 200,
            status: "success",
            email: "akash@gmail.com",
            name: "Akash BR ambedkar...!",
            slno: 2,
            requestid: "#12345",
            package: "Hello",
        dimension: "22x22",
        weight: "2 KG",
        requestedon: "Yesterday Before",
        },
        {
            id: "efghij1234",
            amount: 300,
            status: "success",
            email: "Santhosh@gmail.com",
            name: "Santhosh Kumar...!",
            slno: 3,
            requestid: "#12345",
            package: "Hello",
        dimension: "21x21",
        weight: "3 KG",
        requestedon: "Daybefore",
        },
        {
            id: "efghij1234",
            amount: 400,
            status: "success",
            email: "Dilip@gmail.com",
            name: "DilipKumar...!",
            slno: 4,
            requestid: "#12345",
            package: "Hello",
        dimension: "10x10",
        weight: "4 KG",
        requestedon: "Today",
        },
        {
            id: "efghij1234",
            amount: 500,
            status: "success",
            email: "Aman@gmail.com",
            name: "Aman Kumar...!",
            slno: 5,
            requestid: "#12345",
            package: "Hello",
        dimension: "30x430",
        weight: "5 KG",
        requestedon: "Yesterday",
        },
        // ...
    ]
    }

    export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
        </div>
    )
    }