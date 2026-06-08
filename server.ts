/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Initialize GoogleGenAI with secure lazy checks and User-Agent telemetry
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing in project secrets");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "15mb" }));

  // API endpoint for converting text to beautiful mobile UI
  app.post("/api/generate-design", async (req, res) => {
    const { prompt, canvasTheme } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Plain text prompt has not been specified" });
    }

    try {
      const ai = getAiClient();
      
      const systemInstruction = `You are a world-class UI/UX mobile product designer and mobile layout architect, similar to professional designers on Figma.
Your job is to generate visually stunning, complete, modern mobile interface prototypes from a user's textual description.
You MUST output high-fidelity screen mockups that contain appropriate elements that flow beautifully, structured neatly.

DESIGN GUIDELINES:
1. Grid / Spacing: Each screen has width 375 and height 812. Layout standard elements cleanly. 
   - Top status-bar area: Reserve y=0 to y=44 (do not draw standard device indicators here; the app will render realistic iOS indicators; just start your active page content headers from y=50 or header cards from y=0 if they are full bleeds).
   - Horizontal margins: Set alignment columns nicely, typically 16px or 20px padding from edges (x=16 or x=20 for left aligned column elements, and element widths around 335-343px for full stretch, or smaller for grids).
   - Scroll & Flow: Lay out your controls vertically down the page within standard visible range (usually y=60 up to y=750).
2. Elements & Sizes:
   - Header Bar: Standard height 50-60. Back button or menu icon, header text, filter/actions icon.
   - Hero Cards & Rectangles: Rounded, solid or subtle borders, with proper shadow tags. Standard heights: 120 - 240px.
   - Text Blocks & Hierarchy:
     * Display Title / Brand Header: 24px - 32px
     * Heading / Post Title: 18px - 22px
     * Subheadings: 15px - 17px
     * Body text: 13px - 14px
     * Captions / Meta-labels: 11px - 12px
   - Buttons: Large CTA buttons are height 44-54 with rounded corners (8-16px, or full pill rounding of 24px), centered or margins. Include clear and concise wording like "Continue", "Get Started", "Place Order".
   - Inputs: Height 44-50 with outline, light borders, subtle rounding, placeholder text, and optionally a search icon near left.
3. Complete flows: If the user describes multiple screens (e.g. onboarding, login, checkout), design them as distinct screens (frames). Place them side-by-side on the canvas:
   - First frame at absolute canvas x=0, y=0.
   - Second frame at absolute canvas x=450, y=0.
   - Third frame at absolute canvas x=900, y=0.
   - Fourth frame at absolute canvas x=1350, y=0.
   Keep them aligned on the y axis. Ensure connecting elements are suggested so user can click to navigate between screens (e.g., clicking on 'Get Started' button in index 0 frame navigates to index 1 frame).

Use a theme color palette matching the user's description (light or dark, vibrant or minimal). Ensure text has excellent contrast with container colors (e.g. white text on colored cards, deep brand charcoal on light grey backgrounds). Do not use plain boring red or blue outlines unless specified: use gorgeous, modern slate shades, pastel hues, deep violet, royal navy, soft greens, and warm oatmeals.`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          themeName: { type: Type.STRING },
          primaryHex: { type: Type.STRING, description: "Primary hex theme color, e.g. #7C3AED" },
          secondaryHex: { type: Type.STRING, description: "Secondary brand hex theme color, e.g. #F5F3FF" },
          textColorHex: { type: Type.STRING, description: "Recommended text focus color, e.g. #1F2937 or #F9FAFB" },
          frames: {
            type: Type.ARRAY,
            description: "List of mobile app frames to draw side-by-side on the canvas.",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name of mobile viewport page, e.g. Onboarding, Login Feed, Product Details" },
                bgColor: { type: Type.STRING, description: "Solid hex background of the window, fitting user layout vibe (e.g., #FFFFFF for standard, #0B0F19 for modern midnight)" },
                components: {
                  type: Type.ARRAY,
                  description: "Full list of layered layout components on this page",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      type: { 
                        type: Type.STRING, 
                        enum: ["text", "button", "input", "rect", "image", "icon", "card"],
                        description: "Standard visual component types" 
                      },
                      name: { type: Type.STRING, description: "Layer label name in Figma sidebar, e.g. Welcome Text, Background Card, Checkout CTA" },
                      x: { type: Type.NUMBER, description: "Relative visual horizontal coordinate inside 375x812 viewport context (0-375)" },
                      y: { type: Type.NUMBER, description: "Relative visual vertical coordinate inside 375x812 viewport context (0-812)" },
                      width: { type: Type.NUMBER, description: "Layout scale width (px)" },
                      height: { type: Type.NUMBER, description: "Layout scale height (px)" },
                      value: { type: Type.STRING, description: "Visual label string, button caption, placeholder, key, icon name, image search modifier" },
                      fontSize: { type: Type.NUMBER, description: "Font sizing in px. Range (10 to 36)" },
                      fontWeight: { type: Type.STRING, enum: ["normal", "medium", "bold"], description: "Font weight bolding" },
                      align: { type: Type.STRING, enum: ["left", "center", "right"], description: "Visual alignment text alignment" },
                      textColor: { type: Type.STRING, description: "Component text color hex" },
                      bgColor: { type: Type.STRING, description: "Shape or component content fill hex" },
                      borderColor: { type: Type.STRING, description: "Optional border styling line hex" },
                      borderWidth: { type: Type.NUMBER, description: "Zero or greater border thickness line px" },
                      borderRadius: { type: Type.NUMBER, description: "Visual layer corner rounding radius (px)" },
                      shadow: { type: Type.STRING, enum: ["none", "sm", "md", "lg", "xl"] },
                      iconName: { type: Type.STRING, description: "Lucide icon keyword corresponding to standard Lucide icons, e.g., home, user, arrow-right, shopping-cart, heart, star, settings, bell, search, x, plus, minus, lock, mail, play, check" },
                      imageKeyword: { type: Type.STRING, description: "Keyword modifiers for premium illustrations/photos, e.g., sneakers, avatar-girl, modern-kitchen, landscape, charts" }
                    },
                    required: ["type", "name", "x", "y", "width", "height"]
                  }
                }
              },
              required: ["name", "bgColor", "components"]
            }
          },
          suggestedLinks: {
            type: Type.ARRAY,
            description: "Connections indicating prototype navigation flows.",
            items: {
              type: Type.OBJECT,
              properties: {
                fromFrameIndex: { type: Type.INTEGER, description: "Trigger layout index of frame source screen" },
                fromComponentIndex: { type: Type.INTEGER, description: "Trigger visual index of layout component inside the frame components list that triggers action" },
                toFrameIndex: { type: Type.INTEGER, description: "Layout index of the destination target frame screen" }
              },
              required: ["fromFrameIndex", "fromComponentIndex", "toFrameIndex"]
            }
          }
        },
        required: ["themeName", "primaryHex", "secondaryHex", "textColorHex", "frames"]
      };

      const contents = `Create mobile layout designer prototypes based exactly on this prompt: "${prompt}". 
Take into account the canvas UI theme is currently styled as: "${canvasTheme || 'light'}".
Provide multiple connected screens if the task indicates a user flow (like search->list->details with navigation triggers), positioning each screen properly next to each other on the vector axis (0, 450, 900, etc.) so they look exactly like frames side-by-side on a Figma visual artboard. Make sure that they look visually clean, fully designed, colorful, stylish, and premium! Ensure every component has excellent relative coordinates and looks like a finished, production app UI, not an empty block. For example, fill cards with miniature titles, descriptions, buttons, icons, or badges.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Unable to extract valid text from generative content response");
      }

      res.json(JSON.parse(responseText.trim()));
    } catch (err: any) {
      console.error("AI Generation Error: ", err);
      res.status(500).json({ error: err?.message || "An unexpected error occurred while generating layout designs." });
    }
  });

  // Serve static assets and bundle React
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mobile UI Canvas Server running on http://localhost:${PORT}`);
  });
}

startServer();
