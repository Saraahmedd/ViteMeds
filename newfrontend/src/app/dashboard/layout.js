import Sidebar from "@/components/Sidebar";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

// const checkLoggedIn = async () => {
//     const cookiesString = cookies().getAll()
//         .map((cookie) => `${cookie.name}=${encodeURIComponent(cookie.value)}`)
//         .join('; ');

//     const isLoggedIn = await fetch("http://3.73.222.159:3000/staff/session", {
//         method: "GET",
//         headers: {
//             'Accept': 'application/json',
//             'Cookie': cookiesString
//         },
//     });

//     // if(isLoggedIn.status >= 400) {
//     //     redirect('/');
//     //     return;
//     // }
// };

export default async function DashboardLayout({ children }) {
    // await checkLoggedIn();

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64 min-h-screen flex flex-col">
                {children}
            </div>
        </>
    );
}