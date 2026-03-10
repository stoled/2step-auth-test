import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { step2Schema, type Step2Data } from "../types/schemas";
import { useRegistration } from "../hooks/useRegistration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Step2Props {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function Step2({ email, onBack, onSuccess }: Step2Props) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, serverError } = useRegistration();

  const form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { name: "", password: "" },
  });

  const onSubmit = async (data: Step2Data) => {
    const ok = await register({
      email,
      name: data.name,
      password: data.password,
    });
    if (ok) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Иван Иванов" autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} {...field} />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "ЗАРЕГИСТРИРОВАТЬ"
            )}
          </Button>
          <Button type="button" variant="outline" onClick={onBack}>
            НАЗАД
          </Button>
        </div>
      </form>
    </Form>
  );
}
