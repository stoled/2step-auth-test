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
import { Checkbox } from "@/components/ui/checkbox";

interface Step1Props {
  onNext: (email: string) => void;
  onEnter: () => void;
}

export function Step1({ onNext, onEnter }: Step1Props) {
  const { checkEmail, serverError } = useRegistration();

  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: "", terms: false },
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

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormControl className="mt-1">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <FormLabel>
                  Я подтверждаю согласие с{" "}
                  <a href="/privacy-policy">политикой конфиденциальности</a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

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

        <Button
          type="button"
          className="w-full"
          variant="secondary"
          onClick={() => onEnter()}
        >
          ВОЙТИ
        </Button>

        <div className="text-[12px] text-center">
          <p>Возник вопрос или что-то сломалось?</p>
          <a href="">Вступай в чат и задавай вопрос</a>
        </div>
      </form>
    </Form>
  );
}
