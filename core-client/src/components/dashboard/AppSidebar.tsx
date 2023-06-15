import { Navbar } from "@mantine/core";

export function AppSidebar({ opened }: { opened: boolean }) {
  return (
    <Navbar width={{ base: 275 }} p="xs" hiddenBreakpoint="md" hidden={!opened}>
      {}
    </Navbar>
  );
}
