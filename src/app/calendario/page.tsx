"use client";

import { useState } from "react";

// ─── Tipos ───────────────────────────────────────────────────
type ViewType = "semanal" | "mensal" | "anual";

// ─── Dados fictícios de eventos (substitua pela sua fonte real) ───
const eventosExemplo = [
  { id: 1, titulo: "Reunião do CapítuloReunião do", data: new Date(2026, 4, 11), cor: "#7b68ee" },
  { id: 2, titulo: "Entrega do Relatório", data: new Date(2026, 4, 15), cor: "#00a2ff" },
  { id: 3, titulo: "Workshop de UX", data: new Date(2026, 4, 20), cor: "#00d084" },
  { id: 4, titulo: "Apresentação Final", data: new Date(2026, 4, 28), cor: "#ff6b6b" },
  { id: 5, titulo: "Sprint Planning", data: new Date(2026, 3, 22), cor: "#7b68ee" },
  { id: 6, titulo: "Hackathon IEEE", data: new Date(2026, 6, 5), cor: "#00a2ff" },
];

// ─── Utilitários de data ───────────────────────────────────────
const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function getMesAnterior(ref: Date): Date {
  return new Date(ref.getFullYear(), ref.getMonth() - 1, 1);
}
function getProximoMes(ref: Date): Date {
  return new Date(ref.getFullYear(), ref.getMonth() + 1, 1);
}

function getDiasSemanaAtual(ref: Date): Date[] {
  const hoje = new Date(ref);
  const diaDaSemana = hoje.getDay(); // 0 = Domingo
  const domingo = new Date(hoje);
  domingo.setDate(hoje.getDate() - diaDaSemana);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(domingo);
    d.setDate(domingo.getDate() + i);
    return d;
  });
}

function getDiasDoMes(ano: number, mes: number): (Date | null)[] {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const dias: (Date | null)[] = [];
  for (let i = 0; i < primeiroDia; i++) dias.push(null); // espaços vazios antes
  for (let d = 1; d <= totalDias; d++) dias.push(new Date(ano, mes, d));
  return dias;
}

function isMesmaData(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function eventosNoDia(data: Date): typeof eventosExemplo {
  return eventosExemplo.filter((e) => isMesmaData(e.data, data));
}

function eventosNoMes(ano: number, mes: number): typeof eventosExemplo {
  return eventosExemplo.filter(
    (e) => e.data.getFullYear() === ano && e.data.getMonth() === mes
  );
}

// ─── Componente: View Semanal ──────────────────────────────────
function ViewSemanal({ refData }: { refData: Date }) {
  const dias = getDiasSemanaAtual(refData);
  const hoje = new Date();

  return (
    <div className="cal-semana-grid">
      {dias.map((dia, i) => {
        const ehHoje = isMesmaData(dia, hoje);
        const eventos = eventosNoDia(dia);
        return (
          <div key={i} className={`cal-semana-dia ${ehHoje ? "cal-dia-hoje" : ""}`}>
            <div className="cal-semana-header">
              <span className="cal-semana-nome-dia">{DIAS_SEMANA[i]}</span>
              <span className={`cal-semana-numero ${ehHoje ? "cal-numero-hoje" : ""}`}>
                {dia.getDate()}
              </span>
            </div>
            <div className="cal-semana-eventos">
              {eventos.map((ev) => (
                <div
                  key={ev.id}
                  className="cal-evento-pill"
                  style={{ backgroundColor: ev.cor }}
                >
                  {ev.titulo}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Componente: View Mensal ───────────────────────────────────
function ViewMensal({ refData }: { refData: Date }) {
  const ano = refData.getFullYear();
  const mes = refData.getMonth();
  const dias = getDiasDoMes(ano, mes);
  const hoje = new Date();

  return (
    <div className="cal-mensal-wrapper">
      <div className="cal-mensal-cabecalho-dias">
        {DIAS_SEMANA.map((d) => (
          <div key={d} className="cal-mensal-nome-dia">{d}</div>
        ))}
      </div>
      <div className="cal-mensal-grid">
        {dias.map((dia, i) => {
          if (!dia) return <div key={`vazio-${i}`} className="cal-mensal-celula cal-celula-vazia" />;
          const ehHoje = isMesmaData(dia, hoje);
          const eventos = eventosNoDia(dia);
          return (
            <div
              key={i}
              className={`cal-mensal-celula ${ehHoje ? "cal-dia-hoje" : ""}`}
            >
              <span className={`cal-mensal-numero ${ehHoje ? "cal-numero-hoje" : ""}`}>
                {dia.getDate()}
              </span>
              <div className="cal-mensal-eventos">
                {eventos.slice(0, 2).map((ev) => (
                  <div
                    key={ev.id}
                    className="cal-evento-pill cal-evento-pill--pequeno"
                    style={{ backgroundColor: ev.cor }}
                  >
                    {ev.titulo}
                  </div>
                ))}
                {eventos.length > 2 && (
                  <span className="cal-mais-eventos">+{eventos.length - 2} mais</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Componente: View Anual ────────────────────────────────────
function ViewAnual({ refData }: { refData: Date }) {
  const ano = refData.getFullYear();
  const hoje = new Date();

  return (
    <div className="cal-anual-grid">
      {MESES.map((nomeMes, mesIdx) => {
        const dias = getDiasDoMes(ano, mesIdx);
        const qtdEventos = eventosNoMes(ano, mesIdx).length;
        return (
          <div key={mesIdx} className="cal-anual-mes">
            <div className="cal-anual-mes-header">
              <span className="cal-anual-mes-nome">{nomeMes}</span>
              {qtdEventos > 0 && (
                <span className="cal-anual-badge">{qtdEventos} evento{qtdEventos > 1 ? "s" : ""}</span>
              )}
            </div>
            <div className="cal-anual-mini-cabecalho">
              {DIAS_SEMANA.map((d) => (
                <span key={d} className="cal-anual-mini-dia-nome">{d[0]}</span>
              ))}
            </div>
            <div className="cal-anual-mini-grid">
              {dias.map((dia, i) => {
                if (!dia) return <span key={`v-${i}`} className="cal-anual-mini-celula" />;
                const ehHoje = isMesmaData(dia, hoje);
                const temEvento = eventosNoDia(dia).length > 0;
                return (
                  <span
                    key={i}
                    className={`cal-anual-mini-celula ${ehHoje ? "cal-anual-hoje" : ""} ${temEvento ? "cal-anual-com-evento" : ""}`}
                    title={temEvento ? eventosNoDia(dia).map((e) => e.titulo).join(", ") : ""}
                  >
                    {dia.getDate()}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Componente Principal ──────────────────────────────────────
export default function Calendario() {
  const [view, setView] = useState<ViewType>("mensal");
  const [refData, setRefData] = useState(new Date());

  // Navegar para frente/trás dependendo da view ativa
  function navegar(direcao: "anterior" | "proximo") {
    setRefData((atual) => {
      const nova = new Date(atual);
      if (view === "semanal") {
        nova.setDate(nova.getDate() + (direcao === "proximo" ? 7 : -7));
      } else if (view === "mensal") {
        return direcao === "proximo" ? getProximoMes(atual) : getMesAnterior(atual);
      } else {
        nova.setFullYear(nova.getFullYear() + (direcao === "proximo" ? 1 : -1));
      }
      return nova;
    });
  }

  // Título dinâmico da navegação
  function getTitulo(): string {
    if (view === "semanal") {
      const dias = getDiasSemanaAtual(refData);
      const inicio = dias[0];
      const fim = dias[6];
      if (inicio.getMonth() === fim.getMonth()) {
        return `${inicio.getDate()} – ${fim.getDate()} de ${MESES[inicio.getMonth()]} de ${inicio.getFullYear()}`;
      }
      return `${inicio.getDate()}/${inicio.getMonth() + 1} – ${fim.getDate()}/${fim.getMonth() + 1}/${fim.getFullYear()}`;
    }
    if (view === "mensal") {
      return `${MESES[refData.getMonth()]} de ${refData.getFullYear()}`;
    }
    return `${refData.getFullYear()}`;
  }

  return (
    <>
      {/* ── Estilos embutidos ── */}
      <style>{`
        /* Contêiner geral da página do calendário */
        .cal-pagina {
          width: 85%;
          max-width: 900px;
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          background-color: var(--bg-color, #f7f8f9);
          margin: 24px auto;
        }

        /* Barra superior: título + filtros + navegação */
        .cal-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cal-titulo {
          font-size: 1.4rem;
          font-weight: 700;
          color: #111;
        }

        /* Grupo de botões de filtro (Semanal / Mensal / Anual) */
        .cal-filtros {
          display: flex;
          gap: 6px;
          background: #e8e9ee;
          border-radius: 8px;
          padding: 4px;
        }

        .cal-filtro-btn {
          padding: 6px 18px;
          border: none;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          color: #555;
          transition: background 0.15s, color 0.15s;
        }

        .cal-filtro-btn:hover {
          background: #d0d2dc;
          color: #333;
        }

        .cal-filtro-btn.ativo {
          background: #7b68ee;
          color: white;
        }

        /* Botões de navegação ← → */
        .cal-nav {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cal-nav-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          color: #555;
        }

        .cal-nav-btn:hover {
          background: #f0eeff;
          border-color: #7b68ee;
          color: #7b68ee;
        }

        .cal-nav-titulo {
          font-size: 0.95rem;
          font-weight: 600;
          color: #333;
          min-width: 180px;
          text-align: center;
        }

        /* ──── VIEW SEMANAL ──── */
        .cal-semana-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .cal-semana-dia {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 12px 10px;
          min-height: 160px;
        }

        .cal-semana-dia.cal-dia-hoje {
          border-color: #7b68ee;
          box-shadow: 0 0 0 2px #ece9ff;
        }

        .cal-semana-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 10px;
        }

        .cal-semana-nome-dia {
          font-size: 0.75rem;
          font-weight: 600;
          color: #888;
          text-transform: uppercase;
        }

        .cal-semana-numero {
          font-size: 1.2rem;
          font-weight: 700;
          color: #333;
          margin-top: 2px;
        }

        .cal-numero-hoje {
          background: #7b68ee;
          color: white !important;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
        }

        .cal-semana-eventos {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* ──── EVENTO (pílula colorida) ──── */
        .cal-evento-pill {
          color: white;
          border-radius: 4px;
          padding: 3px 7px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .cal-evento-pill--pequeno {
          font-size: 0.7rem;
          padding: 2px 5px;
        }

        /* ──── VIEW MENSAL ──── */
        .cal-mensal-wrapper {
          background: white;
          border-radius: 10px;
          border: 1px solid #e0e0e0;
          overflow: hidden;
        }

        .cal-mensal-cabecalho-dias {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background: #f4f4f8;
          border-bottom: 1px solid #e0e0e0;
        }

        .cal-mensal-nome-dia {
          padding: 10px 0;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: #888;
          text-transform: uppercase;
        }

        .cal-mensal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }

        .cal-mensal-celula {
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          padding: 8px;
          min-height: 90px;
          vertical-align: top;
        }

        .cal-celula-vazia {
          background: #fafafa;
          min-height: 90px;
        }

        .cal-mensal-celula.cal-dia-hoje {
          background: #f0eeff;
        }

        .cal-mensal-numero {
          font-size: 0.85rem;
          font-weight: 600;
          color: #444;
          display: inline-block;
          margin-bottom: 4px;
        }

        .cal-mensal-celula .cal-numero-hoje {
          font-size: 0.8rem;
        }

        .cal-mensal-eventos {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cal-mais-eventos {
          font-size: 0.68rem;
          color: #888;
          font-weight: 600;
          margin-top: 2px;
        }

        /* ──── VIEW ANUAL ──── */
        .cal-anual-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 900px) {
          .cal-anual-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 600px) {
          .cal-anual-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cal-semana-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .cal-anual-mes {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 12px;
        }

        .cal-anual-mes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .cal-anual-mes-nome {
          font-size: 0.85rem;
          font-weight: 700;
          color: #333;
        }

        .cal-anual-badge {
          font-size: 0.65rem;
          font-weight: 600;
          background: #ece9ff;
          color: #7b68ee;
          border-radius: 10px;
          padding: 2px 7px;
        }

        .cal-anual-mini-cabecalho {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 4px;
        }

        .cal-anual-mini-dia-nome {
          text-align: center;
          font-size: 0.65rem;
          color: #aaa;
          font-weight: 600;
        }

        .cal-anual-mini-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
        }

        .cal-anual-mini-celula {
          text-align: center;
          font-size: 0.72rem;
          color: #555;
          padding: 3px 1px;
          border-radius: 4px;
          cursor: default;
        }

        .cal-anual-hoje {
          background: #7b68ee;
          color: white !important;
          border-radius: 50%;
          font-weight: 700;
        }

        .cal-anual-com-evento {
          position: relative;
          font-weight: 700;
          color: #7b68ee;
        }

        .cal-anual-com-evento::after {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          background: #7b68ee;
          border-radius: 50%;
          margin: 1px auto 0;
        }

        .cal-anual-hoje.cal-anual-com-evento::after {
          background: white;
        }
      `}</style>

      <main className="cal-pagina">
        {/* ── Barra de controles ── */}
        <div className="cal-topbar">
          <h1 className="cal-titulo">🗓️ Calendário</h1>

          {/* Filtros de view */}
          <div className="cal-filtros">
            {(["semanal", "mensal", "anual"] as ViewType[]).map((v) => (
              <button
                key={v}
                className={`cal-filtro-btn ${view === v ? "ativo" : ""}`}
                onClick={() => setView(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          {/* Navegação ← título → */}
          <div className="cal-nav">
            <button className="cal-nav-btn" onClick={() => navegar("anterior")} title="Anterior">
              ←
            </button>
            <span className="cal-nav-titulo">{getTitulo()}</span>
            <button className="cal-nav-btn" onClick={() => navegar("proximo")} title="Próximo">
              →
            </button>
          </div>
        </div>

        {/* ── Conteúdo do calendário ── */}
        {view === "semanal" && <ViewSemanal refData={refData} />}
        {view === "mensal" && <ViewMensal refData={refData} />}
        {view === "anual" && <ViewAnual refData={refData} />}
      </main>
    </>
  );
}
