# MedShadow Design Guidelines

## Brand Identity

### Color Palette
- **Primary**: #1E6091 (Deep Blue) - Represents professionalism and trust
- **Secondary**: #2A9D8F (Teal) - Represents health and wellness
- **Accent**: #E76F51 (Coral) - For calls-to-action and important highlights
- **Neutrals**:
  - #F8F9FA (Light Gray/Off-White) - Background
  - #E9ECEF (Lighter Gray) - Sections/Cards
  - #495057 (Dark Gray) - Body text
  - #212529 (Almost Black) - Headings

### Typography
- **Headings**: Inter, Bold/Semi-bold
- **Body**: Inter, Regular/Light
- **Accents**: Inter, Medium
- Font sizes should follow a clear hierarchy and use relative units (rem)

### Spacing System
- Use a consistent 4px-based spacing scale
- Common values: 0.25rem (4px), 0.5rem (8px), 1rem (16px), 1.5rem (24px), 2rem (32px)

## Component Design

### Cards
- Subtle shadows: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- Rounded corners: `border-radius: 0.5rem`
- White backgrounds with subtle border or shadow
- Consistent internal padding

### Buttons
- **Primary**: Solid background (#1E6091), white text, rounded corners
- **Secondary**: Outlined, teal border and text (#2A9D8F)
- **Accent/CTA**: Solid coral background (#E76F51), white text
- **Text buttons**: No background, primary color text
- All buttons should have hover and active states

### Forms
- Clean, simple inputs with clear labels
- Validation messages appear inline
- Consistent field spacing
- Subtle focus states

### Navigation
- Clear, accessible navigation
- Mobile: Bottom navigation bar for critical actions
- Desktop: Simple top navbar with dropdown menus as needed
- Current section clearly indicated

## Responsive Approach

### Breakpoints
- **Small**: 640px and up
- **Medium**: 768px and up
- **Large**: 1024px and up
- **Extra Large**: 1280px and up

### Mobile-First Strategy
- Design for mobile screens first
- Progressively enhance for larger screens
- Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)

### Critical Mobile Considerations
- Touch targets at least 44×44px
- Reduce visual complexity on smaller screens
- Bottom navigation for key actions
- Collapse filters into expandable sections

## UI Patterns

### Maps Integration
- Clear, readable map markers
- Customized Google Maps style to match brand colors
- List/Map toggle for viewing opportunities
- Location-centered search functionality

### Dashboard Layouts
- Clean, card-based designs
- Clear data visualization for hour tracking
- Progressive disclosure for complex information
- Sidebar navigation on larger screens

### Profile Displays
- Professional, clean presentation of information
- Clear visual distinction between student and facility profiles
- Avatar/logo upload capabilities
- Rich but not overwhelming detail presentation

## Content Strategy

### Icons
- Use a consistent icon set (Recommended: Heroicons or Phosphor Icons)
- Keep icons simple and recognizable
- Use icons to enhance, not replace, text labels for critical actions

### Empty States
- Friendly, helpful messaging for empty states
- Suggested actions to fill content
- Light illustrations that match brand style

### Loading States
- Branded skeleton screens instead of generic spinners
- Maintain layout during loading to reduce layout shift
- Subtle animations that don't distract

## Accessibility

### Contrast
- Maintain WCAG AA compliance minimum (4.5:1 for normal text)
- Test all color combinations for readability

### Focus States
- Clear, visible focus indicators
- Never remove focus outlines without replacing them

### Screen Readers
- Proper alt text for all images
- ARIA labels where appropriate
- Semantic HTML structure

## Implementation Notes

### Tailwind Configuration
- Extend the Tailwind theme with our custom color palette
- Define custom spacing, border-radius, and shadow values
- Create component classes for repeated patterns

### CSS Variables
- Store brand colors as CSS variables for consistency
- Use dark mode toggles with CSS variables if implementing dark mode

### Design System Components
- Build a library of reusable components
- Document usage patterns and variations
- Ensure consistent props and behavior
