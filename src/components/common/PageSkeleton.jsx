/** Loading placeholder shown while lazy route chunks or auth state resolve. */
const PageSkeleton = ({ label = "Loading…" }) => (
  <div className="pb-skeleton-page" role="status" aria-live="polite" aria-busy="true">
    <span className="pb-sr-only">{label}</span>
    <div className="pb-skeleton" style={{ height: 28, width: "min(260px, 60%)" }} />
    <div className="pb-skeleton" style={{ height: 44, width: "min(420px, 90%)" }} />
    <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="pb-skeleton" style={{ height: 46, width: 150 }} />
      ))}
    </div>
    <div className="pb-skeleton" style={{ height: 260, width: "100%", maxWidth: 900 }} />
  </div>
);

export default PageSkeleton;
