"use client";

import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import { Logo } from "@/components/Logo";
// import {
//   Anchor,
//   Box,
//   Burger,
//   Center,
//   Collapse,
//   Container,
//   Drawer,
//   Group,
//   Menu,
//   ScrollArea,
//   Text,
//   UnstyledButton,
//   useMantineTheme,
// } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import classes from "./HeaderMenu.module.css";

type MenuItem = {
  link: string;
  label: string;
  links?: Omit<MenuItem, "links">[];
};

const menuItems: MenuItem[] = [
  { link: "/blog", label: "Blog" },
  { link: "#about", label: "About" },
  { link: "/contact", label: "Contact" },
];

const languageMenuItems: MenuItem[] = [
  { link: "/", label: "English" },
  { link: "/pt", label: "Portugais" },
  { link: "/de", label: "Deutsch" },
  { link: "/fr", label: "Français" },
];

const LangugeToggle = ({
  label,
  linksOpened,
}: {
  label: string;
  linksOpened: boolean;
}) => {
  // const theme = useMantineTheme();

  return (
    <>
      {/* <Box component="span" mr={5}>
        {label}
      </Box>
      <IconChevronDown
        size="1rem"
        style={{
          transform: `rotate(${linksOpened ? 180 : 0}deg)`,
        }}
        color={theme.black}
      /> */}
    </>
  );
};

export function HeaderMenu() {
  // const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
  //   useDisclosure(false);
  // const [
  //   linksOpened,
  //   { toggle: toggleLinks, close: closeLinks, open: openLinks },
  // ] = useDisclosure(false);
  const [languageLink, setLanguageLink] = useState<MenuItem>(
    languageMenuItems[0],
  );

  // const changeLanguage =
  //   (item: MenuItem): MouseEventHandler<HTMLButtonElement> =>
  //   (event) => {
  //     setLanguageLink(item);
  //     closeLinks();
  //   };

  // const languageButtons = languageMenuItems.map((item) => (
  //   <UnstyledButton
  //     key={item.label}
  //     className={classes.languageButton}
  //     onClick={changeLanguage(item)}
  //   >
  //     <Text size="sm" fw={500}>
  //       {item.label}
  //     </Text>
  //   </UnstyledButton>
  // ));

  // const menu = [
  //   ...menuItems,
  //   { ...languageLink, links: languageMenuItems },
  // ].map((link) => {
  //   const menuItems = link.links?.map((item) => (
  //     <Menu.Item key={item.link} onClick={changeLanguage(item)}>
  //       {item.label}
  //     </Menu.Item>
  //   ));

  //   if (menuItems) {
  //     return (
  //       <Menu
  //         key={link.label}
  //         trigger="click-hover"
  //         closeDelay={400}
  //         position="bottom-start"
  //         withinPortal
  //         onChange={(opened) => {
  //           if (!opened) {
  //             closeLinks();
  //           } else {
  //             openLinks();
  //           }
  //         }}
  //       >
  //         <Menu.Target>
  //           <Anchor
  //             component={Link}
  //             href={link.link}
  //             className={classes.link}
  //             onClick={(event) => event.preventDefault()}
  //           >
  //             <Center>
  //               <LangugeToggle label={link.label} linksOpened={linksOpened} />
  //             </Center>
  //           </Anchor>
  //         </Menu.Target>
  //         <Menu.Dropdown>{menuItems}</Menu.Dropdown>
  //       </Menu>
  //     );
  //   }

  //   return (
  //     <Anchor
  //       key={link.label}
  //       component={Link}
  //       href={link.link}
  //       className={classes.link}
  //     >
  //       {link.label}
  //     </Anchor>
  //   );
  // });

  return (
    <>
      {/* <Container className="h-15">
        <Group justify="space-between" className="h-full">
          <Logo />
          <Group gap="xl">
            <Group gap={5} visibleFrom="sm">
              {menu}
            </Group>
            <ColorSchemeToggle />
            <Burger
              opened={drawerOpened}
              onClick={openDrawer}
              hiddenFrom="sm"
              aria-label="Open navigation"
            />
          </Group>
        </Group>
      </Container>

      <Drawer.Root
        opened={drawerOpened}
        onClose={closeDrawer}
        size="md"
        padding="md"
        hiddenFrom="sm"
        position="top"
      >
        <Drawer.Overlay backgroundOpacity={0.5} blur={4} />
        <Drawer.Content>
          <Drawer.Header>
            <Logo />
            <Group gap="xl">
              <ColorSchemeToggle />
              <Burger
                opened={drawerOpened}
                onClick={closeDrawer}
                aria-label="Close navigation"
              />
            </Group>
          </Drawer.Header>

          <Drawer.Body>
            <ScrollArea mx="-md">
              {menu.slice(0, -1)}
              <UnstyledButton className={classes.link} onClick={toggleLinks}>
                <LangugeToggle
                  label={languageLink.label}
                  linksOpened={linksOpened}
                />
              </UnstyledButton>
              <Collapse in={linksOpened}>{languageButtons}</Collapse>
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root> */}
    </>
  );
}
