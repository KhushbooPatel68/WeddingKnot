# Wedding Website Design Guidelines

## Design Approach
**Reference-Based**: Inspired by The Knot's wedding website aesthetic, focusing on romantic elegance, emotional storytelling, and celebration-focused user experience. This is an experience-driven design where visual appeal and joyful emotion are paramount.

## Typography System

**Primary Font**: Playfair Display (serif) - for couple names, headings, romantic statements
**Secondary Font**: Montserrat (sans-serif) - for body text, event details, navigation

**Hierarchy**:
- Couple Names/Hero Title: text-6xl md:text-8xl, font-playfair, font-bold
- Section Headings: text-4xl md:text-5xl, font-playfair, font-semibold
- Event Titles: text-2xl md:text-3xl, font-playfair, font-medium
- Countdown/Date: text-xl md:text-2xl, font-montserrat, tracking-wider
- Body Text: text-base md:text-lg, font-montserrat, leading-relaxed
- Event Details: text-sm md:text-base, font-montserrat
- Navigation: text-sm, font-montserrat, uppercase, tracking-wide

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (e.g., p-4, gap-8, my-12, py-20)

**Container Strategy**:
- Hero sections: Full-width (w-full) with centered content
- Content sections: max-w-7xl mx-auto px-6 md:px-12
- Event cards: max-w-6xl mx-auto
- Text content: max-w-3xl for optimal reading

**Section Padding**: py-16 md:py-24 for major sections, py-12 md:py-16 for subsections

## Component Library

### Navigation
- Sticky header with couple initials/monogram on left
- Horizontal menu (desktop): Home, Photos, Events (dropdown), Travel, Things to Do, Registry
- Hamburger menu (mobile) with slide-out panel
- Spacing: px-6 py-4

### Hero Section
- Full-viewport height (min-h-screen) with large romantic background image
- Couple names in elegant display typography centered
- Wedding date below names
- Live countdown timer (Days • Hours • Minutes format)
- Decorative divider elements (thin lines, flourishes)
- Subtle scroll indicator at bottom
- Blurred background buttons if CTAs needed (e.g., "View Events", "RSVP")

### Welcome Section
- Centered layout, max-w-4xl
- Headline in display font: "Welcome to the Celebration!"
- Decorative subtitle: "Love • Laughter • Dance • Traditions • Forever"
- Warm welcome paragraph with emoji accents (✨💛💃)
- Background: subtle texture or gradient overlay

### Event Cards
- Grid layout: grid-cols-1 md:grid-cols-2 gap-8
- Each card includes:
  - Event name (large, serif)
  - Date and time (prominent, spaced)
  - Attire guidelines (italic, smaller)
  - Optional brief description
  - Decorative border or shadow
- Hover state: subtle lift (translate-y-[-4px])
- Padding: p-8 md:p-12

### Photo Gallery
- Masonry grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Gap: gap-4
- Images: Full-width within grid cells, aspect-ratio-square or natural
- Hover: opacity-90 transition
- Click to open lightbox modal with navigation arrows

### Footer
- Multi-column (desktop): 3 columns
  - Column 1: Couple monogram/names, wedding date
  - Column 2: Quick links (Events, Travel, Registry)
  - Column 3: Contact info, social sharing
- Mobile: Stacked single column
- Padding: py-16 px-6
- Small text: text-sm
- "Created with love" tagline

### Timeline/Schedule Component
- Vertical timeline with connecting line
- Each event: dot marker, time on left, event details on right
- Responsive: horizontal scroll on mobile if needed

### Info Cards (Travel, Things to Do)
- Card-based layout with icons
- Icon + Title + Description pattern
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Shadow: shadow-lg on hover
- Padding: p-6

## Images

**Hero Image**: 
- Large romantic couple photo or venue image
- Position: Full-width background, object-cover, min-h-screen
- Overlay: Semi-transparent gradient (opacity-40) for text readability
- Placement: Top of homepage

**Event Section Backgrounds**:
- Each event type can have subtle background patterns or themed images
- Light opacity overlays to maintain text readability

**Photo Gallery**:
- Multiple couple photos, ceremony moments, venue shots
- Variety of orientations (portrait, landscape)
- High-quality, professionally shot images preferred

**Decorative Elements**:
- Floral/mandala motifs via CDN icon libraries (Heroicons or Font Awesome)
- Subtle patterns for section dividers
- Ring/heart icons for romantic accents

**Travel/Venue Images**:
- Location photos for hotels, venues
- Maps or landmark images

## Animations

**Minimal, Purposeful Use**:
- Hero text: Fade-in on load (0.8s ease)
- Countdown timer: Number flip animation
- Scroll reveal: Events fade-in as they enter viewport (IntersectionObserver)
- Photo gallery: Smooth opacity transition on hover
- Navigation: Smooth scroll to sections

**Avoid**: Excessive parallax, continuous background animations, distracting motion

## Accessibility

- Maintain WCAG AA contrast ratios for all text
- Focus states on all interactive elements (ring-2 ring-offset-2)
- Semantic HTML: <nav>, <main>, <section>, <article>
- Alt text for all images
- Keyboard navigation support for modals/galleries
- Aria labels for icon-only buttons

## Key Pages Structure

**Homepage**: Hero → Welcome → Events Grid → Photo Teaser → Footer

**Individual Event Pages**: Event Hero → Details → Venue Info → Map → Related Photos

**Photos**: Gallery Grid → Lightbox Modal

**Travel**: Hero → Hotel Options (cards) → Transportation → Map

**Things to Do**: Recommendations Grid → Categories (Food, Attractions, Shopping)