# Qui Sommes-Nous Carousel Component

A professional, fully responsive carousel component for the "Qui sommes-nous ?" section built with Next.js, Framer Motion, and modern accessibility standards.

## Features

### 🎨 Design & Layout
- **Responsive design**: Split layout (text left, image right) on desktop, stacked on mobile
- **Modern typography**: Large bold titles with elegant thin paragraphs
- **Professional styling**: Clean, Apple/Stripe-inspired aesthetic with subtle shadows
- **Optimized images**: Next.js Image component with proper optimization

### 🎮 Interactions
- **Smooth animations**: Horizontal slide transitions with natural easing
- **Auto-play**: 5-second intervals with intelligent pause/resume
- **Touch gestures**: Swipe support for mobile devices
- **Keyboard navigation**: Arrow key support
- **Focus management**: Proper focus states and accessibility

### ♿ Accessibility
- **ARIA compliance**: Proper roles, labels, and descriptions
- **Keyboard accessible**: Full navigation with keyboard
- **Reduced motion**: Respects `prefers-reduced-motion` setting
- **Semantic HTML**: Proper heading hierarchy and structure
- **Alt text**: Descriptive alt text for all images

## Installation

1. **Component File**: Place `qui-sommes-nous-carousel.tsx` in your `/components` folder

2. **Image Files**: Place the following images in your `/public` folder:
   - `qui-somme-nous-1.jpg` - Grand Cœur centre éducatif
   - `qui-somme-nous-2.jpg` - Vision éducative inclusive  
   - `qui-somme-nous-3.jpg` - Mission pédagogique Grand Cœur
   - `qui-somme-nous-4.jpg` - Vie quotidienne au centre

3. **Dependencies**: Ensure you have the required dependencies:
   ```bash
   npm install framer-motion lucide-react
   ```

## Usage

### Import and Use
```tsx
import { QuiSommesNousCarousel } from "@/components/qui-sommes-nous-carousel"

export default function Page() {
  return (
    <div>
      <QuiSommesNousCarousel />
    </div>
  )
}
```

### Replace Existing About Section
In your main page file (`app/page.tsx`), replace:
```tsx
import { AboutSection } from "@/components/about-section"
// ...
<AboutSection />
```

With:
```tsx
import { QuiSommesNousCarousel } from "@/components/qui-sommes-nous-carousel"
// ...
<QuiSommesNousCarousel />
```

## Content Structure

The carousel includes 4 slides:

1. **Intro** - Introduction to Grand Cœur center
2. **Notre Vision** - Vision for inclusive education
3. **Notre Mission** - Mission statement and goals
4. **La Vie à Grand Cœur** - Daily life at the center

Each slide can be customized by editing the `slides` array in the component.

## Customization

### Styling
The component uses Tailwind CSS classes. Key styling areas:
- **Container**: `bg-gradient-to-br from-slate-50 to-white`
- **Card**: `bg-white rounded-3xl shadow-xl`
- **Typography**: Modern font scale with proper contrast
- **Navigation**: Clean buttons with hover states

### Animation Timing
- **Slide duration**: 0.8s (reduced to 0.2s for reduced motion)
- **Auto-play interval**: 5 seconds
- **Pause after interaction**: 3 seconds

### Content
Edit the `slides` array to customize:
```tsx
const slides: Slide[] = [
  {
    id: "unique-id",
    title: "Optional Title", // Can be omitted for intro slide
    text: "Your paragraph text here...",
    image: "/your-image.jpg",
    alt: "Descriptive alt text"
  }
  // ... more slides
]
```

## Performance Optimization

- **Image optimization**: Uses Next.js Image with `priority` for first slide
- **Lazy loading**: Subsequent images load lazily
- **Blur placeholder**: Provides smooth loading experience
- **Proper sizing**: Responsive image sizes for optimal loading

## Browser Support

- **Modern browsers**: Full feature support
- **Accessibility**: Screen reader compatible
- **Touch devices**: Full gesture support
- **Keyboard only**: Complete navigation support

## Technical Details

- **Framework**: Next.js 13+ with App Router
- **Animation**: Framer Motion for smooth transitions
- **Icons**: Lucide React for navigation icons
- **Styling**: Tailwind CSS for responsive design
- **TypeScript**: Full type safety

## Best Practices Implemented

- ✅ Semantic HTML structure
- ✅ Proper ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Touch gesture support
- ✅ Reduced motion compliance
- ✅ Image optimization
- ✅ Performance optimized animations
- ✅ Clean, maintainable code structure
- ✅ Professional design patterns