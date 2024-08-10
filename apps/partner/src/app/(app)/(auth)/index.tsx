import { View } from "react-native";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "~/components/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

const SignInSchema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export default function SignIn() {
  const form = useForm({
    schema: SignInSchema,
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    //logic goes here...
    // console.log(values);
  }

  return (
    <Form {...form}>
      <View className="flex-1 gap-6 bg-secondary px-4 pt-10">
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
                  editable={!field.disabled}
                  selectTextOnFocus={!field.disabled}
                  onChangeText={field.onChange}
                  className="w-full"
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
                  editable={!field.disabled}
                  selectTextOnFocus={!field.disabled}
                  onChangeText={field.onChange}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onPress={form.handleSubmit(onSubmit)}
          size={"lg"}
          className="w-full"
        >
          <Text>Sign In</Text>
        </Button>
      </View>
    </Form>
  );
}
