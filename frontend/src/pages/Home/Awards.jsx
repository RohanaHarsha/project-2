// ...existing code...
import React from 'react';
import Heading from '../../components/common/Heading';
import './Awards.css';

const items = [
  { id: 1, value: '32M', label: 'Blue Burmin Award', icon: 'fas fa-trophy' },
  { id: 2, value: '43M', label: 'Mimo X11 Award', icon: 'fas fa-briefcase' },
  { id: 3, value: '51M', label: 'Australian UGC Award', icon: 'fas fa-lightbulb' },
];

export default function Awards() {
  return (
    <section className="awards-section">
      <div className="awards-inner container">
        

        <div className="awards-grid" role="list">
          {items.map((it) => (
            <article className="award-card" key={it.id} role="listitem" aria-label={it.label}>
              <div className="award-icon" aria-hidden="true">
                <i className={it.icon} />
              </div>
              <div className="award-body">
                <div className="award-value">{it.value}</div>
                <div className="award-label">{it.label}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
// ...existing code...