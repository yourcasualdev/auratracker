"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { createClient } from "@/utils/supabase/client";
import React from "react";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  amount: z.coerce.number().min(-1000000).max(1000000),
});

export function CreatePost() {
  const ref = React.useRef<HTMLButtonElement>(null);
  const supabase = createClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      toast.error("You need to be logged in to create an event!");
      return;
    }
    const { error } = await supabase.from("aura_events").insert({
      user_id: user.data.user?.id,
      title: values.title,
      description: values.description,
      amount: values.amount,
    });

    if (error) {
      toast.error("Something went wrong!");
      return;
    }

    form.reset();
    toast.success("Event created!");
    ref.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger ref={ref} asChild className="fixed bottom-5 right-5">
        <Button variant="default" className="rounded-full h-16 w-16 text-3xl">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create Aura Event</DialogTitle>
              <DialogDescription>
                Create a new event and share it with your friends.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="number" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
