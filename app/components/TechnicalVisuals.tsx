export function ArchitectureGraph({ compact = false }: { compact?: boolean }) {
  const nodes = compact ? ["Request", "Automation", "Systems"] : ["Client", "API", "Cloud", "Containers", "Database", "Monitoring"];
  return <div className={compact ? "arch-graph compact" : "arch-graph"}>{nodes.map((node, i) => <div className="arch-node" key={node}><span className="node-dot" />{node}{i < nodes.length - 1 && <span className="arch-arrow">→</span>}</div>)}</div>;
}

export function Terminal() {
  return <div className="terminal"><div className="terminal-bar"><span /><span /><span /><em>ops@agency:~</em></div><div className="terminal-body"><p><b>$</b> docker ps</p><p className="muted">CONTAINER ID &nbsp; IMAGE &nbsp; STATUS</p><p>e31f2a &nbsp; api:latest &nbsp; <i>Up 14 days</i></p><p><b>$</b> systemctl status nginx</p><p><i>● nginx.service — active (running)</i></p><p><b>$</b> git push origin main <span className="cursor">_</span></p></div></div>;
}

export function Workflow() {
  return <div className="workflow">{["Webhook", "AI classify", "Knowledge", "Decision", "Action", "Log"].map((step, i) => <div className="workflow-step" key={step}><span>0{i + 1}</span><strong>{step}</strong>{i < 5 && <b>→</b>}</div>)}</div>;
}
