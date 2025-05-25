import Link from "next/link";
import { Code2, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Code2 className="h-6 w-6 text-green-400" />
            <span>Point Blank</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Student developer community talent portal
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end md:justify-end">
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/directory"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Directory
            </Link>
            <Link
              href="/upload"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Upload Resume
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}