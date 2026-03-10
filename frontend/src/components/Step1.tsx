import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { step1Schema, type Step1Data } from "../types/schemas";
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

interface Step1Props {
  onNext: (email: string) => void;
}

export function Step1({ onNext }: Step1Props) {
  const { checkEmail, serverError } = useRegistration();

  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: Step1Data) => {
    const ok = await checkEmail(data.email);
    if (ok) onNext(data.email);
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
            <span>ПРОДОЛЖИТЬ</span>
          )}
        </Button>

        <Button className="w-full" variant="secondary">
          ВОЙТИ
        </Button>
      </form>
    </Form>
  );
}
