import { Contact } from "#components/Footer/Contact";
import { Marquee } from "#components/Marquee";
import { Footer as FooterProps } from "#types/payload";
import { FooterNavigation } from "./FooterNavigation";

export function Footer(props: Readonly<FooterProps>) {
  const { titles, contacts, social, navigation, form } = props;

  return (
    <footer>
      {titles && <Marquee titles={titles} />}

      {(form || []).length > 0 &&
        contacts &&
        Object.keys(contacts).length > 0 &&
        (social?.socialItems || []).length > 0 && (
          <Contact contacts={contacts} social={social} form={form} />
        )}

      {navigation?.navItems && navigation.navItems.length > 0 && (
        <FooterNavigation navigation={navigation} />
      )}
    </footer>
  );
}
