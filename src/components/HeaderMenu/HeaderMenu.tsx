"use client";

import { ColorSchemeToggle } from "../ColorSchemeToggle";
import {
  HoverCard,
  Group,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Menu,
  Container,
} from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { IconCode, IconCoin, IconChevronDown } from "@tabler/icons-react";
import classes from "./HeaderMenu.module.css";
import { Logo } from "../Logo";

const links = [
  { link: "/about", label: "Features" },
  {
    link: "#1",
    label: "Learn",
    links: [
      { link: "/docs", label: "Documentation" },
      { link: "/resources", label: "Resources" },
      { link: "/community", label: "Community" },
      { link: "/blog", label: "Blog" },
    ],
  },
  { link: "/about", label: "About" },
  { link: "/pricing", label: "Pricing" },
  {
    link: "#2",
    label: "Support",
    links: [
      { link: "/faq", label: "FAQ" },
      { link: "/demo", label: "Book a demo" },
      { link: "/forums", label: "Forums" },
    ],
  },
];

const languages = [
  {
    title: "Portuguese",
  },
  {
    title: "German",
  },
];

export function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks, open, close }] =
    useDisclosure(false);
  const theme = useMantineTheme();

  const languageButtons = languages.map((item) => (
    <UnstyledButton className={classes.languageButton} key={item.title}>
      <Text size="sm" fw={500}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  const langugeToggle = (
    <Center inline>
      <Box component="span" mr={5}>
        English
      </Box>
      <IconChevronDown
        style={{
          width: rem(16),
          height: rem(16),
          transform: `rotate(${linksOpened ? 180 : 0}deg)`,
        }}
        color={theme.black}
      />
    </Center>
  );

  return (
    <>
      <Container className={classes.root}>
        <Group justify="space-between" h="100%">
          <Logo />

          <Group gap="xl">
            <Group h="100%" gap={0} visibleFrom="sm">
              <Anchor href="#" component={Link} c="primary">
                Blog
              </Anchor>
              <Anchor href="#" className={classes.link}>
                Contact
              </Anchor>
              <HoverCard
                width={280}
                position="bottom"
                shadow="md"
                withinPortal
                onOpen={open}
                onClose={close}
              >
                <HoverCard.Target>
                  <UnstyledButton className={classes.link}>
                    {langugeToggle}
                  </UnstyledButton>
                </HoverCard.Target>
                <HoverCard.Dropdown className={classes.hoverCardDropdown}>
                  {languageButtons}
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>

            <ColorSchemeToggle />

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Group>
      </Container>

      <Drawer.Root
        opened={drawerOpened}
        onClose={closeDrawer}
        size="xs"
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
              <Drawer.CloseButton />
            </Group>
          </Drawer.Header>

          <Drawer.Body>
            <ScrollArea mx="-md">
              <Anchor href="#" className={classes.link}>
                Blog
              </Anchor>
              <Anchor href="#" className={classes.link}>
                Contact
              </Anchor>
              <UnstyledButton className={classes.link} onClick={toggleLinks}>
                {langugeToggle}
              </UnstyledButton>
              <Collapse in={linksOpened}>{languageButtons}</Collapse>
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}

// export function HeaderMenu() {
//   const [opened, { toggle }] = useDisclosure(false);

//   const items = links.map((link) => {
//     const menuItems = link.links?.map((item) => (
//       <Menu.Item key={item.link}>{item.label}</Menu.Item>
//     ));

//     if (menuItems) {
//       return (
//         <Menu
//           key={link.label}
//           trigger="hover"
//           transitionProps={{ exitDuration: 0 }}
//           withinPortal
//         >
//           <Menu.Target>
//             <a
//               href={link.link}
//               className={classes.link}
//               onClick={(event) => event.preventDefault()}
//             >
//               <Center>
//                 <span className={classes.linkLabel}>{link.label}</span>
//                 <IconChevronDown size="0.9rem" stroke={1.5} />
//               </Center>
//             </a>
//           </Menu.Target>
//           <Menu.Dropdown>{menuItems}</Menu.Dropdown>
//         </Menu>
//       );
//     }

//     return (
//       <a
//         key={link.label}
//         href={link.link}
//         className={classes.link}
//         onClick={(event) => event.preventDefault()}
//       >
//         {link.label}
//       </a>
//     );
//   });

//   return (
//     <Container size="md">
//       <div className={classes.inner}>
//         <Link href="/" className={classes.linkMain}>
//           Mikhail Balin
//         </Link>
//         <ColorSchemeToggle />
//         <Group gap={5} visibleFrom="sm">
//           {items}
//         </Group>
//         <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
//       </div>
//     </Container>
//   );
// }
