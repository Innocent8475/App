/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UIComponent {
  id: string;
  type: 'text' | 'button' | 'input' | 'rect' | 'image' | 'icon' | 'card';
  name: string; // Layer label in the layers panel
  x: number; // relative to the frame
  y: number; // relative to the frame
  width: number;
  height: number;
  value?: string; // Text content, button label, input placeholder, icon keyword
  fontSize?: number;
  fontWeight?: 'normal' | 'medium' | 'bold';
  align?: 'left' | 'center' | 'right';
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  iconName?: string; // e.g. "heart", "search", "arrow-right", "user"
  imageKeyword?: string; // used for generating placeholder unplash imagery (e.g. "avatar", "scenery")
}

export interface UIFrame {
  id: string;
  name: string;
  x: number; // Absolute canvas X
  y: number; // Absolute canvas Y
  width: number;
  height: number;
  bgColor: string;
  deviceType: 'ios' | 'android';
  components: UIComponent[];
}

export interface PrototypeLink {
  id: string;
  fromFrameId: string;
  fromComponentId: string;
  toFrameId: string;
}

export interface CanvasState {
  frames: UIFrame[];
  links: PrototypeLink[];
  zoom: number;
  panX: number;
  panY: number;
  selectedFrameId?: string;
  selectedComponentId?: string;
  activeTool: 'select' | 'frame' | 'text' | 'button' | 'input' | 'rect' | 'image' | 'icon' | 'card' | 'prototype';
  showLayers: boolean;
  showInspector: boolean;
  previewMode: boolean; // Running/Interacting as an app rather than editing
  canvasTheme: 'light' | 'dark';
}
