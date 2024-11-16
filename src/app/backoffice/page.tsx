import { redirect } from "next/navigation";

export default function Backoffice(){
    redirect("/backoffice/orders/pending")
}