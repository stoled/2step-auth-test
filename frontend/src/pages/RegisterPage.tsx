import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Users } from "lucide-react";
import { Step1 } from "../components/Step1";
import { Step2 } from "../components/Step2";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Stage = "step1" | "step2" | "success";

export function RegisterPage() {
  const [stage, setStage] = useState<Stage>("step1");
  const [email, setEmail] = useState("");

  const handleStep1Next = (value: string) => {
    setEmail(value);
    setStage("step2");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Регистрация</CardTitle>
        </CardHeader>

        <CardContent>
          {stage === "step1" && <Step1 onNext={handleStep1Next} />}
          {stage === "step2" && (
            <Step2
              email={email}
              onBack={() => setStage("step1")}
              onSuccess={() => setStage("success")}
            />
          )}
          {stage === "success" && (
            <div className="text-center py-4 space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Регистрация завершена!
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Ваш аккаунт успешно создан
                </p>
              </div>
              <Button asChild className="w-full">
                <Link to="/users" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Список пользователей
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
