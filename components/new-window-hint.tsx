/**
 * Screen-reader-only warning for links that open in a new tab.
 * WCAG 3.2.5 Change on Request — an unannounced context switch is
 * disorienting for screen reader and screen magnifier users.
 */
export function NewWindowHint() {
  return <span className="sr-only"> (נפתח בחלון חדש)</span>
}
