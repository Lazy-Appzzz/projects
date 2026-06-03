import { defineConfig } from "tinacms";

const cardFields = [
  { name: "title", label: "Title", type: "string" },
  {
    name: "statusColor",
    label: "Status Color",
    type: "string",
    options: ["red", "green", "orange"],
  },
  { name: "statusText", label: "Status Text", type: "string" },
  { name: "subtitle", label: "Subtitle", type: "string" },
  {
    name: "description",
    label: "Description",
    type: "string",
    ui: { component: "textarea" },
  },
  { name: "image", label: "Image", type: "string" },
  { name: "bgImage", label: "Background Image", type: "string" },
  { name: "link", label: "Link", type: "string" },
  { name: "githubLink", label: "GitHub Link", type: "string" },
  { name: "mockupWidth", label: "Mockup Width", type: "number" },
  { name: "imgTransform", label: "Image Transform", type: "string" },
  { name: "sticker", label: "Sticker", type: "string" },
];

const detailFields = [
  { name: "title", label: "Title", type: "string" },
  {
    name: "statusColor",
    label: "Status Color",
    type: "string",
    options: ["red", "green", "orange"],
  },
  { name: "statusText", label: "Status Text", type: "string" },
  { name: "link", label: "Link", type: "string" },
  { name: "iconKey", label: "Icon Key", type: "string" },
  { name: "cardId", label: "Card ID", type: "string" },
  { name: "githubLink", label: "GitHub Link", type: "string" },
  { name: "mockupWidth", label: "Mockup Width", type: "number" },
  { name: "button", label: "Button", type: "boolean" },
  { name: "buttonText", label: "Button Text", type: "string" },
  { name: "incomplete", label: "Incomplete", type: "string" },
  {
    name: "mockupImages",
    label: "Mockup Images",
    type: "object",
    list: true,
    ui: {
      itemProps: (item) => ({ label: item?.caption?.slice(0, 40) ?? "Image" }),
    },
    fields: [
      { name: "id", label: "ID", type: "number" },
      { name: "src", label: "Src", type: "string" },
      { name: "alt", label: "Alt", type: "string" },
      { name: "caption", label: "Caption", type: "string" },
    ],
  },
  {
    name: "features",
    label: "Features",
    type: "string",
    list: true,
  },
  {
    name: "stats",
    label: "Stats",
    type: "object",
    list: true,
    fields: [
      { name: "label", label: "Label", type: "string" },
      { name: "value", label: "Value", type: "string" },
    ],
  },
];

const projectCategoryField = (name, label) => ({
  name,
  label,
  type: "object",
  list: true,
  ui: {
    itemProps: (item) => ({ label: item?.card?.title ?? "Untitled" }),
  },
  fields: [
    { name: "card", label: "Card", type: "object", fields: cardFields },
    { name: "detail", label: "Detail", type: "object", fields: detailFields },
  ],
});

export default defineConfig({
  branch:
    process.env.TINA_BRANCH ??
    process.env.VERCEL_GIT_COMMIT_REF ??
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: "projects",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "projects",
        label: "Projects",
        path: "data",
        format: "json",
        match: { include: "projects" },
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          projectCategoryField("webApps", "Web Apps"),
          projectCategoryField("webGames", "Web Games"),
          projectCategoryField("mobileApps", "Mobile Apps"),
          projectCategoryField("appGames", "App Games"),
        ],
      },
    ],
  },
});
