interface EditorProps {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="container mx-auto flex flex-col items-start gap-10 py-8 ">
      {children}
    </div>
  );
}
