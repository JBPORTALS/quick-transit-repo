import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { useRouter } from "expo-router";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "~/components/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { supabase } from "~/utils/supabase";

const SignUpSchema = z.object({
  fullName: z.string().min(3, "Invalid name"),
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  error: z.string().optional(),
});

const redirectTo = makeRedirectUri({ native: "quick-transitt" });

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token || !refresh_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

export default function SignUp() {
  const form = useForm({
    schema: SignUpSchema,
    mode: "onChange",
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          fullName: values.fullName,
        },
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      form.setValue("error", error.message);
      return;
    }

    // console.log(user.data.user?.id);

    router.push("/email-sent");
    form.reset();
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior="padding"
        style={{ flex: 1 }}
      >
        <Form {...form}>
          <View className="flex-1 gap-6 bg-secondary px-4 pt-10">
            <Text className="text-center text-destructive">
              {form.getValues().error}
            </Text>
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      editable={!field.disabled}
                      selectTextOnFocus={!field.disabled}
                      onChangeText={field.onChange}
                      className="native:h-14 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This will be your display name.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      keyboardType="email-address"
                      editable={!field.disabled}
                      selectTextOnFocus={!field.disabled}
                      onChangeText={field.onChange}
                      className="native:h-14 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      secureTextEntry
                      editable={!field.disabled}
                      selectTextOnFocus={!field.disabled}
                      onChangeText={field.onChange}
                      className="native:h-14 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              isLoading={form.formState.isSubmitting}
              onPress={form.handleSubmit(onSubmit)}
              size={"lg"}
              loadingText={<Text>Please wait...</Text>}
              className="w-full gap-2"
            >
              <Text>Create Account</Text>
            </Button>
          </View>
        </Form>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
