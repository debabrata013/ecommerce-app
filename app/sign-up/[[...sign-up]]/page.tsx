// import { SignUp } from "@clerk/nextjs";

// export default function SignUpPage() {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <SignUp />
//     </div>
//   );
// }
import { SignUp } from "@clerk/nextjs";
import OnboardUser from "../../components/OnboardUser"; // Path to above file

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp />
      <OnboardUser />
    </div>
  );
}
