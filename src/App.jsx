import { useState, useRef, useEffect, useMemo, useCallback } from "react";

const BIOCHAR_CASES = [
  {
    id: 1,
    name: "Exomad Green",
    location: "Concepción, Bolivia",
    lat: -16.27,
    lng: -62.03,
    category: "Carbon Credits + Soil Amendment",
    color: "#2ECC71",
    feedstock: "Forestry waste (sawmill residues)",
    process: "Pyrolysis at ~600°C",
    product: "Biochar donated to indigenous farmers + Carbon removal credits (CORCs)",
    businessModel: "Revenue from carbon credit sales; biochar donated free to local communities",
    pricing: "Carbon credits at ~€140/CORC (~$150/tonne CO₂e). NextGen offtake at avg $200/tonne.",
    scale: "260,000 tonnes CO₂/year (2 facilities). Target: 1M tonnes/year by 2027 (5 facilities).",
    keyClients: "Microsoft (1.24M tonne deal over 10 years), NextGen CDR, Swiss Re, JPMorgan Chase",
    revenue: "BCR market grew from $14.6M (2022) → $33.9M (2023) → $181.5M (2024). Exomad is world's largest biochar producer.",
    impact: "300+ green jobs. Biochar donated to indigenous communities, boosting crop yields by 33%. Reducing open burning of waste wood.",
    website: "https://www.exomadgreen.com",
    tagline: "World's largest biochar producer & CDR supplier"
  },
  {
    id: 2,
    name: "Pacific Biochar",
    location: "Willows, California, USA",
    lat: 39.52,
    lng: -122.19,
    category: "Soil Amendment + Fertilizer + Feed",
    color: "#E67E22",
    feedstock: "Forest biomass from high fire-hazard areas (thinnings, logging residues, sawmill residues)",
    process: "Pyrolysis at biomass power plants — intercepts charcoal from emissions systems before it's re-burned",
    product: "Blacklite Pure biochar, Fish Char 7-5-5 fertilizer, feed-grade softwood charcoal",
    businessModel: "Multi-revenue: sell bulk biochar as soil amendment, biochar-enhanced fertilizer (Fish Char 7-5-5), feed-grade charcoal via Seley & Co., plus carbon credit sales to Microsoft",
    pricing: "Blacklite Pure starting at $50/cubic yard (bulk). Carbon credits sold to Microsoft (~1,500 tonnes). Carbon drawdown achievable at $35/ton at scale.",
    scale: "CA can generate 1.5M tons of biochar/year from forest biomass. #1 globally for durable CDR deliveries (CDR.fyi 2023).",
    keyClients: "Microsoft, Kellogg Garden Products, Seley & Co. (livestock feed distribution), vineyard operators (Dominus Estate, Oasis Vineyard)",
    revenue: "Benefit Corporation status. Multiple product lines across soil, fertilizer, feed, and carbon credits.",
    impact: "Reduces wildfire fuel loads. Vineyard trials show significant yield increases over 7 years. CDFA-licensed for commercial animal feed (Dec 2022). Water holding capacity improvements critical for CA drought.",
    website: "https://pacificbiochar.com",
    tagline: "Turning wildfire risk into soil gold"
  },
  {
    id: 3,
    name: "Spruce Haven Farm",
    location: "Union Springs, New York, USA",
    lat: 42.84,
    lng: -76.69,
    category: "Dairy Farm — Manure-to-Biochar",
    color: "#3498DB",
    feedstock: "Separated solids from digested cow manure",
    process: "Pyrolysis kiln (leased from Biomass Controls, CT) — manure digester → pyrolysis → biochar",
    product: "Biochar for soil amendment; also exploring feed additive applications",
    businessModel: "Circular on-farm model: cow manure → digester → methane (→ electricity to grid) + solids → pyrolysis → biochar (→ soil). Reduces manure storage costs, sequesters carbon.",
    pricing: "Cost savings from reduced manure storage & handling. Biochar as feed additive: 0.6–2.0% of dry matter. Feed-grade biochar market still emerging in US (not yet FDA-approved for food-chain animals).",
    scale: "2,030 cows, 1,770 heifers, 3,800 acres. NY's first commercial dairy with biochar kiln. Co-funded by NYSERDA.",
    keyClients: "Internal use (closed-loop farm system). Cornell University research partnership (Prof. Johannes Lehmann).",
    revenue: "Savings from reduced manure lagoon maintenance, nutrient runoff mitigation (Cayuga Lake), and potential carbon credit revenue.",
    impact: "Net-zero carbon dairy production goal. Reduces phosphate/nitrogen runoff to Cayuga Lake. Creates renewable natural gas from methane. Cornell studying economic benefits.",
    website: "https://news.cornell.edu/stories/2024/01/nys-first-dairy-farm-biochar-kiln-advances-green-agriculture",
    tagline: "NY's first dairy biochar kiln — closing the loop"
  },
  {
    id: 4,
    name: "Stockholm Biochar Project",
    location: "Stockholm, Sweden",
    lat: 59.33,
    lng: 18.07,
    category: "Urban Infrastructure — Green Cities",
    color: "#9B59B6",
    feedstock: "Urban green waste (park trimmings, garden waste from residents)",
    process: "Pyrolysis at municipal biochar plant (built 2017, funded by €1M Bloomberg Philanthropies Mayors Challenge prize)",
    product: "Biochar for urban tree pits (\"Stockholm Method\"), given free to residents for gardens",
    businessModel: "Municipal public good model: city collects green waste → produces biochar + heat for district heating → biochar used in urban tree planting and given to residents. Residents return yard waste, completing the cycle.",
    pricing: "€1M initial Bloomberg prize investment. Biochar used in structural soil: ~2 m³ biochar per tree, ~700 trees/year. Heat energy offsets fossil fuel costs in district heating.",
    scale: "100+ tons of biochar produced since 2017. ~700 trees planted/year. Plans for larger plant to scale production.",
    keyClients: "City of Stockholm parks, residents, now being replicated in Trondheim (Norway), Prague, Magdeburg, Cologne, Dresden.",
    revenue: "Cost savings from extended tree lifespan (was: 2/3 of city trees dead/dying in 2001 → now thriving). Stormwater management savings. District heating revenue from heat byproduct.",
    impact: "Transformed urban forestry — trees now thriving where 2/3 were dying. Stormwater filtration, reduced urban heat island, carbon sequestration. Part of Stockholm's net-zero 2030 climate plan.",
    website: "https://bloombergcities.jhu.edu/news/solution-spotlight-turning-garden-waste-carbon-sink-stockholm",
    tagline: "Turning garden waste into thriving city trees"
  },
  {
    id: 5,
    name: "Carbofex",
    location: "Nokia, Finland",
    lat: 61.48,
    lng: 23.50,
    category: "Industrial Biochar + District Heating",
    color: "#E74C3C",
    feedstock: "PEFC-certified spruce wood chips",
    process: "Continuous pyrolysis — 500 kg wood chips/hour → 140 kg biochar + 1 MW clean energy",
    product: "EBC-certified biochar (>90% carbon), pyrolysis oil, clean energy for municipal heating",
    businessModel: "Triple-revenue: sell premium biochar (ag + industrial), sell pyrolysis oil, sell heat energy to municipal district heating network. Plus carbon credit sales.",
    pricing: "Carbon credits sold to Shopify & Microsoft. Premium EBC-certified biochar for wholesale. BCR credits at ~$150/tonne CO₂e market rate.",
    scale: "1,000 tons biochar + 600 tons pyrolysis oil/year. 8,000 MWh clean energy. 9,800 tonnes CO₂ captured since 2017.",
    keyClients: "Shopify, Microsoft, agricultural wholesale customers, municipal heating networks",
    revenue: "Carbon XPRIZE Top 60 finalist. Growing demand from Nordic corporate buyers at 2-3× agricultural rates.",
    impact: "Organic-approved biochar for food production. Processes waste biomass that would otherwise be burned. Heat energy reduces fossil fuel use in Finnish winters.",
    website: "https://carbofex.fi",
    tagline: "Clean carbon from Finnish forests"
  },
  {
    id: 6,
    name: "Arthur's Point Farm",
    location: "Ghent, New York, USA",
    lat: 42.32,
    lng: -73.66,
    category: "Small Farm — Feed + Soil",
    color: "#1ABC9C",
    feedstock: "On-farm biomass",
    process: "On-farm pyrolysis — surplus energy used for heat/power",
    product: "Biochar as soil amendment and livestock feed supplement",
    businessModel: "Diversified small farm model: produce biochar on-farm, use as feed supplement (improves digestion, absorbs toxins) and as soil amendment. Manure-biochar mix creates premium compost.",
    pricing: "Feed supplement: 0.6–2% of dry matter. Soil amendment: increases crop productivity 18–28%. Each kg biochar avoids ~3 kg CO₂.",
    scale: "Small-scale artisanal production. Representative of growing US farm-level biochar movement.",
    keyClients: "Direct farm use. Educational/demonstration farm model.",
    revenue: "Cost offsets from reduced veterinary bills, improved feed efficiency, reduced fertilizer needs, potential carbon credits.",
    impact: "Connects to ancient terra preta practices. Biochar in feed reduces toxins (glyphosate, mycotoxins), improves hoof health, reduces barn odors. In Europe, 90% of biochar goes to livestock farming.",
    website: "https://arthurspointfarm.com/biochar/",
    tagline: "Ancient wisdom meets modern farming"
  }
];

function latLngToXY(lat, lng, width, height) {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

function Globe({ onSelectCase, selectedCase, rotation }) {
  const canvasRef = useRef(null);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [dimensions, setDimensions] = useState({ w: 600, h: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      const w = Math.min(window.innerWidth - 40, 900);
      const h = Math.min(w * 0.55, 500);
      setDimensions({ w, h });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mapProjection = useMemo(() => {
    return BIOCHAR_CASES.map((c) => {
      const adjustedLng = ((c.lng - rotation + 540) % 360) - 180;
      const { x, y } = latLngToXY(c.lat, adjustedLng, dimensions.w, dimensions.h);
      return { ...c, px: x, py: y, visible: adjustedLng > -170 && adjustedLng < 170 };
    });
  }, [rotation, dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { w, h } = dimensions;
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, w, h);

    // Ocean background
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
    oceanGrad.addColorStop(0, "#0a1628");
    oceanGrad.addColorStop(0.5, "#0d1f3c");
    oceanGrad.addColorStop(1, "#0a1628");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "rgba(40, 70, 120, 0.3)";
    ctx.lineWidth = 0.5;
    for (let lat = -60; lat <= 60; lat += 30) {
      const { y } = latLngToXY(lat, 0, w, h);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let lng = -180; lng <= 180; lng += 30) {
      const adjustedLng = ((lng - rotation + 540) % 360) - 180;
      const { x } = latLngToXY(0, adjustedLng, w, h);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Simplified continent outlines (rough polygons)
    const drawContinent = (points, fillColor) => {
      ctx.beginPath();
      const adjusted = points.map(([lat, lng]) => {
        const aLng = ((lng - rotation + 540) % 360) - 180;
        return latLngToXY(lat, aLng, w, h);
      });
      ctx.moveTo(adjusted[0].x, adjusted[0].y);
      adjusted.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = "rgba(100, 160, 120, 0.3)";
      ctx.lineWidth = 0.7;
      ctx.stroke();
    };

    const landColor = "rgba(30, 65, 50, 0.6)";
    // North America
    drawContinent([
      [70, -165], [72, -130], [70, -85], [60, -65], [48, -52],
      [30, -80], [25, -80], [20, -100], [15, -90], [15, -87],
      [30, -115], [32, -117], [48, -125], [55, -130], [60, -145], [65, -168]
    ], landColor);
    // South America
    drawContinent([
      [12, -75], [10, -62], [5, -52], [0, -50], [-5, -35],
      [-15, -40], [-23, -42], [-35, -55], [-50, -70], [-55, -68],
      [-50, -75], [-40, -73], [-20, -70], [-5, -77], [0, -78]
    ], landColor);
    // Europe
    drawContinent([
      [70, -10], [72, 30], [70, 40], [60, 40], [55, 28],
      [50, 30], [45, 27], [38, 25], [36, -5], [43, -8],
      [47, -2], [48, 2], [52, 5], [55, 10], [58, 5], [60, -5]
    ], landColor);
    // Africa
    drawContinent([
      [35, -10], [37, 10], [32, 32], [25, 35], [12, 44],
      [0, 42], [-10, 40], [-25, 35], [-34, 26], [-35, 18],
      [-30, 15], [-15, 12], [-5, 8], [5, 0], [5, -10], [15, -17], [25, -15]
    ], landColor);
    // Asia
    drawContinent([
      [70, 40], [72, 80], [70, 130], [68, 170], [60, 165],
      [55, 135], [50, 130], [42, 130], [35, 128], [25, 120],
      [20, 110], [10, 105], [5, 100], [10, 80], [22, 70],
      [28, 65], [25, 55], [30, 48], [40, 44], [45, 40], [55, 40]
    ], landColor);
    // Australia
    drawContinent([
      [-12, 130], [-13, 140], [-18, 146], [-25, 153],
      [-35, 150], [-38, 145], [-37, 140], [-35, 135],
      [-32, 130], [-22, 115], [-15, 125]
    ], landColor);

    // Draw pins
    mapProjection.forEach((c) => {
      if (!c.visible) return;
      const isSelected = selectedCase?.id === c.id;
      const isHovered = hoveredPin === c.id;
      const size = isSelected ? 12 : isHovered ? 10 : 7;

      // Glow
      const glow = ctx.createRadialGradient(c.px, c.py, 0, c.px, c.py, size * 3);
      glow.addColorStop(0, c.color + "88");
      glow.addColorStop(1, c.color + "00");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(c.px, c.py, size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Pulse ring for selected
      if (isSelected) {
        ctx.strokeStyle = c.color + "66";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(c.px, c.py, size + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Pin dot
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(c.px, c.py, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(c.px, c.py, size * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Label
      if (isHovered || isSelected) {
        ctx.font = `bold ${Math.max(11, w * 0.016)}px 'DM Sans', sans-serif`;
        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        ctx.fillText(c.name, c.px + size + 6, c.py - 4);
        ctx.font = `${Math.max(9, w * 0.012)}px 'DM Sans', sans-serif`;
        ctx.fillStyle = c.color;
        ctx.fillText(c.location, c.px + size + 6, c.py + 10);
      }
    });
  }, [mapProjection, hoveredPin, selectedCase, dimensions]);

  const handleCanvasInteraction = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = dimensions.w / rect.width;
      const scaleY = dimensions.h / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;

      let found = null;
      mapProjection.forEach((c) => {
        if (!c.visible) return;
        const dx = mx - c.px;
        const dy = my - c.py;
        if (dx * dx + dy * dy < 400) found = c;
      });
      return found;
    },
    [mapProjection, dimensions]
  );

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: dimensions.w,
        height: "auto",
        aspectRatio: `${dimensions.w}/${dimensions.h}`,
        borderRadius: 12,
        cursor: hoveredPin ? "pointer" : "grab",
        display: "block",
        margin: "0 auto"
      }}
      onMouseMove={(e) => {
        const found = handleCanvasInteraction(e);
        setHoveredPin(found?.id || null);
      }}
      onClick={(e) => {
        const found = handleCanvasInteraction(e);
        if (found) onSelectCase(found);
      }}
      onMouseLeave={() => setHoveredPin(null)}
    />
  );
}

function DetailPanel({ data, onClose }) {
  if (!data) return null;
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0d1b2a 0%, #1b2d45 100%)",
        borderRadius: 16,
        border: `1px solid ${data.color}33`,
        padding: "28px 32px",
        marginTop: 16,
        position: "relative",
        boxShadow: `0 0 40px ${data.color}15, 0 8px 32px rgba(0,0,0,0.4)`,
        animation: "slideUp 0.3s ease-out"
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.08)", border: "none",
          color: "#fff", width: 32, height: 32, borderRadius: 8,
          cursor: "pointer", fontSize: 18, display: "flex",
          alignItems: "center", justifyContent: "center"
        }}
      >
        ×
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <div style={{
          width: 14, height: 14, borderRadius: "50%",
          background: data.color, boxShadow: `0 0 12px ${data.color}88`
        }} />
        <h2 style={{
          margin: 0, fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(20px, 3vw, 28px)", color: "#fff", letterSpacing: "-0.02em"
        }}>
          {data.name}
        </h2>
      </div>
      <p style={{
        margin: "0 0 4px 26px", fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, color: data.color, fontWeight: 600, letterSpacing: "0.06em",
        textTransform: "uppercase"
      }}>
        {data.category}
      </p>
      <p style={{
        margin: "0 0 20px 26px", fontFamily: "'DM Sans', sans-serif",
        fontSize: 14, color: "rgba(255,255,255,0.5)", fontStyle: "italic"
      }}>
        {data.tagline} — {data.location}
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 14
      }}>
        {[
          { label: "Feedstock", value: data.feedstock, icon: "🌿" },
          { label: "Process", value: data.process, icon: "🔥" },
          { label: "Products", value: data.product, icon: "📦" },
          { label: "Business Model", value: data.businessModel, icon: "💼" },
          { label: "Pricing & Economics", value: data.pricing, icon: "💰" },
          { label: "Scale", value: data.scale, icon: "📈" },
          { label: "Key Clients", value: data.keyClients, icon: "🤝" },
          { label: "Revenue Indicators", value: data.revenue, icon: "🏦" },
          { label: "Impact", value: data.impact, icon: "🌍" }
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 10,
              padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.06)"
            }}
          >
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11,
              color: data.color, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.08em", marginBottom: 6
            }}>
              {item.icon} {item.label}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              color: "rgba(255,255,255,0.82)", lineHeight: 1.55
            }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <a
        href={data.website}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginTop: 20, padding: "10px 22px",
          background: data.color, color: "#000",
          borderRadius: 8, textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, fontWeight: 700,
          letterSpacing: "0.03em",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: `0 4px 16px ${data.color}44`
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = `0 6px 24px ${data.color}66`;
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = `0 4px 16px ${data.color}44`;
        }}
      >
        Visit Website →
      </a>
    </div>
  );
}

export default function BiocharGlobe() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [rotStart, setRotStart] = useState(0);
  const animRef = useRef(null);
  const autoRotate = useRef(true);

  useEffect(() => {
    const animate = () => {
      if (autoRotate.current && !isDragging && !selectedCase) {
        setRotation((r) => (r + 0.08) % 360);
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isDragging, selectedCase]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setRotStart(rotation);
    autoRotate.current = false;
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart;
    setRotation(rotStart - dx * 0.3);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    if (!selectedCase) {
      setTimeout(() => { autoRotate.current = true; }, 2000);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setRotStart(rotation);
    autoRotate.current = false;
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - dragStart;
    setRotation(rotStart - dx * 0.3);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #060d18 0%, #0a1628 30%, #0d1f3c 70%, #060d18 100%)",
      fontFamily: "'DM Sans', sans-serif",
      color: "#fff",
      padding: "20px 20px 60px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32, paddingTop: 12 }}>
          <p style={{
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)", marginBottom: 8, fontWeight: 600
          }}>
            AEM 4004 · Siendo Naturaleza · Biochar Consulting
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 900, margin: "0 0 8px",
            background: "linear-gradient(135deg, #fff 30%, #2ECC71 70%, #E67E22)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em"
          }}>
            Biochar Around the World
          </h1>
          <p style={{
            fontSize: "clamp(13px, 2vw, 16px)",
            color: "rgba(255,255,255,0.5)",
            maxWidth: 560, margin: "0 auto", lineHeight: 1.6
          }}>
            Real companies, real business models, real numbers.
            <br />Click any pin to explore use cases, pricing, and impact.
          </p>
        </div>

        {/* Quick-access legend */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: 8, marginBottom: 20
        }}>
          {BIOCHAR_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCase(c);
                autoRotate.current = false;
                // Center the map on this pin
                setRotation(c.lng);
              }}
              style={{
                background: selectedCase?.id === c.id
                  ? c.color + "22"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${selectedCase?.id === c.id ? c.color + "66" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 20, padding: "6px 14px",
                color: selectedCase?.id === c.id ? c.color : "rgba(255,255,255,0.6)",
                cursor: "pointer", fontSize: 12, fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 6
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: c.color, display: "inline-block",
                boxShadow: `0 0 6px ${c.color}66`
              }} />
              {c.name}
            </button>
          ))}
        </div>

        {/* Globe / Map */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
            background: "rgba(0,0,0,0.3)",
            boxShadow: "0 16px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            position: "relative"
          }}
        >
          <Globe
            rotation={rotation}
            selectedCase={selectedCase}
            onSelectCase={(c) => {
              setSelectedCase(c);
              autoRotate.current = false;
            }}
          />
          <div style={{
            position: "absolute", bottom: 12, left: "50%",
            transform: "translateX(-50%)",
            fontSize: 11, color: "rgba(255,255,255,0.25)",
            fontFamily: "'DM Sans', sans-serif",
            animation: selectedCase ? "none" : "pulse 2s infinite"
          }}>
            ← drag to rotate · click pins for details →
          </div>
        </div>

        {/* Market context bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 10, marginTop: 16
        }}>
          {[
            { label: "BCR Market 2024", value: "$181.5M", sub: "↑ 435% from 2023" },
            { label: "Credits Purchased", value: "3.04M t", sub: "since 2022" },
            { label: "Spot Price", value: "~$150/t", sub: "CO₂e (Q4 2025)" },
            { label: "Market Forecast", value: "$1.85B", sub: "by 2032 (CAGR 29.4%)" }
          ].map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 10, padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: 10, color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase", letterSpacing: "0.1em",
                marginBottom: 4, fontWeight: 600
              }}>
                {s.label}
              </div>
              <div style={{
                fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 800,
                fontFamily: "'Playfair Display', serif",
                color: "#2ECC71"
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2
              }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <DetailPanel
          data={selectedCase}
          onClose={() => {
            setSelectedCase(null);
            autoRotate.current = true;
          }}
        />

        {/* Footer note */}
        <p style={{
          textAlign: "center", fontSize: 11,
          color: "rgba(255,255,255,0.2)", marginTop: 32,
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Data sourced from company websites, CDR.fyi, Puro.earth, Carbonfuture, Cornell Chronicle, Bloomberg Cities, and Carbon Credits.
          <br />Prepared for AEM 4004 — Siendo Naturaleza Biochar Consulting Project · Cornell University
        </p>
      </div>
    </div>
  );
}
