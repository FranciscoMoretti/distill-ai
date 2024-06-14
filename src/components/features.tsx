/**
 * v0 by Vercel.
 * @see https://v0.dev/t/S3GN8mwO8tR
 */
import { Icons } from "@/components/icons";
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";

export default function Features() {
  return (
    <section
      id="features"
      className="flex w-full flex-col gap-16 py-12 md:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
      </div>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <Card className="rounded-xl">
            <CardContent className="flex flex-col items-center space-y-4  pt-6">
              <Icons.folderTree className="h-12 w-12 " />
              <CardTitle className="text-center">
                Effortless Organization
              </CardTitle>
              <CardDescription className="text-center">
                Input and edit raw notes seamlessly.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="rounded-xl">
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <Icons.magic className="h-12 w-12 " />
              <CardTitle className="text-center">
                AI-Powered Summaries
              </CardTitle>
              <CardDescription className="text-center">
                Quick and efficient text processing for instant personalized
                summaries.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="rounded-xl">
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <Icons.settings className="h-12 w-12" />
              <CardTitle className="text-center">Customizable Output</CardTitle>
              <CardDescription className="text-center">
                Options to tailor the summary output to your specific needs.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
