import ResetPasswordForm from "../components/Form/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: { token?: string };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  //url token
  const token = searchParams.token; 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <ResetPasswordForm token={token} />
    </div>
  );
}
