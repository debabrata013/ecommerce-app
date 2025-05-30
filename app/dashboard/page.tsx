
import { auth,currentUser  } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { log } from "console";

export default async function DashboardPage() {
  const { userId } = await auth();
  let role;

  const user = await currentUser()
  // console.log(user.publicMetadata)
  if (user.publicMetadata.isAdmin === 'true') {
    redirect('/admin') // Admin dashboard
  }
  if (!userId) {
    redirect("/sign-in");
  }
  
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Account Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your personal details and preferences.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userId}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Account Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Active
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Recent Orders
              </h2>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                No recent orders found.
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Saved Addresses
              </h2>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                No addresses saved yet.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
