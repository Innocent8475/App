/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Loader2,
  ArrowRight,
  Play,
  Eye,
  Layers,
  Settings,
  Plus,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Palette,
  Download,
  Code,
  Check,
  Smartphone,
  Move,
  MousePointer,
  Share2,
  ChevronRight,
  Menu,
  HelpCircle,
  Bell,
  Send,
  User,
  Heart,
  Star,
  Search,
  Lock,
  PlusCircle,
  Clock,
  Battery,
  Wifi,
  Grid,
  Moon,
  Sun,
  Copy,
  EyeOff,
  CornerDownRight,
  Undo
} from 'lucide-react';
import { UIFrame, UIComponent, PrototypeLink, CanvasState } from './types';
import PromptConsole from './components/PromptConsole';

// Predefined iconic vectors mapping
const renderCustomIcon = (name: string, className?: string) => {
  const normalized = name.toLowerCase().trim();
  switch (true) {
    case normalized.includes('heart'):
      return <Heart className={className || "w-4 h-4"} />;
    case normalized.includes('star'):
      return <Star className={className || "w-4 h-4"} />;
    case normalized.includes('search'):
      return <Search className={className || "w-4 h-4"} />;
    case normalized.includes('bell'):
      return <Bell className={className || "w-4 h-4"} />;
    case normalized.includes('user') || normalized.includes('avatar'):
      return <User className={className || "w-4 h-4"} />;
    case normalized.includes('lock') || normalized.includes('key'):
      return <Lock className={className || "w-4 h-4"} />;
    case normalized.includes('send') || normalized.includes('arrow-right'):
      return <ArrowRight className={className || "w-4 h-4"} />;
    case normalized.includes('plus'):
      return <Plus className={className || "w-4 h-4"} />;
    default:
      return <Sparkles className={className || "w-4 h-4"} />;
  }
};

// Initial beautiful travel and exploration prototype boards pre-loaded for immediate high-density interaction
const INITIAL_FRAMES: UIFrame[] = [
  {
    id: 'f-1',
    name: '1. Onboarding Splash',
    x: 80,
    y: 80,
    width: 375,
    height: 812,
    bgColor: '#FAF9F6',
    deviceType: 'ios',
    components: [
      {
        id: 'c-1-1',
        type: 'rect',
        name: 'Curved Header Background',
        x: 0,
        y: 0,
        width: 375,
        height: 480,
        bgColor: '#1E293B',
        borderRadius: 40
      },
      {
        id: 'c-1-2',
        type: 'image',
        name: 'Cover Scenic Image',
        x: 20,
        y: 20,
        width: 335,
        height: 380,
        borderRadius: 28,
        imageKeyword: 'tropical island sunset'
      },
      {
        id: 'c-1-3',
        type: 'text',
        name: 'Splash Header text',
        x: 24,
        y: 430,
        width: 327,
        height: 90,
        value: 'Explore the wild nature freely.',
        fontSize: 32,
        fontWeight: 'bold',
        textColor: '#0F172A',
        align: 'left'
      },
      {
        id: 'c-1-4',
        type: 'text',
        name: 'Tagline subtitle',
        x: 24,
        y: 535,
        width: 327,
        height: 48,
        value: 'Discover highly curated scenic getaways that sync with your adventurous personality.',
        fontSize: 14,
        textColor: '#475569',
        align: 'left'
      },
      {
        id: 'c-1-5',
        type: 'button',
        name: 'Next CTA Button',
        x: 24,
        y: 640,
        width: 327,
        height: 52,
        value: 'Get Started',
        bgColor: '#0D99FF',
        textColor: '#FFFFFF',
        borderRadius: 16,
        fontWeight: 'bold'
      },
      {
        id: 'c-1-6',
        type: 'text',
        name: 'Terms and Privacy',
        x: 24,
        y: 710,
        width: 327,
        height: 30,
        value: 'By joining you agree to tour policies.',
        fontSize: 11,
        textColor: '#94A3B8',
        align: 'center'
      }
    ]
  },
  {
    id: 'f-2',
    name: '2. Destination Search',
    x: 540,
    y: 80,
    width: 375,
    height: 812,
    bgColor: '#FAF9F6',
    deviceType: 'ios',
    components: [
      {
        id: 'c-2-1',
        type: 'text',
        name: 'Greeting intro',
        x: 24,
        y: 65,
        width: 200,
        height: 18,
        value: 'Welcome back explorer 👋',
        fontSize: 12,
        textColor: '#64748B'
      },
      {
        id: 'c-2-2',
        type: 'text',
        name: 'Location Header',
        x: 24,
        y: 84,
        width: 240,
        height: 28,
        value: 'Santorini, Greece',
        fontSize: 20,
        fontWeight: 'bold',
        textColor: '#0F172A'
      },
      {
        id: 'c-2-3',
        type: 'icon',
        name: 'Notification bell icon',
        x: 325,
        y: 76,
        width: 24,
        height: 24,
        iconName: 'bell',
        textColor: '#0F172A'
      },
      {
        id: 'c-2-4',
        type: 'input',
        name: 'Filter Search Input',
        x: 24,
        y: 130,
        width: 327,
        height: 48,
        value: '🔍 Search historical islands, cities...',
        bgColor: '#F1F5F9',
        textColor: '#94A3B8',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0'
      },
      {
        id: 'c-2-5',
        type: 'text',
        name: 'Grid Section title',
        x: 24,
        y: 195,
        width: 200,
        height: 18,
        value: 'Popular Highlights',
        fontSize: 16,
        fontWeight: 'bold',
        textColor: '#0F172A'
      },
      {
        id: 'c-2-6',
        type: 'card',
        name: 'Oia Sunset Resort Card',
        x: 24,
        y: 225,
        width: 327,
        height: 230,
        bgColor: '#FFFFFF',
        borderRadius: 20,
        shadow: 'md'
      },
      {
        id: 'c-2-7',
        type: 'image',
        name: 'Thumbnail image',
        x: 36,
        y: 237,
        width: 303,
        height: 130,
        borderRadius: 14,
        imageKeyword: 'greek sea hotel'
      },
      {
        id: 'c-2-8',
        type: 'text',
        name: 'Thumbnail title text',
        x: 38,
        y: 382,
        width: 240,
        height: 20,
        value: 'The Oia Caldera Resort',
        fontSize: 15,
        fontWeight: 'bold',
        textColor: '#0F172A'
      },
      {
        id: 'c-2-9',
        type: 'text',
        name: 'Thumbnail specifications',
        x: 38,
        y: 404,
        width: 140,
        height: 16,
        value: '⭐ 5.0 • Santorini • $280/night',
        fontSize: 12,
        textColor: '#64748B'
      },
      {
        id: 'c-2-10',
        type: 'icon',
        name: 'Wishlist star icon',
        x: 310,
        y: 382,
        width: 20,
        height: 20,
        iconName: 'heart',
        textColor: '#EF4444'
      },
      {
        id: 'c-2-11',
        type: 'button',
        name: 'Reserve Button link',
        x: 24,
        y: 475,
        width: 327,
        height: 52,
        value: 'Review Reservation Details',
        bgColor: '#1E293B',
        textColor: '#FFFFFF',
        borderRadius: 16,
        fontWeight: 'bold'
      },
      {
        id: 'c-2-12',
        type: 'rect',
        name: 'Promotion Banner block',
        x: 24,
        y: 550,
        width: 327,
        height: 100,
        bgColor: '#E0F2FE',
        borderRadius: 16
      },
      {
        id: 'c-2-13',
        type: 'text',
        name: 'Promotion header text',
        x: 40,
        y: 570,
        width: 250,
        height: 20,
        value: 'Get 25% Summer rebate!',
        fontSize: 14,
        fontWeight: 'bold',
        textColor: '#0369A1'
      },
      {
        id: 'c-2-14',
        type: 'text',
        name: 'Promotion explanation sub',
        x: 40,
        y: 592,
        width: 250,
        height: 30,
        value: 'Book until June 30 with promotional code ADVENTURE2026',
        fontSize: 11,
        textColor: '#0284C7'
      }
    ]
  },
  {
    id: 'f-3',
    name: '3. Booking Checkout',
    x: 1000,
    y: 80,
    width: 375,
    height: 812,
    bgColor: '#FAF9F6',
    deviceType: 'ios',
    components: [
      {
        id: 'c-3-1',
        type: 'text',
        name: 'Workflow page label',
        x: 24,
        y: 65,
        width: 327,
        height: 28,
        value: 'Booking checkout overview',
        fontSize: 18,
        fontWeight: 'bold',
        textColor: '#0F172A',
        align: 'left'
      },
      {
        id: 'c-3-2',
        type: 'rect',
        name: 'Pricing summary box',
        x: 24,
        y: 115,
        width: 327,
        height: 160,
        bgColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0'
      },
      {
        id: 'c-3-3',
        type: 'text',
        name: 'Pricing entry 1',
        x: 40,
        y: 135,
        width: 295,
        height: 18,
        value: 'Oia Villa (4 nights)      $1,120',
        fontSize: 13,
        textColor: '#475569'
      },
      {
        id: 'c-3-4',
        type: 'text',
        name: 'Pricing entry 2',
        x: 40,
        y: 165,
        width: 295,
        height: 18,
        value: 'Tourism government levy    $45',
        fontSize: 13,
        textColor: '#475569'
      },
      {
        id: 'c-3-5',
        type: 'text',
        name: 'Pricing entry 3',
        x: 40,
        y: 195,
        width: 295,
        height: 18,
        value: 'Figma Canvas special discount   -$120',
        fontSize: 13,
        textColor: '#10B981'
      },
      {
        id: 'c-3-6',
        type: 'text',
        name: 'Total Pricing text',
        x: 40,
        y: 230,
        width: 295,
        height: 22,
        value: 'Estimated Due Total      $1,045',
        fontSize: 15,
        fontWeight: 'bold',
        textColor: '#1E293B'
      },
      {
        id: 'c-3-7',
        type: 'text',
        name: 'Payment Method header',
        x: 24,
        y: 295,
        width: 200,
        height: 18,
        value: 'Payment selection',
        fontSize: 14,
        fontWeight: 'bold',
        textColor: '#1E293B'
      },
      {
        id: 'c-3-8',
        type: 'rect',
        name: 'Active Card visual card',
        x: 24,
        y: 325,
        width: 327,
        height: 180,
        bgColor: '#0F172A',
        borderRadius: 20
      },
      {
        id: 'c-3-9',
        type: 'text',
        name: 'Credit Card carrier and logo',
        x: 44,
        y: 345,
        width: 200,
        height: 20,
        value: 'Adventure Gold Credit',
        fontSize: 14,
        fontWeight: 'medium',
        textColor: '#E2E8F0'
      },
      {
        id: 'c-3-10',
        type: 'text',
        name: 'Credit digits text',
        x: 44,
        y: 395,
        width: 280,
        height: 24,
        value: '••••  ••••  ••••  8824',
        fontSize: 18,
        fontWeight: 'bold',
        textColor: '#F8FAFC'
      },
      {
        id: 'c-3-11',
        type: 'text',
        name: 'Credit Card cardholder',
        x: 44,
        y: 445,
        width: 150,
        height: 16,
        value: 'Johnathan Doe',
        fontSize: 11,
        textColor: '#94A3B8'
      },
      {
        id: 'c-3-12',
        type: 'text',
        name: 'Credit Expiry specs',
        x: 280,
        y: 445,
        width: 50,
        height: 16,
        value: '08 / 29',
        fontSize: 11,
        textColor: '#94A3B8',
        align: 'right'
      },
      {
        id: 'c-3-13',
        type: 'button',
        name: 'Submit CTA Action',
        x: 24,
        y: 670,
        width: 327,
        height: 52,
        value: 'Confirm and Pay $1,045',
        bgColor: '#10B981',
        textColor: '#FFFFFF',
        borderRadius: 16,
        fontWeight: 'bold'
      }
    ]
  }
];

const INITIAL_LINKS: PrototypeLink[] = [
  { id: 'l-1', fromFrameId: 'f-1', fromComponentId: 'c-1-5', toFrameId: 'f-2' },
  { id: 'l-2', fromFrameId: 'f-2', fromComponentId: 'c-2-11', toFrameId: 'f-3' }
];

export default function App() {
  // Canvas states
  const [frames, setFrames] = useState<UIFrame[]>(INITIAL_FRAMES);
  const [links, setLinks] = useState<PrototypeLink[]>(INITIAL_LINKS);
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(100);
  const [panY, setPanY] = useState<number>(40);
  
  // Selections
  const [selectedFrameId, setSelectedFrameId] = useState<string | undefined>('f-1');
  const [selectedComponentId, setSelectedComponentId] = useState<string | undefined>('c-1-5');
  
  // Editing and interface preferences
  const [activeTool, setActiveTool] = useState<CanvasState['activeTool']>('select');
  const [showLayers, setShowLayers] = useState<boolean>(true);
  const [showInspector, setShowInspector] = useState<boolean>(true);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [canvasTheme, setCanvasTheme] = useState<'light' | 'dark'>('dark');
  
  // Simulated Interactive simulator state
  const [simulatorFrameId, setSimulatorFrameId] = useState<string>('f-1');
  const [simulatorNavHistory, setSimulatorNavHistory] = useState<string[]>(['f-1']);

  // API generation flow indicator
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Layout Export overlay
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showPrototypeLinkCreatorModal, setShowPrototypeLinkCreatorModal] = useState<boolean>(false);

  // Tracking drags and viewport panning
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState<boolean>(false);
  const [canvasDragStart, setCanvasDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [canvasPanStart, setCanvasPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Tracking component dragging within frame viewports
  const [draggingComponent, setDraggingComponent] = useState<{
    frameId: string;
    componentId: string;
    startX: number;
    startY: number;
    initialComponentX: number;
    initialComponentY: number;
  } | null>(null);

  const selectedFrame = frames.find(f => f.id === selectedFrameId);
  const selectedComponent = selectedFrame?.components.find(c => c.id === selectedComponentId);

  // Sync canvas theme or reset defaults
  useEffect(() => {
    // Automatically center preview on load
    const screenWidth = window.innerWidth;
    if (screenWidth > 1200) {
      setPanX(Math.round((screenWidth - 1000) / 2));
    }
  }, []);

  // Handle generative mobile UI design request via system AI API call
  const handleGenerateDesign = async (promptText: string) => {
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const response = await fetch('/api/generate-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, canvasTheme }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: Failed to invoke UI designer engine api model.`);
      }

      const generatedData = await response.json();
      if (generatedData.error) {
        throw new Error(generatedData.error);
      }

      // Convert generated frames into layout state
      if (generatedData.frames && generatedData.frames.length > 0) {
        const parsedFrames: UIFrame[] = generatedData.frames.map((f: any, idx: number) => {
          const frameId = `f-g-${Date.now()}-${idx}`;
          const components: UIComponent[] = (f.components || []).map((c: any, cidx: number) => ({
            id: `c-g-${Date.now()}-${idx}-${cidx}`,
            type: c.type || 'text',
            name: c.name || `Layer ${cidx + 1}`,
            x: Number(c.x) ?? 20,
            y: Number(c.y) ?? 50,
            width: Number(c.width) ?? 100,
            height: Number(c.height) ?? 40,
            value: c.value || '',
            fontSize: c.fontSize ? Number(c.fontSize) : undefined,
            fontWeight: c.fontWeight || 'normal',
            align: c.align || 'left',
            textColor: c.textColor || undefined,
            bgColor: c.bgColor || undefined,
            borderColor: c.borderColor || undefined,
            borderWidth: c.borderWidth ? Number(c.borderWidth) : undefined,
            borderRadius: c.borderRadius ? Number(c.borderRadius) : undefined,
            shadow: c.shadow || 'none',
            iconName: c.iconName || undefined,
            imageKeyword: c.imageKeyword || undefined,
          }));

          return {
            id: frameId,
            name: f.name || `Generated Screen ${idx + 1}`,
            x: idx * 430 + 80,
            y: 80,
            width: 375,
            height: 812,
            bgColor: f.bgColor || '#FFFFFF',
            deviceType: 'ios',
            components
          };
        });

        // Set up links if any suggested Links are returned
        const parsedLinks: PrototypeLink[] = [];
        if (generatedData.suggestedLinks && generatedData.suggestedLinks.length > 0) {
          generatedData.suggestedLinks.forEach((link: any, idx: number) => {
            const fromF = parsedFrames[link.fromFrameIndex];
            const toF = parsedFrames[link.toFrameIndex];
            if (fromF && toF) {
              const triggerComp = fromF.components[link.fromComponentIndex || 0];
              if (triggerComp) {
                parsedLinks.push({
                  id: `l-g-${Date.now()}-${idx}`,
                  fromFrameId: fromF.id,
                  fromComponentId: triggerComp.id,
                  toFrameId: toF.id
                });
              }
            }
          });
        }

        setFrames(parsedFrames);
        setLinks(parsedLinks);
        
        // Select first item
        if (parsedFrames[0]) {
          setSelectedFrameId(parsedFrames[0].id);
          if (parsedFrames[0].components[0]) {
            setSelectedComponentId(parsedFrames[0].components[0].id);
          } else {
            setSelectedComponentId(undefined);
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || 'Error occurred generating elements.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Canvas Viewport Pan Controls handle mouse events
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // If we're dragging a component, ignore this
    if (draggingComponent) return;
    
    // Only drag with middle click, Space pressed, or Select/Move active tool
    if (e.button === 1 || activeTool === 'frame' || e.target === canvasRef.current || (e.target as HTMLElement).classList.contains('canvas-background')) {
      setIsDraggingCanvas(true);
      setCanvasDragStart({ x: e.clientX, y: e.clientY });
      setCanvasPanStart({ x: panX, y: panY });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDraggingCanvas) {
      const dx = e.clientX - canvasDragStart.x;
      const dy = e.clientY - canvasDragStart.y;
      setPanX(canvasPanStart.x + dx);
      setPanY(canvasPanStart.y + dy);
    } else if (draggingComponent) {
      // Direct drag updates within mobile frame viewport
      const dx = e.clientX - draggingComponent.startX;
      const dy = e.clientY - draggingComponent.startY;
      
      // Divide offset by current zoom to stay aligned
      const scaledDx = Math.round(dx / zoom);
      const scaledDy = Math.round(dy / zoom);

      setFrames(prevFrames =>
        prevFrames.map(f => {
          if (f.id === draggingComponent.frameId) {
            return {
              ...f,
              components: f.components.map(c => {
                if (c.id === draggingComponent.componentId) {
                  return {
                    ...c,
                    x: Math.max(0, Math.min(f.width - c.width, draggingComponent.initialComponentX + scaledDx)),
                    y: Math.max(0, Math.min(f.height - c.height, draggingComponent.initialComponentY + scaledDy))
                  };
                }
                return c;
              })
            };
          }
          return f;
        })
      );
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingCanvas(false);
    setDraggingComponent(null);
  };

  // Add component manually to selected frame
  const handleAddComponent = (type: UIComponent['type']) => {
    if (!selectedFrameId) return;
    
    const newComponent: UIComponent = {
      id: `c-added-${Date.now()}`,
      type,
      name: `${type.toUpperCase()} Layer`,
      x: 36,
      y: 180,
      width: type === 'text' ? 300 : type === 'button' ? 300 : type === 'rect' ? 300 : 80,
      height: type === 'text' ? 50 : type === 'button' ? 50 : type === 'rect' ? 80 : 80,
      value: type === 'text' ? 'New customizable text' : type === 'button' ? 'Action Button' : type === 'input' ? 'Placeholder' : undefined,
      borderRadius: type === 'button' || type === 'input' || type === 'rect' ? 12 : undefined,
      bgColor: type === 'button' ? '#0D99FF' : type === 'input' ? '#F1F5F9' : type === 'rect' ? '#E2E8F0' : undefined,
      textColor: type === 'button' ? '#FFFFFF' : '#0F172A',
      fontSize: type === 'text' ? 15 : undefined,
    };

    setFrames(prev =>
      prev.map(f => {
        if (f.id === selectedFrameId) {
          return {
            ...f,
            components: [...f.components, newComponent]
          };
        }
        return f;
      })
    );
    setSelectedComponentId(newComponent.id);
  };

  // Add a brand-new empty screen/frame to work on
  const handleAddNewFrame = () => {
    const newFrameId = `f-added-${Date.now()}`;
    const nextX = frames.length > 0 ? Math.max(...frames.map(f => f.x)) + 450 : 80;
    
    const newFrame: UIFrame = {
      id: newFrameId,
      name: `Screen ${frames.length + 1}`,
      x: nextX,
      y: 80,
      width: 375,
      height: 812,
      bgColor: '#FAF9F6',
      deviceType: 'ios',
      components: [
        {
          id: `c-added-${Date.now()}-h`,
          type: 'text',
          name: 'Title Header',
          x: 24,
          y: 80,
          width: 327,
          height: 40,
          value: 'New Visual Artboard',
          fontSize: 22,
          fontWeight: 'bold',
          textColor: '#0F172A'
        }
      ]
    };

    setFrames(prev => [...prev, newFrame]);
    setSelectedFrameId(newFrameId);
    setSelectedComponentId(newFrame.components[0].id);
  };

  // Delete Highlighted items
  const handleDeleteSelectedComponent = () => {
    if (!selectedFrameId || !selectedComponentId) return;
    
    // Remove links connected to this component
    setLinks(prev => prev.filter(l => l.fromComponentId !== selectedComponentId));
    
    setFrames(prev =>
      prev.map(f => {
        if (f.id === selectedFrameId) {
          return {
            ...f,
            components: f.components.filter(c => c.id !== selectedComponentId)
          };
        }
        return f;
      })
    );
    setSelectedComponentId(undefined);
  };

  const handleDeleteSelectedFrame = () => {
    if (!selectedFrameId) return;
    if (frames.length <= 1) {
      alert("At least one frame viewport screen must be maintained on the workspace.");
      return;
    }
    
    // Clean links associated
    setLinks(prev => prev.filter(l => l.fromFrameId !== selectedFrameId && l.toFrameId !== selectedFrameId));
    
    const remaining = frames.filter(f => f.id !== selectedFrameId);
    setFrames(remaining);
    setSelectedFrameId(remaining[0].id);
    setSelectedComponentId(remaining[0].components[0]?.id);
  };

  // Handle selection updates inside inspector
  const updateSelectedComponentProperty = (key: keyof UIComponent, val: any) => {
    if (!selectedFrameId || !selectedComponentId) return;
    setFrames(prev =>
      prev.map(f => {
        if (f.id === selectedFrameId) {
          return {
            ...f,
            components: f.components.map(c => {
              if (c.id === selectedComponentId) {
                return { ...c, [key]: val };
              }
              return c;
            })
          };
        }
        return f;
      })
    );
  };

  const updateSelectedFrameProperty = (key: keyof UIFrame, val: any) => {
    if (!selectedFrameId) return;
    setFrames(prev =>
      prev.map(f => {
        if (f.id === selectedFrameId) {
          return { ...f, [key]: val };
        }
        return f;
      })
    );
  };

  // Initiate interactive Prototype Mode Run simulation
  const handleOpenInteractiveSimulator = () => {
    if (frames.length === 0) return;
    setSimulatorFrameId(frames[0].id);
    setSimulatorNavHistory([frames[0].id]);
    setPreviewMode(true);
  };

  // Click handler inside simulated prototype interaction page
  const handleSimulatorElementClick = (componentId: string) => {
    const linkFound = links.find(l => l.fromComponentId === componentId);
    if (linkFound) {
      const destinationScreen = frames.find(f => f.id === linkFound.toFrameId);
      if (destinationScreen) {
        setSimulatorFrameId(destinationScreen.id);
        setSimulatorNavHistory(prev => [...prev, destinationScreen.id]);
      }
    }
  };

  const handleSimulatorGoBack = () => {
    if (simulatorNavHistory.length > 1) {
      const updatedHistory = [...simulatorNavHistory];
      updatedHistory.pop();
      setSimulatorNavHistory(updatedHistory);
      setSimulatorFrameId(updatedHistory[updatedHistory.length - 1]);
    }
  };

  // SVG Helper to find coordinates for Prototype link lines on canvas
  const getComponentCenterAbsolute = (frameId: string, componentId: string) => {
    const frame = frames.find(f => f.id === frameId);
    if (!frame) return { x: 0, y: 0 };
    const comp = frame.components.find(c => c.id === componentId);
    if (!comp) return { x: 0, y: 0 };

    return {
      x: frame.x + comp.x + comp.width / 2,
      y: frame.y + comp.y + comp.height / 2
    };
  };

  const getFrameLeftAbsolute = (frameId: string) => {
    const frame = frames.find(f => f.id === frameId);
    if (!frame) return { x: 0, y: 0 };
    return {
      x: frame.x,
      y: frame.y + frame.height / 2
    };
  };

  // Code Export Utility for users to copy fully layout design formatted to pure responsive Tailwind HTML
  const generateExportableTailwindCode = () => {
    let htmlCode = `<!-- Generated with Mobile Design Prompt Canvas -->\n<!DOCTYPE html>\n<html class="h-full bg-slate-950 font-sans text-slate-100">\n<head>\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body class="min-h-screen py-12 px-4 flex flex-wrap justify-center gap-12">\n`;
    
    frames.forEach((frame) => {
      htmlCode += `\n  <!-- Frame Page: ${frame.name} -->\n  <div class="relative w-[375px] h-[812px] rounded-[48px] overflow-hidden border-[8px] border-slate-900 bg-white shadow-2xl flex flex-col shrink-0" style="background-color: ${frame.bgColor}">\n    <!-- Status Bar -->\n    <div class="flex justify-between items-center px-6 h-11 text-xs font-bold shrink-0 ${frame.bgColor === '#FFFFFF' || frame.bgColor === '#FAF9F6' ? 'text-black' : 'text-white'}">\n      <div>12:30</div>\n      <div class="w-20 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2"></div>\n      <div class="flex gap-1.5 items-center">\n        <span>📶</span><span>🔋</span>\n      </div>\n    </div>\n\n    <!-- Inner Canvas content -->\n    <div class="flex-1 relative overflow-y-auto overflow-x-hidden">\n`;

      frame.components.forEach((c) => {
        const shadowClass = c.shadow === 'md' ? 'shadow-md' : c.shadow === 'lg' ? 'shadow-lg' : c.shadow === 'xl' ? 'shadow-xl' : '';
        const alignmentClass = c.align === 'center' ? 'text-center' : c.align === 'right' ? 'text-right' : 'text-left';
        
        if (c.type === 'text') {
          const fontW = c.fontWeight === 'bold' ? 'font-bold' : c.fontWeight === 'medium' ? 'font-medium' : 'font-normal';
          htmlCode += `      <p class="absolute ${fontW} ${alignmentClass}" style="left: ${c.x}px; top: ${c.y - 44}px; width: ${c.width}px; height: ${c.height}px; font-size: ${c.fontSize || 14}px; color: ${c.textColor || '#0F172A'}">${c.value || ''}</p>\n`;
        } else if (c.type === 'button') {
          htmlCode += `      <button class="absolute flex items-center justify-center font-bold px-4 transition-transform active:scale-95 ${shadowClass}" style="left: ${c.x}px; top: ${c.y - 44}px; width: ${c.width}px; height: ${c.height}px; background-color: ${c.bgColor || '#0D99FF'}; color: ${c.textColor || '#FFFFFF'}; border-radius: ${c.borderRadius || 12}px">${c.value || 'Action'}</button>\n`;
        } else if (c.type === 'input') {
          htmlCode += `      <div class="absolute flex items-center px-4 text-xs select-none border" style="left: ${c.x}px; top: ${c.y - 44}px; width: ${c.width}px; height: ${c.height}px; background-color: ${c.bgColor || '#F1F5F9'}; color: ${c.textColor || '#94A3B8'}; border-radius: ${c.borderRadius || 12}px; border-color: ${c.borderColor || '#E2E8F0'}">${c.value || 'Enter text'}</div>\n`;
        } else if (c.type === 'image') {
          htmlCode += `      <div class="absolute overflow-hidden bg-slate-200" style="left: ${c.x}px; top: ${c.y - 44}px; width: ${c.width}px; height: ${c.height}px; border-radius: ${c.borderRadius || 16}px">\n        <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=375&q=80" alt="${c.imageKeyword || 'placeholder'}" class="w-full h-full object-cover">\n      </div>\n`;
        } else if (c.type === 'icon') {
          htmlCode += `      <div class="absolute flex items-center justify-center" style="left: ${c.x}px; top: ${c.y - 44}px; width: ${c.width}px; height: ${c.height}px; color: ${c.textColor || '#0F172A'}">📱 [Icon: ${c.iconName || 'sparkles'}]</div>\n`;
        } else if (c.type === 'rect') {
          htmlCode += `      <div class="absolute border" style="left: ${c.x}px; top: ${c.y - 44}px; width: ${c.width}px; height: ${c.height}px; background-color: ${c.bgColor || '#E2E8F0'}; border-radius: ${c.borderRadius || 0}px; border-width: ${c.borderWidth || 0}px; border-color: ${c.borderColor || 'transparent'}"></div>\n`;
        } else if (c.type === 'card') {
          htmlCode += `      <div class="absolute ${shadowClass} border" style="left: ${c.x}px; top: ${c.y - 44}px; width: ${c.width}px; height: ${c.height}px; background-color: ${c.bgColor || '#FFFFFF'}; border-radius: ${c.borderRadius || 16}px; border-width: ${c.borderWidth || 0}px; border-color: ${c.borderColor || '#E2E8F0'}"></div>\n`;
        }
      });

      htmlCode += `    </div>\n\n    <!-- Home Indicator -->\n    <div class="h-6 flex justify-center items-center shrink-0">\n      <div class="w-32 h-1 bg-slate-900 rounded-full"></div>\n    </div>\n  </div>\n`;
    });

    htmlCode += `\n</body>\n</html>`;
    return htmlCode;
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Exported responsive Tailwind CSS layout code copied to clipboard successfully!");
  };

  // Helper variables for component link creation
  const [protolinkSourceNode, setProtolinkSourceNode] = useState<{ frameId: string; compId: string } | null>(null);
  const [protolinkDestFrameId, setProtolinkDestFrameId] = useState<string>('');

  const handleCreateCustomProtolink = () => {
    if (!protolinkSourceNode || !protolinkDestFrameId) return;
    const newLink: PrototypeLink = {
      id: `l-added-${Date.now()}`,
      fromFrameId: protolinkSourceNode.frameId,
      fromComponentId: protolinkSourceNode.compId,
      toFrameId: protolinkDestFrameId
    };
    setLinks(prev => [...prev.filter(l => l.fromComponentId !== protolinkSourceNode.compId), newLink]);
    setProtolinkSourceNode(null);
    setShowPrototypeLinkCreatorModal(false);
  };

  return (
    <div className={`h-screen w-screen flex flex-col bg-[#1E1E1E] text-[#E0E0E0] select-none text-sans overflow-hidden`}>
      
      {/* 1. Header Toolbar matches Figma Layout Style */}
      <header className="h-14 border-b border-[#333333] bg-[#2C2C2C] flex items-center justify-between px-4 z-40 shrink-0 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0D99FF] via-purple-600 to-[#F24E1E] flex items-center justify-center text-white font-extrabold text-sm tracking-tighter">
              F
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white uppercase flex items-center gap-1">
                PromptCanvas
                <span className="text-[9px] bg-violet-600 text-white font-medium normal-case px-1.5 py-0.5 rounded-full">Pro</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono -mt-1 font-bold">Design-Engine-v5</span>
            </div>
          </div>
          
          {/* Mode Switcher Buttons */}
          <nav className="flex items-center p-1 bg-[#1A1A1A] rounded-lg border border-[#3A3A3A] gap-1">
            <button
              onClick={() => { setPreviewMode(false); setActiveTool('select'); }}
              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${(!previewMode) ? 'bg-[#3D3D3D] text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              <MousePointer className="w-3.5 h-3.5 text-[#0D99FF]" />
              Design Editor
            </button>
            <button
              onClick={() => { handleOpenInteractiveSimulator(); }}
              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${(previewMode) ? 'bg-[#3D3D3D] text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              <Play className="w-3.5 h-3.5 text-[#10B981] fill-[#10B981]/20" />
              Live Interactive Prototype
            </button>
          </nav>
        </div>

        {/* Zoom & Canvas Preferences Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#1E1E1E] border border-[#333333] rounded-md overflow-hidden text-xs text-gray-300">
            <button
              onClick={() => setZoom(Math.max(0.25, zoom - 0.15))}
              title="Zoom Out"
              className="p-2 hover:bg-[#2C2C2C] border-r border-[#333333] transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1 font-mono">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(2.5, zoom + 0.15))}
              title="Zoom In"
              className="p-2 hover:bg-[#2C2C2C] border-l border-[#333333] transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setZoom(1); setPanX(150); setPanY(50); }}
              title="Fit/Center Canvas Viewport"
              className="p-2 hover:bg-[#2C2C2C] border-l border-[#333333] transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#1E1E1E] p-0.5 rounded-lg border border-[#333333]">
            <button
              onClick={() => setCanvasTheme('dark')}
              className={`p-1.5 rounded ${canvasTheme === 'dark' ? 'bg-[#2E3039] text-violet-400' : 'text-gray-400'}`}
              title="Dark Theme Layout UI"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCanvasTheme('light')}
              className={`p-1.5 rounded ${canvasTheme === 'light' ? 'bg-[#E5E7EB] text-amber-500' : 'text-gray-400'}`}
              title="Light Theme Space Setup"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Core App Actions */}
          <button
            onClick={() => {
              setFrames(INITIAL_FRAMES);
              setLinks(INITIAL_LINKS);
              setSelectedFrameId('f-1');
              setSelectedComponentId('c-1-5');
              alert('Canvas reset to beautiful Santorini Travel Flow template.');
            }}
            className="px-3 py-1.5 bg-[#1F1F1F] text-xs font-semibold hover:bg-[#2F2F2F] text-gray-300 rounded border border-[#383838]"
          >
            Reset Template
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="bg-[#0D99FF] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#0088EE] transition-colors flex items-center gap-1"
          >
            <Code className="w-3.5 h-3.5" />
            Export Code
          </button>
        </div>
      </header>

      {/* 2. Generation AI Prompt Header Console Overlay */}
      <PromptConsole onGenerate={handleGenerateDesign} isGenerating={isGenerating} />

      {/* Main Core split pane workspace containing layers sidebar, interactive canvas workspace, and design properties panel */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* 3. Left Sidebar Panel - Active Frame Layers Structure mapping */}
        {showLayers && (
          <aside className="w-64 border-r border-[#333333] bg-[#2C2C2C] flex flex-col shrink-0 z-10">
            <div className="p-3 border-b border-[#333333] flex justify-between items-center bg-[#252525]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#0D99FF]" />
                Layers Tree View
              </span>
              <button
                onClick={handleAddNewFrame}
                title="Create a modern blank artboard screen"
                className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#3D3D3D] transition-colors"
                id="add-new-frame-btn"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {frames.map((frame, fileIdx) => (
                <div key={frame.id} className="mb-4">
                  {/* Frame parent title bar select selection */}
                  <div
                    onClick={() => {
                      setSelectedFrameId(frame.id);
                      setSelectedComponentId(undefined);
                    }}
                    className={`px-2 py-1.5 flex items-center justify-between rounded-md cursor-pointer group transition-all ${selectedFrameId === frame.id && !selectedComponentId ? 'bg-violet-600/25 text-[#A78BFA] border border-violet-500/20' : 'hover:bg-[#383838] text-gray-200'}`}
                  >
                    <span className="flex items-center gap-2 font-semibold text-xs truncate">
                      <Smartphone className="w-3.5 h-3.5 text-[#0D99FF]" />
                      {frame.name}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedFrameId(frame.id); handleDeleteSelectedFrame(); }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-red-400"
                      title="Delete this screen"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Components contained in this Frame viewport mapping */}
                  <div className="pl-4 mt-1 border-l border-[#3D3D3D] ml-2 flex flex-col gap-0.5">
                    {frame.components.map((comp) => {
                      const isHighlighted = selectedFrameId === frame.id && selectedComponentId === comp.id;
                      const hasActiveLink = links.some(l => l.fromComponentId === comp.id);
                      return (
                        <div
                          key={comp.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFrameId(frame.id);
                            setSelectedComponentId(comp.id);
                          }}
                          className={`px-2 py-1 flex items-center justify-between rounded-md cursor-pointer transition-all ${isHighlighted ? 'bg-[#3D3D3D] text-white border-l-2 border-[#0D99FF]' : 'hover:bg-[#333333] text-gray-400'}`}
                        >
                          <span className="text-[11px] font-medium truncate max-w-[150px] flex items-center gap-1.5">
                            <span className="opacity-60 text-[10px]">
                              {comp.type === 'text' && 'T'}
                              {comp.type === 'button' && '⌗'}
                              {comp.type === 'input' && '⁝'}
                              {comp.type === 'image' && '🖼️'}
                              {comp.type === 'rect' && '▭'}
                              {comp.type === 'icon' && '✦'}
                              {comp.type === 'card' && '🪵'}
                            </span>
                            {comp.name}
                          </span>

                          <div className="flex items-center gap-1">
                            {hasActiveLink && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Connected in prototype interaction link" />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFrameId(frame.id);
                                setSelectedComponentId(comp.id);
                                handleDeleteSelectedComponent();
                              }}
                              className="text-gray-500 hover:text-red-400 p-0.5 transition-colors"
                              title="Delete component layer"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {frame.components.length === 0 && (
                      <span className="text-[10px] text-gray-500 italic pl-2 py-1">No styling layers</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Layout Components Insert Kit */}
            <div className="p-4 border-t border-[#333333] bg-[#242424]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Insert Element Kit
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddComponent('rect')}
                  disabled={!selectedFrameId}
                  className="py-1.5 px-2 rounded bg-[#333] hover:bg-[#3E3E3E] text-[11px] font-medium border border-[#444] transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="text-gray-400 font-bold">▭</span> Rectangle
                </button>
                <button
                  onClick={() => handleAddComponent('text')}
                  disabled={!selectedFrameId}
                  className="py-1.5 px-2 rounded bg-[#333] hover:bg-[#3E3E3E] text-[11px] font-medium border border-[#444] transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="text-emerald-400 font-bold">T</span> Plain Text
                </button>
                <button
                  onClick={() => handleAddComponent('button')}
                  disabled={!selectedFrameId}
                  className="py-1.5 px-2 rounded bg-[#333] hover:bg-[#3E3E3E] text-[11px] font-medium border border-[#444] transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="text-blue-400 font-bold">⌗</span> Action CTA
                </button>
                <button
                  onClick={() => handleAddComponent('input')}
                  disabled={!selectedFrameId}
                  className="py-1.5 px-2 rounded bg-[#333] hover:bg-[#3E3E3E] text-[11px] font-medium border border-[#444] transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="text-amber-400 font-bold">✦</span> Form Input
                </button>
                <button
                  onClick={() => handleAddComponent('image')}
                  disabled={!selectedFrameId}
                  className="py-1.5 px-2 rounded bg-[#333] hover:bg-[#3E3E3E] text-[11px] font-medium border border-[#444] transition-all flex items-center justify-center gap-1 cursor-pointer col-span-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="text-pink-400">🖼️</span> Adaptive Photo
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-2.5 text-center leading-relaxed">
                {!selectedFrameId ? '⚠️ Highlight a screen first to insert components' : 'Drag or adjust properties after placing!'}
              </p>
            </div>
          </aside>
        )}

        {/* 4. Center Main Infinite Movable Vector Space Canvas area */}
        <main
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          className="flex-1 h-full relative overflow-hidden bg-[#1E1E1E] select-none cursor-grab active:cursor-grabbing"
          style={{
            backgroundImage: canvasTheme === 'dark'
              ? 'radial-gradient(#2d2e33 1.2px, transparent 1.2px)'
              : 'radial-gradient(#E2E8F0 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
            backgroundColor: canvasTheme === 'dark' ? '#1E1E1E' : '#F3F4F6'
          }}
        >
          {/* Main Zoom and Panned Canvas Container Wrapper */}
          <div
            className="absolute origin-top-left transition-transform duration-75"
            style={{
              transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            }}
          >
            {/* SVG wires connections between interactive mobile components on the board */}
            <svg className="absolute inset-0 pointer-events-none w-[10000px] h-[10000px] overflow-visible z-10">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0D99FF" />
                </marker>
              </defs>
              
              {links.map((link) => {
                const start = getComponentCenterAbsolute(link.fromFrameId, link.fromComponentId);
                const end = getFrameLeftAbsolute(link.toFrameId);
                
                // Draw a beautiful smooth cubic bezier Figma styled flow path
                const dx = Math.abs(end.x - start.x) * 0.5;
                const pathData = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;
                
                const isSelectedLink = selectedComponentId === link.fromComponentId;

                return (
                  <g key={link.id}>
                    {/* Background thicker stroke for comfortable visibility */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isSelectedLink ? '#000000' : 'transparent'}
                      strokeWidth={isSelectedLink ? 6 : 4}
                      className="opacity-20"
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isSelectedLink ? '#0077FF' : '#0D99FF'}
                      strokeWidth={isSelectedLink ? 3.5 : 2}
                      markerEnd="url(#arrow)"
                      className="prototype-link-path transition-all"
                    />
                    
                    {/* Animated flow node */}
                    <circle
                      cx={start.x + (end.x - start.x) / 4}
                      cy={start.y + (end.y - start.y) / 4}
                      r="4"
                      fill="#FFFFFF"
                      stroke="#0D99FF"
                      strokeWidth="2.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Error prompt indicator banner */}
            {generationError && (
              <div
                className="absolute z-50 p-4 bg-red-950/90 border border-red-500/30 text-red-200 text-xs rounded-xl w-[500px]"
                style={{ top: '20px', left: '100px' }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-red-300">Design Generation Failure</h4>
                    <p className="mt-1">{generationError}</p>
                  </div>
                  <button onClick={() => setGenerationError(null)} className="text-red-400 hover:text-white p-1 text-sm font-bold">×</button>
                </div>
              </div>
            )}

            {/* Mobile Viewports loop container */}
            {frames.map((frame) => {
              const isFrameSelected = selectedFrameId === frame.id && !selectedComponentId;
              
              return (
                <div
                  key={frame.id}
                  id={`frame-dev-${frame.id}`}
                  className="absolute"
                  style={{
                    left: `${frame.x}px`,
                    top: `${frame.y}px`,
                    width: `${frame.width}px`,
                    height: `${frame.height}px`,
                  }}
                >
                  {/* Outer Artboard Frame Title Tag */}
                  <div className="absolute -top-7 left-0 flex items-center gap-2 z-20 w-max">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFrameId(frame.id);
                        setSelectedComponentId(undefined);
                      }}
                      className={`text-xs font-bold px-2.5 py-0.5 rounded cursor-pointer select-none transition-all ${isFrameSelected ? 'bg-[#0D99FF] text-white shadow-lg' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                    >
                      {frame.name}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                      {frame.width} × {frame.height}
                    </span>
                  </div>

                  {/* Complete iPhone chassis representation containing elements layout */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFrameId(frame.id);
                      setSelectedComponentId(undefined);
                    }}
                    className={`relative w-full h-full rounded-[44px] shadow-2xl transition-all border-[8px] bg-white overflow-hidden ${
                      isFrameSelected 
                        ? 'border-[#0D99FF] ring-4 ring-offset-2 ring-[#0D99FF]/20 shadow-[-10px_20px_50px_rgba(0,0,0,0.5)]' 
                        : 'border-[#1E293B] shadow-[-5px_10px_30px_rgba(0,0,0,0.3)]'
                    }`}
                    style={{ backgroundColor: frame.bgColor }}
                  >
                    {/* Device Notch Header */}
                    <div className="absolute top-0 inset-x-0 h-11 pointer-events-none flex justify-between items-center px-6 text-2xs font-bold z-30 select-none">
                      <div className="text-[10.5px] text-slate-800">12:30</div>
                      
                      {/* Notch block visual spacer */}
                      <div className="w-24 h-4.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1.5" />
                      
                      <div className="flex gap-1.5 items-center text-slate-800">
                        <Wifi className="w-3 h-3" />
                        <Battery className="w-4 h-3" />
                      </div>
                    </div>

                    {/* Foreground element stack block */}
                    <div className="w-full h-full pt-11 pb-5 relative overflow-y-auto">
                      {frame.components.map((comp) => {
                        const isCompSelected = selectedFrameId === frame.id && selectedComponentId === comp.id;
                        
                        // Custom styles
                        const compStyle: React.CSSProperties = {
                          position: 'absolute',
                          left: `${comp.x}px`,
                          top: `${comp.y}px`,
                          width: `${comp.width}px`,
                          height: `${comp.height}px`,
                          fontSize: comp.fontSize ? `${comp.fontSize}px` : undefined,
                          fontWeight: comp.fontWeight || 'normal',
                          textAlign: comp.align || 'left',
                          color: comp.textColor || '#0F172A',
                          backgroundColor: comp.bgColor || undefined,
                          borderColor: comp.borderColor || undefined,
                          borderWidth: comp.borderWidth ? `${comp.borderWidth}px` : undefined,
                          borderRadius: comp.borderRadius ? `${comp.borderRadius}px` : undefined,
                          opacity: comp.opacity ?? 1,
                          cursor: 'pointer'
                        };

                        // Build inner elements depending on vector classes
                        return (
                          <div
                            key={comp.id}
                            style={compStyle}
                            title={`${comp.name} (${comp.type})`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFrameId(frame.id);
                              setSelectedComponentId(comp.id);
                            }}
                            onMouseDown={(e) => {
                              // Initiate dragging physics
                              e.stopPropagation();
                              setSelectedFrameId(frame.id);
                              setSelectedComponentId(comp.id);
                              
                              setDraggingComponent({
                                frameId: frame.id,
                                componentId: comp.id,
                                startX: e.clientX,
                                startY: e.clientY,
                                initialComponentX: comp.x,
                                initialComponentY: comp.y
                              });
                            }}
                            className={`group relative select-none transition-shadow ${
                              isCompSelected 
                                ? 'ring-2 ring-[#0D99FF] ring-offset-1 ring-offset-white z-40' 
                                : 'hover:ring-1 hover:ring-[#0D99FF]/50 hover:z-20'
                            } ${comp.shadow === 'sm' ? 'shadow-sm' : comp.shadow === 'md' ? 'shadow-md' : comp.shadow === 'lg' ? 'shadow-lg' : comp.shadow === 'xl' ? 'shadow-xl' : ''}`}
                          >
                            {/* Visual highlight bounds overlay */}
                            {isCompSelected && (
                              <div className="absolute inset-0 border border-[#0D99FF]/40 pointer-events-none">
                                <span className="absolute -top-5 left-0 bg-[#0D99FF] text-white text-[9px] px-1 py-0.5 rounded shadow whitespace-nowrap leading-none">
                                  {comp.name}
                                </span>
                                {/* Figma Resize Handles */}
                                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border-2 border-[#0D99FF] rounded-sm z-30" />
                                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border-2 border-[#0D99FF] rounded-sm z-30" />
                                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white border-2 border-[#0D99FF] rounded-sm z-30" />
                                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border-2 border-[#0D99FF] rounded-sm z-30" />
                              </div>
                            )}

                            {/* Render component internals */}
                            {comp.type === 'text' && (
                              <div className="w-full h-full flex items-center justify-start overflow-hidden">
                                <span className="w-full truncate">{comp.value || 'Configure typography'}</span>
                              </div>
                            )}

                            {comp.type === 'button' && (
                              <div className="w-full h-full flex items-center justify-center gap-1 overflow-hidden font-bold select-none px-2 text-center text-xs">
                                <span>{comp.value || 'CTA button'}</span>
                              </div>
                            )}

                            {comp.type === 'input' && (
                              <div className="w-full h-full flex items-center px-3 text-xs text-gray-500 overflow-hidden text-left bg-transparent">
                                <span className="truncate">{comp.value || 'Placeholder text'}</span>
                              </div>
                            )}

                            {comp.type === 'image' && (
                              <div className="w-full h-full overflow-hidden bg-slate-200 flex items-center justify-center" style={{ borderRadius: comp.borderRadius ? `${comp.borderRadius}px` : '12px' }}>
                                <img
                                  src={`https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=375&q=80&sig=${comp.imageKeyword || comp.name}`}
                                  alt={comp.imageKeyword || "Scenic travel focus view"}
                                  className="w-full h-full object-cover scale-105 pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-black/15 flex items-end justify-start p-2">
                                  <span className="text-[10px] text-white drop-shadow font-semibold capitalize bg-black/40 px-1.5 py-0.5 rounded truncate max-w-full">
                                    🏞️ {comp.imageKeyword || 'Landscape'}
                                  </span>
                                </div>
                              </div>
                            )}

                            {comp.type === 'icon' && (
                              <div className="w-full h-full flex items-center justify-center">
                                {renderCustomIcon(comp.iconName || 'sparkles', "w-5 h-5")}
                              </div>
                            )}

                            {comp.type === 'rect' && (
                              <div className="w-full h-full" />
                            )}

                            {comp.type === 'card' && (
                              <div className="w-full h-full" />
                            )}

                            {/* Interactive Prototype Wire Tool Connection point */}
                            {activeTool === 'select' && !previewMode && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProtolinkSourceNode({ frameId: frame.id, compId: comp.id });
                                  setProtolinkDestFrameId(frames.find(fr => fr.id !== frame.id)?.id || '');
                                  setShowPrototypeLinkCreatorModal(true);
                                }}
                                className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white cursor-crosshair opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-md transform hover:scale-125"
                                title="Click to connect screen path"
                              >
                                <span className="text-[9px] font-bold">+</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* iPhone Simulated Home indicator */}
                    <div className="absolute bottom-1 right-1/2 translate-x-1/2 w-32 h-1 bg-black rounded-full pointer-events-none z-30" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Instructions Legend on Canvas */}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-lg flex flex-col gap-1 z-30 pointer-events-auto max-w-xs shadow-2xl">
            <h4 className="text-[11px] font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-blue-400" />
              Movable Canvas Controls
            </h4>
            <div className="text-[10px] text-gray-400 mt-1 flex flex-col gap-1 font-sans">
              <p>• <b className="text-gray-200">Drag items:</b> Drag layers directly inside mobile viewports</p>
              <p>• <b className="text-gray-200">Pan background:</b> Hold middle click or drag grey canvas space</p>
              <p>• <b className="text-gray-200">Interactive link:</b> Click raw vector side green handles</p>
              <p>• <b className="text-gray-200">Save edits:</b> Double click properties inputs right-hand bar</p>
            </div>
          </div>
        </main>

        {/* 5. Right Sidebar Panel - Property Inspector */}
        {showInspector && (
          <aside className="w-64 border-l border-[#3333333] bg-[#2C2C2C] flex flex-col shrink-0 overflow-y-auto overflow-x-hidden z-10 p-4">
            {/* If a Component layer is selected */}
            {selectedFrame && selectedComponent ? (
              <div className="flex flex-col gap-5 text-xs">
                <div className="flex items-center justify-between border-b border-[#3E3E3E] pb-2 font-bold uppercase tracking-wider text-gray-300">
                  <span>Selected Component</span>
                  <span className="text-[9px] bg-sky-900 text-sky-200 px-2 rounded-full py-0.5 capitalize">
                    {selectedComponent.type}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Layer Label</label>
                  <input
                    type="text"
                    value={selectedComponent.name}
                    onChange={(e) => updateSelectedComponentProperty('name', e.target.value)}
                    className="w-full bg-[#1E1E1E] border border-[#3E3E3E] rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0D99FF] text-white"
                  />
                </div>

                {/* Typography / Literal Value controls */}
                {(selectedComponent.type === 'text' || selectedComponent.type === 'button' || selectedComponent.type === 'input') && (
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Text Value</label>
                    <textarea
                      rows={3}
                      value={selectedComponent.value || ''}
                      onChange={(e) => updateSelectedComponentProperty('value', e.target.value)}
                      className="w-full bg-[#1E1E1E] border border-[#3E3E3E] rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0D99FF] text-white font-sans text-xs"
                    />
                  </div>
                )}

                {/* Geometry Layout coordinates */}
                <div>
                  <div className="text-[10px] uppercase opacity-40 font-bold mb-2 tracking-wider">Canvas Geometric Layout</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#1E1E1E] p-2 rounded border border-[#3E3E3E]">
                      <div className="text-[9px] opacity-50 mb-0.5">X coordinate</div>
                      <input
                        type="number"
                        value={selectedComponent.x}
                        onChange={(e) => updateSelectedComponentProperty('x', Number(e.target.value))}
                        className="bg-transparent border-none text-white w-full focus:outline-none font-mono"
                      />
                    </div>
                    <div className="bg-[#1E1E1E] p-2 rounded border border-[#3E3E3E]">
                      <div className="text-[9px] opacity-50 mb-0.5">Y coordinate</div>
                      <input
                        type="number"
                        value={selectedComponent.y}
                        onChange={(e) => updateSelectedComponentProperty('y', Number(e.target.value))}
                        className="bg-transparent border-none text-white w-full focus:outline-none font-mono"
                      />
                    </div>
                    <div className="bg-[#1E1E1E] p-2 rounded border border-[#3E3E3E]">
                      <div className="text-[9px] opacity-50 mb-0.5">Width (px)</div>
                      <input
                        type="number"
                        value={selectedComponent.width}
                        onChange={(e) => updateSelectedComponentProperty('width', Math.max(10, Number(e.target.value)))}
                        className="bg-transparent border-none text-white w-full focus:outline-none font-mono"
                      />
                    </div>
                    <div className="bg-[#1E1E1E] p-2 rounded border border-[#3E3E3E]">
                      <div className="text-[9px] opacity-50 mb-0.5">Height (px)</div>
                      <input
                        type="number"
                        value={selectedComponent.height}
                        onChange={(e) => updateSelectedComponentProperty('height', Math.max(10, Number(e.target.value)))}
                        className="bg-transparent border-none text-white w-full focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Color styles styling */}
                <div className="border-t border-[#3E3E3E] pt-3">
                  <div className="text-[10px] uppercase opacity-40 font-bold mb-3.5 tracking-wider">Visual Finishes</div>
                  
                  {/* Text Color HEX */}
                  {(selectedComponent.type === 'text' || selectedComponent.type === 'button' || selectedComponent.type === 'input' || selectedComponent.type === 'icon') && (
                    <div className="mb-3.5">
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Hex Foreground</label>
                      <div className="flex items-center gap-2 bg-[#1E1E1E] p-1.5 rounded border border-[#3E3E3E]">
                        <input
                          type="color"
                          value={selectedComponent.textColor || '#000000'}
                          onChange={(e) => updateSelectedComponentProperty('textColor', e.target.value)}
                          className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                        />
                        <input
                          type="text"
                          value={selectedComponent.textColor || ''}
                          placeholder="#0F172A"
                          onChange={(e) => updateSelectedComponentProperty('textColor', e.target.value)}
                          className="bg-transparent text-white w-full text-xs focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Bg Color HEX */}
                  {(selectedComponent.type === 'rect' || selectedComponent.type === 'button' || selectedComponent.type === 'input' || selectedComponent.type === 'card') && (
                    <div className="mb-3.5">
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Hex Fill Color</label>
                      <div className="flex items-center gap-2 bg-[#1E1E1E] p-1.5 rounded border border-[#3E3E3E]">
                        <input
                          type="color"
                          value={selectedComponent.bgColor || '#ffffff'}
                          onChange={(e) => updateSelectedComponentProperty('bgColor', e.target.value)}
                          className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                        />
                        <input
                          type="text"
                          value={selectedComponent.bgColor || ''}
                          placeholder="#7C3AED"
                          onChange={(e) => updateSelectedComponentProperty('bgColor', e.target.value)}
                          className="bg-transparent text-white w-full text-xs focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Corner Rounding border radius */}
                  {(selectedComponent.type === 'rect' || selectedComponent.type === 'button' || selectedComponent.type === 'input' || selectedComponent.type === 'image' || selectedComponent.type === 'card') && (
                    <div className="mb-3.5">
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Corner Radius ({selectedComponent.borderRadius || 0}px)</label>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={selectedComponent.borderRadius || 0}
                        onChange={(e) => updateSelectedComponentProperty('borderRadius', Number(e.target.value))}
                        className="w-full h-1.5 bg-[#1E1E1E] rounded-lg appearance-none cursor-pointer accent-[#0D99FF]"
                      />
                    </div>
                  )}

                  {/* Image theme input search parameters */}
                  {selectedComponent.type === 'image' && (
                    <div className="mb-3.5">
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Adaptive Unsplash Search</label>
                      <input
                        type="text"
                        placeholder="beach, travel, laptop, athlete"
                        value={selectedComponent.imageKeyword || ''}
                        onChange={(e) => updateSelectedComponentProperty('imageKeyword', e.target.value)}
                        className="w-full bg-[#1E1E1E] border border-[#3E3E3E] rounded px-2.5 py-1.5 text-xs text-white uppercase tracking-wider font-semibold"
                      />
                    </div>
                  )}

                  {/* Icon details settings selection */}
                  {selectedComponent.type === 'icon' && (
                    <div className="mb-3.5">
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Lucide Symbol Selector</label>
                      <select
                        value={selectedComponent.iconName || 'sparkles'}
                        onChange={(e) => updateSelectedComponentProperty('iconName', e.target.value)}
                        className="w-full bg-[#1E1E1E] border border-[#3E3E3E] text-white p-2 text-xs rounded"
                      >
                        <option value="bell">🔔 Bell Alert</option>
                        <option value="heart">❤️ Heart Favorite</option>
                        <option value="star">🌟 Golden Star</option>
                        <option value="search">🔍 Search glass</option>
                        <option value="user">👤 User Profile</option>
                        <option value="lock">🔒 Secure Padlock</option>
                        <option value="arrow-right">➡️ Send Arrow</option>
                        <option value="plus">➕ Plus Sign</option>
                        <option value="sparkles">✦ Sparks Magic</option>
                      </select>
                    </div>
                  )}

                  {/* Drop Shadow tag */}
                  <div className="mb-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Extrude Shadow Height</label>
                    <select
                      value={selectedComponent.shadow || 'none'}
                      onChange={(e) => updateSelectedComponentProperty('shadow', e.target.value as any)}
                      className="w-full bg-[#1E1E1E] border border-[#3E3E3E] text-white p-2 text-xs rounded"
                    >
                      <option value="none">Flat (no shadow)</option>
                      <option value="sm">Soft light (sm)</option>
                      <option value="md">Lifted shadow (md)</option>
                      <option value="lg">Floating card (lg)</option>
                      <option value="xl">Overhead chassis (xl)</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-[#3E3E3E] pt-3 flex flex-col gap-2">
                  <div className="text-[10px] uppercase opacity-40 font-bold tracking-wider">Manage Connections</div>
                  {links.some(l => l.fromComponentId === selectedComponent.id) ? (
                    <div className="bg-slate-900/40 p-2 rounded border border-emerald-500/20 text-[11px] leading-relaxed flex flex-col gap-1 text-emerald-200">
                      <div className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Interactive flow setup:</span>
                      </div>
                      <span className="text-gray-400 bg-[#1E1E1E] px-1 py-0.5 rounded truncate">
                        On click ➔ {frames.find(f => f.id === links.find(l => l.fromComponentId === selectedComponent.id)?.toFrameId)?.name || 'Next Screen'}
                      </span>
                      <button
                        onClick={() => setLinks(prev => prev.filter(l => l.fromComponentId !== selectedComponent.id))}
                        className="text-[9px] text-red-400 mt-1 hover:underline text-left cursor-pointer"
                      >
                        Remove connection path
                      </button>
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-400 italic">No click navigations defined for this element. Use the canvas side green handles to link elements in real-time!</p>
                  )}
                </div>

                <button
                  onClick={handleDeleteSelectedComponent}
                  className="w-full py-2 bg-red-950 hover:bg-red-900 text-red-200 rounded border border-red-500/20 shadow-md font-bold mt-2"
                >
                  Delete Component
                </button>
              </div>
            ) : selectedFrame ? (
              // If only a Frame is selected
              <div className="flex flex-col gap-5 text-xs">
                <div className="flex items-center justify-between border-b border-[#3E3E3E] pb-2 font-bold uppercase tracking-wider text-gray-300">
                  <span>Artboard Screen</span>
                  <span className="text-[9px] bg-slate-900 text-gray-400 px-2 rounded-full py-0.5 capitalize">Screen viewport</span>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Artboard Name</label>
                  <input
                    type="text"
                    value={selectedFrame.name}
                    onChange={(e) => updateSelectedFrameProperty('name', e.target.value)}
                    className="w-full bg-[#1E1E1E] border border-[#3E3E3E] rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-[#0D99FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Outer Solid Fill</label>
                  <div className="flex items-center gap-2 bg-[#1E1E1E] p-1.5 rounded border border-[#3E3E3E]">
                    <input
                      type="color"
                      value={selectedFrame.bgColor}
                      onChange={(e) => updateSelectedFrameProperty('bgColor', e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={selectedFrame.bgColor}
                      onChange={(e) => updateSelectedFrameProperty('bgColor', e.target.value)}
                      className="bg-transparent text-white w-full text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase opacity-40 font-bold mb-2 tracking-wider">Dimension scale</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#1E1E1E] p-2 rounded border border-[#3E3E3E]">
                      <div className="text-[9px] opacity-50 mb-0.5">Width</div>
                      <div className="font-mono font-bold text-gray-200">375 px</div>
                    </div>
                    <div className="bg-[#1E1E1E] p-2 rounded border border-[#3E3E3E]">
                      <div className="text-[9px] opacity-50 mb-0.5">Height</div>
                      <div className="font-mono font-bold text-gray-200">812 px</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/30 p-3 rounded border border-slate-700/50 mt-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Screen components</span>
                  <div className="flex flex-col gap-1 text-[11px] text-gray-300">
                    <p>• Rectangles: {selectedFrame.components.filter(c => c.type === 'rect').length}</p>
                    <p>• Typographic: {selectedFrame.components.filter(c => c.type === 'text').length}</p>
                    <p>• Interactive Buttons: {selectedFrame.components.filter(c => c.type === 'button').length}</p>
                    <p>• Form inputs: {selectedFrame.components.filter(c => c.type === 'input').length}</p>
                  </div>
                </div>

                <button
                  onClick={handleDeleteSelectedFrame}
                  className="w-full py-2 bg-red-950 hover:bg-red-900 text-red-200 rounded border border-red-500/20 shadow-md font-bold mt-4"
                >
                  Delete Screen
                </button>
              </div>
            ) : (
              // General global canvas specs
              <div className="flex flex-col gap-4 text-xs">
                <div className="flex items-center justify-between border-b border-[#3E3E3E] pb-2 font-bold uppercase tracking-wider text-white">
                  <span>Inspector</span>
                  <span className="text-[9px] bg-slate-800 text-violet-400 px-2 rounded-full py-0.5 uppercase">Canvas</span>
                </div>

                <div className="p-3 bg-violet-950/20 border border-violet-800/30 rounded-lg flex flex-col gap-1">
                  <h4 className="font-bold text-violet-300 flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    AI Core System
                  </h4>
                  <p className="text-[10.5px] text-violet-200 leading-relaxed font-sans">
                    Define components via the top prompt field. The Gemini vector engine will automatically layer labels, coordinates, and color contrast.
                  </p>
                </div>

                <div className="mt-2 text-gray-400 flex flex-col gap-1 leading-relaxed">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Global Workspace</span>
                  <p>• Total Screen Artboards: {frames.length}</p>
                  <p>• Total Connected Paths: {links.length}</p>
                  <p>• Viewport Zoom: {Math.round(zoom * 100)}%</p>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* 6. High-fidelity Live Interactive iPhone Simulator Modal Overlay */}
      {previewMode && (
        <div className="absolute inset-0 bg-[#000000]/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative max-w-4xl w-full flex flex-col lg:flex-row items-center gap-8 bg-[#181A22] rounded-2xl border border-slate-800 p-6 shadow-2xl">
            
            {/* Left instructions block */}
            <div className="flex-1 text-slate-300">
              <span className="text-[11px] font-bold tracking-widest bg-[#0D99FF]/15 text-[#0D99FF] px-2.5 py-1 rounded-full uppercase">
                Active Interaction Mode
              </span>
              <h2 className="text-2xl font-bold text-white mt-3 leading-tight font-sans">
                Live Prototype Simulator
              </h2>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Test the mobile user onboarding experience, action triggers, buttons and search interfaces. Navigating coordinates slide fluidly into connected targets.
              </p>

              {/* Connected interaction mapping rules */}
              <div className="mt-6 flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Interaction triggers configured:</span>
                
                <div className="flex flex-col gap-2 font-mono text-[11px] bg-[#12141A] p-3 rounded-lg border border-slate-800">
                  {links.map((link, idx) => {
                    const fromF = frames.find(f => f.id === link.fromFrameId);
                    const triggerEl = fromF?.components.find(c => c.id === link.fromComponentId);
                    const toF = frames.find(f => f.id === link.toFrameId);
                    
                    return (
                      <div key={link.id} className="flex items-center gap-1.5 text-gray-400">
                        <span className="text-emerald-400">{fromF?.name || 'Screen'}</span>
                        <span>➔ onClick [<b>{triggerEl?.value || triggerEl?.name}</b>] ➔</span>
                        <span className="text-blue-400">{toF?.name || 'Destination'}</span>
                      </div>
                    );
                  })}
                  {links.length === 0 && (
                    <span className="text-gray-500 italic">No interactive triggers defined. Return to design and connect vectors!</span>
                  )}
                </div>
              </div>

              {/* Navigation panel */}
              <div className="mt-6">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-2">Manually Hot-swap Screen View:</span>
                <div className="flex flex-wrap gap-2">
                  {frames.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSimulatorFrameId(f.id);
                        setSimulatorNavHistory(prev => [...prev, f.id]);
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${simulatorFrameId === f.id ? 'bg-[#0D99FF] text-white' : 'bg-slate-800 text-gray-400 hover:text-white'}`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setPreviewMode(false)}
                  className="bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-slate-750 transition-colors"
                >
                  Exit Preview Mode
                </button>
                {simulatorNavHistory.length > 1 && (
                  <button
                    onClick={handleSimulatorGoBack}
                    className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 text-gray-300 font-bold text-xs px-4 py-2 rounded-lg hover:text-white hover:bg-slate-800 transition-all font-mono"
                  >
                    <Undo className="w-3.5 h-3.5 text-amber-400" />
                    Go back
                  </button>
                )}
              </div>
            </div>

            {/* High fidelity interactive Phone Mockup */}
            <div className="relative shrink-0 w-[375px] h-[780px] bg-white rounded-[50px] shadow-2xl overflow-hidden border-[11px] border-black flex flex-col scale-95 origin-center">
              {/* Device Notch Header */}
              <div className="absolute top-0 inset-x-0 h-10 pointer-events-none flex justify-between items-center px-6 text-2xs font-bold text-black z-30 select-none">
                <div>12:30</div>
                <div className="w-24 h-4.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1.5" />
                <div className="flex gap-1.5 items-center">
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-3" />
                </div>
              </div>

              {/* Simulated Screen viewport */}
              {(() => {
                const item = frames.find(f => f.id === simulatorFrameId) || frames[0];
                if (!item) return <div className="flex-1 bg-slate-900 flex items-center justify-center text-xs text-white">Empty design</div>;

                return (
                  <div className="flex-1 relative pt-11 pb-5 overflow-y-auto" style={{ backgroundColor: item.bgColor }}>
                    {item.components.map((comp) => {
                      const linkFound = links.find(l => l.fromComponentId === comp.id);
                      
                      const elementStyle: React.CSSProperties = {
                        position: 'absolute',
                        left: `${comp.x}px`,
                        top: `${comp.y}px`,
                        width: `${comp.width}px`,
                        height: `${comp.height}px`,
                        fontSize: comp.fontSize ? `${comp.fontSize}px` : undefined,
                        fontWeight: comp.fontWeight || 'normal',
                        textAlign: comp.align || 'left',
                        color: comp.textColor || '#0F172A',
                        backgroundColor: comp.bgColor || undefined,
                        borderColor: comp.borderColor || undefined,
                        borderWidth: comp.borderWidth ? `${comp.borderWidth}px` : undefined,
                        borderRadius: comp.borderRadius ? `${comp.borderRadius}px` : undefined,
                        opacity: comp.opacity ?? 1,
                        cursor: linkFound ? 'pointer' : 'default',
                      };

                      return (
                        <div
                          key={comp.id}
                          style={elementStyle}
                          onClick={() => handleSimulatorElementClick(comp.id)}
                          className={`relative select-none ${linkFound ? 'ring-2 ring-emerald-500 hover:scale-[1.02] active:scale-95 text-emerald-100 ring-offset-1 transition-all' : ''} ${comp.shadow === 'sm' ? 'shadow-sm' : comp.shadow === 'md' ? 'shadow-md' : comp.shadow === 'lg' ? 'shadow-lg' : comp.shadow === 'xl' ? 'shadow-xl' : ''}`}
                        >
                          {/* Pulsing indicator overlay on linked interactive button elements */}
                          {linkFound && (
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                          )}

                          {comp.type === 'text' && (
                            <div className="w-full h-full flex items-center justify-start overflow-hidden">
                              <span className="w-full">{comp.value}</span>
                            </div>
                          )}

                          {comp.type === 'button' && (
                            <div className="w-full h-full flex items-center justify-center font-bold px-2 text-center text-xs">
                              <span>{comp.value || 'Action Button'}</span>
                            </div>
                          )}

                          {comp.type === 'input' && (
                            <div className="w-full h-full flex items-center px-3 text-xs text-slate-400 overflow-hidden text-left">
                              <span className="truncate">{comp.value || 'Input placeholder'}</span>
                            </div>
                          )}

                          {comp.type === 'image' && (
                            <div className="w-full h-full overflow-hidden flex items-center justify-center" style={{ borderRadius: comp.borderRadius ? `${comp.borderRadius}px` : '12px' }}>
                              <img
                                src={`https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=375&q=80&sig=${comp.imageKeyword || comp.name}`}
                                alt={comp.imageKeyword || "Scenic spot focus"}
                                className="w-full h-full object-cover scale-102 pointer-events-none"
                              />
                            </div>
                          )}

                          {comp.type === 'icon' && (
                            <div className="w-full h-full flex items-center justify-center">
                              {renderCustomIcon(comp.iconName || 'sparkles', "w-5 h-5")}
                            </div>
                          )}

                          {comp.type === 'rect' && (
                            <div className="w-full h-full" />
                          )}

                          {comp.type === 'card' && (
                            <div className="w-full h-full" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Interactive simulated Home navigation bar */}
              <div className="absolute bottom-1 right-1/2 translate-x-1/2 w-32 h-1 bg-black rounded-full pointer-events-none z-30" />
            </div>
          </div>
        </div>
      )}

      {/* 7. Code Export Backdrop Overlay Modal */}
      {showExportModal && (
        <div className="absolute inset-0 bg-[#000000]/80 z-50 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-[#181A22] rounded-2xl border border-slate-800 overflow-hidden flex flex-col h-[650px] shadow-2xl">
            <div className="p-4 bg-[#242735] border-b border-[#35394C] flex justify-between items-center text-white font-sans shrink-0">
              <span className="font-bold flex items-center gap-2 text-sm uppercase">
                <Code className="text-violet-400 w-4 h-4" />
                Tailwind Responsive Layout Design Code
              </span>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-white p-1 text-base font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-4 bg-[#111218] flex items-center justify-between shrink-0 border-b border-slate-800">
              <p className="text-xs text-gray-400">
                The layout structure and colors has been parsed and optimized into a static, copy-ready code using standard Tailwind CSS utility tags.
              </p>
              <button
                onClick={() => handleCopyToClipboard(generateExportableTailwindCode())}
                className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 font-bold text-xs text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Output Code
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-[#0A0B0E]">
              <pre className="text-xs text-indigo-200 font-mono font-bold leading-relaxed select-text p-2 whitespace-pre">
                {generateExportableTailwindCode()}
              </pre>
            </div>

            <div className="p-3 bg-[#181A22] border-t border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded hover:bg-slate-700 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Interactive Prototype Link Creator Popup Dialog */}
      {showPrototypeLinkCreatorModal && protolinkSourceNode && (
        <div className="absolute inset-0 bg-[#000000]/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1E26] border border-slate-800 p-5 rounded-xl w-96 shadow-2xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CornerDownRight className="w-4 h-4 text-emerald-400" />
              Configure Prototype Wire Action
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              When users click on <span className="bg-slate-800 text-white font-mono rounded px-1.5 py-0.5 font-bold">
                {frames.find(f => f.id === protolinkSourceNode.frameId)?.components.find(c => c.id === protolinkSourceNode.compId)?.name || 'this component'}
              </span> inside client preview, navigate to which artboard screen?
            </p>

            <div className="mb-4">
              <label className="text-[10px] text-gray-400 font-bold block mb-1 uppercase tracking-wider">Destination Artboard</label>
              <select
                value={protolinkDestFrameId}
                onChange={(e) => setProtolinkDestFrameId(e.target.value)}
                className="w-full bg-[#111218] border border-[#3E3E3E] text-white p-2 text-xs rounded"
                id="prototype-destination-select"
              >
                {frames.map((f) => (
                  <option key={f.id} value={f.id}>{f.name} (position: x={f.x})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => { setProtolinkSourceNode(null); setShowPrototypeLinkCreatorModal(false); }}
                className="px-3.5 py-1.5 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCustomProtolink}
                className="px-4 py-1.5 rounded text-xs font-bold bg-[#0D99FF] text-white hover:bg-sky-500"
                id="confirm-proto-link"
              >
                Create Prototype Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
