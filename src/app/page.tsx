import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4 flex justify-center h-svh items-center">
      <Link href="/create-form">
        <Button>Create Form</Button>
      </Link>
    </main>
  );
}
