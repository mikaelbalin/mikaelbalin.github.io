import { Config } from "payload";
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  InlineCodeFeature,
  HeadingFeature,
  SuperscriptFeature,
  SubscriptFeature,
  OrderedListFeature,
  UnorderedListFeature,
  StrikethroughFeature,
} from "@payloadcms/richtext-lexical";

export const defaultLexical: Config["editor"] = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({
        enabledCollections: ["pages", "posts"],
      }),
      InlineCodeFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
      SuperscriptFeature(),
      SubscriptFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      StrikethroughFeature(),
    ];
  },
});
