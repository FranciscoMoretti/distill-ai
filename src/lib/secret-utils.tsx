export function getSecretKeyValueMap(
  data:
    | { id: string; name: string; value: string; userId: string }[]
    | undefined,
): Record<string, string> {
  return (
    data?.reduce(
      (acc, secret) => {
        acc[secret.name] = secret.value;
        return acc;
      },
      {} as Record<string, string>,
    ) ?? {}
  );
}
