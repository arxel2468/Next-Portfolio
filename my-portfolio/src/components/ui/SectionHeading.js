// src/app/components/ui/SectionHeading.js
export default function SectionHeading({ children, className = '' }) {
    return (
      <h2 className={`section-heading ${className}`}>
        {children}
      </h2>
    );
  }