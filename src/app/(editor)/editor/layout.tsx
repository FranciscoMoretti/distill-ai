interface EditorProps {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="mx-auto flex w-full flex-1 flex-col items-start gap-10 py-8 sm:px-8 ">
      {children}
    </div>
  );
}
