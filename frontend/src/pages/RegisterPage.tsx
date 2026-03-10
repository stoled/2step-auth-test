import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Step1 } from "../components/Step1";
import { Step2 } from "../components/Step2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/AppLayout";

type Stage = "step1" | "step2";

export function RegisterPage() {
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>("step1");
  const [email, setEmail] = useState("");

  const handleStep1Next = (value: string) => {
    setEmail(value);
    setStage("step2");
  };

  const handleRegister = () => {
    navigate("/users");
  };

  return (
    <AppLayout>
      <div>
        <Card className="mt-[214px] mx-auto max-w-[508px]">
          <CardHeader>
            <CardTitle>Регистрация</CardTitle>
          </CardHeader>

          <CardContent>
            {stage === "step1" && <Step1 onNext={handleStep1Next} onEnter={handleRegister} />}
            {stage === "step2" && (
              <Step2
                email={email}
                onBack={() => setStage("step1")}
                onSuccess={() => handleRegister()}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
