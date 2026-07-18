import React from "react";

const managers = [
  {
    id: "npm",
    name: "npm",
    desc: "The default Node.js package manager",
    color: "#CB3837",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="44" height="44" rx="4" fill="#CB3837" />
        <path d="M10 10h28v28H24V14h-6v24h-8V10z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "yarn",
    name: "Yarn",
    desc: "Fast, reliable dependency management",
    color: "#2C8EBB",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#2C8EBB" />
        <path
          d="M33 30c-2 0-3.5-.5-5-1.5-1.5 1-3 1.5-5 2-.5.1-1 .2-1.5.2-1 0-2-.3-2.5-1-.5-.5-.5-1.2-.3-2 .3-1 1-1.8 2-2.5-.8-1.5-1-3-.5-4.5.3-1 1-2 1.8-2.5-.2-1.5 0-3 .8-4.2.5-.8 1.3-1.3 2.2-1.3.5 0 1 .2 1.5.5 1 .8 1.5 2 1.5 3.5 1-.3 2-.3 3 0 .5-1 1.3-1.8 2.3-2 .5 0 1 0 1.3.3.8.5 1 1.5.8 2.5 0 1-.5 2-1 3 .8.5 1.3 1.5 1.3 2.5 0 1-.5 2-1.5 2.8-.8.5-1.5 1-2.5 1.2.5.5.8 1.2.8 2v1.5c.2.5 0 1-.5 1.3-.3.2-.5.2-.8.2z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    id: "pnpm",
    name: "pnpm",
    desc: "Fast, disk space efficient package manager",
    color: "#F69220",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="12" height="12" rx="2" fill="#F69220" />
        <rect x="18" y="2" width="12" height="12" rx="2" fill="#F69220" />
        <rect x="34" y="2" width="12" height="12" rx="2" fill="#F69220" />
        <rect x="2" y="18" width="12" height="12" rx="2" fill="#F69220" />
        <rect x="18" y="18" width="12" height="12" rx="2" fill="#F69220" />
        <rect x="18" y="34" width="12" height="12" rx="2" fill="#F69220" />
        <rect x="34" y="18" width="12" height="12" rx="2" fill="#4E4E4E" />
        <rect x="2" y="34" width="12" height="12" rx="2" fill="#4E4E4E" />
        <rect x="34" y="34" width="12" height="12" rx="2" fill="#4E4E4E" />
      </svg>
    ),
  },
];

const Manager = ({ setManager }) => {
  const updateManager = (value) => {
    localStorage.setItem("manager", value);
    setManager(value);
  };

  return (
    <div className="manager-selector">
      <h2>Welcome to Remallow</h2>
      <p>Select your package manager to get started</p>
      <div className="manager-cards">
        {managers.map((m) => (
          <div key={m.id} className="manager-card" onClick={() => updateManager(m.id)}>
            <div className="manager-icon">{m.icon}</div>
            <h3>{m.name}</h3>
            <span className="desc">{m.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manager;
