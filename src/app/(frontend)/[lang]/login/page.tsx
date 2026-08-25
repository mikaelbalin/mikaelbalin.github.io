import { LoginForm } from "#components/forms/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/Card";

export default async function Page(props: PageProps<"/[lang]/login">) {
  const searchParams = await props.searchParams;
  const returnTo =
    typeof searchParams.returnTo === "string"
      ? searchParams.returnTo
      : undefined;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Sign in with BlueSky</CardTitle>
            <CardDescription>
              Enter your Bluesky handle to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm returnTo={returnTo} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
