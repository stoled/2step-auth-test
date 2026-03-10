import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Step1Props {
  onNext: (email: string) => void;
}

export function Step1({ onNext }: Step1Props) {
  const { checkEmail, serverError } = useRegistration();
  const [checked, setChecked] = useState(false);

  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: Step1Data) => {
    if (!checked) return;
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

        <FieldGroup className="max-w-sm">
          <Field orientation="horizontal">
            <Checkbox
              id="terms-checkbox"
              name="terms-checkbox"
              checked={checked}
              onCheckedChange={(value) => setChecked(value === true)}
            />
            <Label htmlFor="terms-checkbox">
              Я подтверждаю согласие с{" "}
              <a href="">политикой конфиденциальности</a>
            </Label>
          </Field>
        </FieldGroup>

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

        <Button type="button" className="w-full" variant="secondary">
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
