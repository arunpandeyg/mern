import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { isSuccess, isError } = useVerifyEmail(token);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Email verified");
      navigate("/signin");
    }
    if (isError) {
      toast.error("Verification failed");
    }
  }, [isSuccess, isError, navigate]);

  return <p>Verifying email...</p>;
}
