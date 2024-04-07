import { useRouter } from 'next/navigation'
import { Inter } from "next/font/google";
import { SignIn } from "@/components/signin";
import { UserDTO } from "./api/users";
import UserService from "@/services/user";
import CustomerService from "@/services/customers";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <SignIn onSubmit={onSubmit} />
    </main>
  );

  function onSubmit(data: Partial<UserDTO>) {
    const query = `?email=${data.email}`;
    UserService.getAll(query)
      .then((res) => {
        if(res.data.length === 0) {
          CustomerService.create(data)
            .then((res) => {
              router.push(`/submissions/${res.data.id}`)})
            .catch((e) => console.warn({e}));
        }
      })
      .catch(e => console.log([e]));
  }
}
