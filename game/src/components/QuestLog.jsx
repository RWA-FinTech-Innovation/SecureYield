export default function QuestLog({ stages, current, cleared, progress }) {
  return (
    <div className="quest-panel">
      <h2 className="quest-panel__title">Quest Log</h2>
      <div className="quest-progress">
        <div className="quest-progress__bar" style={{ width: `${progress}%` }} />
        <span>{progress}%</span>
      </div>
      <ol className="quest-steps">
        {stages.map((s) => {
          const done = cleared.includes(s.id);
          const active = current === s.id;
          return (
            <li
              key={s.id}
              className={`quest-step ${done ? 'quest-step--done' : ''} ${active ? 'quest-step--active' : ''}`}
            >
              <span className="quest-step__dot" style={{ borderColor: s.color }} />
              <div>
                <strong>{s.short}</strong>
                <span>{s.title}</span>
              </div>
              {done && <span className="quest-step__check">✓</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
