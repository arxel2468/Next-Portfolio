import s from './Grain.module.css';

export default function Grain() {
  return (
    <div
      className={s.grain}
      aria-hidden="true"      // Decorative — screen readers skip it
      role="presentation"     // Explicit presentational role
    />
  );
}