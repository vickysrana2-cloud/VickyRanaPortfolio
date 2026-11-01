// Server Component — route segment config lives here.
// The actual client-side rendering is delegated to TemplatePreviewClient.

// This route is fully dynamic (slug only known at request time).
// `instant = false` blocks static prerendering and serves it at runtime.
export const instant = false;

import { TemplatePreviewClient } from './TemplatePreviewClient';

export default function TemplateIsolatedPreviewPage() {
  return <TemplatePreviewClient />;
}
