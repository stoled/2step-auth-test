import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { step1Schema, type Step1Data } from "../types/schemas";
import { usersApi } from "../api/users";
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

interface Step1Props {
  onNext: (email: string) => void;
}

export function Step1({ onNext }: Step1Props) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: Step1Data) => {
    setServerError(null);
    try {
      const result = await usersApi.checkEmail(data.email);
      if (!result.available) {
        setServerError("Этот e-mail уже зарегистрирован");
        return;
      }
      onNext(data.email);
    } catch {
      setServerError("Не удалось проверить e-mail. Попробуйте позже.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Корпоративный e-mail</FormLabel>
              <FormControl>
                <Input placeholder="Введи почту" autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <span>Продолжить</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
