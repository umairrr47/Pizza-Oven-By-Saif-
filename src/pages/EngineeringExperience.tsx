
import React, { useEffect, useRef, useState } from "react";
import "../styles/EngineeringExperience.css";
import ovenfront from "../assets/oven-front.png"
import ovenexplode from "../assets/oven-exploded.png"

const steps = [
  {
    num: "01 / COMPLETE OVEN",
    title: "The complete oven.",
    desc: "A premium mosaic dome, stainless-steel front door and a sturdy mobile base.",
  },
  {
    num: "02 / EXPLODED VIEW",
    title: "The oven opens up.",
    desc: "Every major assembly separates into its own position.",
  },
  {
    num: "03 / CHIMNEY PIPE",
    title: "Stainless-steel chimney.",
    desc: "The chimney pipe sits at the crown of the oven dome.",
  },
  {
    num: "04 / TILE LAYER",
    title: "Premium mosaic tile.",
    desc: "The outer mosaic finish protects and defines the dome.",
  },
  {
    num: "05 / CONCRETE LAYER",
    title: "High-strength concrete.",
    desc: "The structural concrete layer supports the dome assembly.",
  },
  {
    num: "06 / FIRE BRICK DOME",
    title: "Custom fire-brick dome.",
    desc: "The inner fire-brick layer forms the high-temperature cooking chamber.",
  },
  {
    num: "07 / MULTI-LAYER INSULATION",
    title: "Heat-resistant insulation.",
    desc: "The insulation layers help retain heat inside the oven.",
  },
  {
    num: "08 / DOME",
    title: "The outer dome.",
    desc: "The finished dome houses the oven's internal layers.",
  },
  {
    num: "09 / FRONT DOOR",
    title: "Stainless-steel front door.",
    desc: "The front door is fitted with its handle and CNC logo.",
  },
  {
    num: "10 / IMPORTED DOUBLE BURNER",
    title: "Imported burner system.",
    desc: "High-pressure Venturi and long-flame burner technology.",
  },
  {
    num: "11 / COOKING FLOOR",
    title: "Custom fire-brick floor.",
    desc: "The cooking floor is made from high-quality fire brick.",
  },
  {
    num: "12 / PUSH BUTTON",
    title: "Fire ignition.",
    desc: "The push button activates the ignition system.",
  },
  {
    num: "13 / PILOT FIRE",
    title: "Pilot fire.",
    desc: "The pilot flame supports the burner ignition system.",
  },
  {
    num: "14 / MAIN FIRE",
    title: "Main burner flame.",
    desc: "The main fire provides the heat for cooking.",
  },
];

type CalloutText = {
  x: number;
  y: number;
  value: string;
  type?: "label" | "sub";
  anchor?: "middle" | "start" | "end";
};

type Callout = {
  id: number;
  path: string;
  dot: [number, number];
  texts: CalloutText[];
};

// MOBILE CALLOUTS
const mobileCallouts: Callout[] = [
  {
    id: 0,
    path: "M585 157 L710 157",
    dot: [585, 157],
    texts: [
      { x: 720, y: 164, value: "CHIMNEY PIPE" },
      { x: 720, y: 191, value: "Stainless Steel", type: "sub" },
    ],
  },
  {
    id: 3,
    path: "M773 264 L825 225 L860 225",
    dot: [773, 264],
    texts: [
      { x: 875, y: 260, value: "TILE LAYER" },
      { x: 875, y: 287, value: "Premium Mosaic Tile", type: "sub" },
    ],
  },
  {
    id: 4,
    path: "M735 350 L820 300 L860 300",
    dot: [735, 350],
    texts: [
      { x: 875, y: 335, value: "CONCRETE LAYER" },
      { x: 875, y: 362, value: "High Strength", type: "sub" },
      { x: 875, y: 386, value: "Concrete", type: "sub" },
    ],
  },
  {
    id: 5,
    path: "M703 445 L820 425 L860 425",
    dot: [703, 445],
    texts: [
      { x: 875, y: 450, value: "CUSTOMISE" },
      { x: 875, y: 478, value: "FIRE BRICK DOME" },
      { x: 875, y: 508, value: "High Quality", type: "sub" },
      { x: 875, y: 532, value: "Customise", type: "sub" },
      { x: 875, y: 556, value: "Fire Brick", type: "sub" },
    ],
  },
  {
    id: 6,
    path: "M772 532 L820 560 L860 560",
    dot: [772, 532],
    texts: [
      { x: 875, y: 585, value: "MULTI LAYER" },
      { x: 875, y: 613, value: "INSULATION" },
      { x: 875, y: 642, value: "Heat Resistant", type: "sub" },
      { x: 875, y: 666, value: "Insulation Layer", type: "sub" },
    ],
  },
  {
    id: 1,
    path: "M285 310 L220 310 L195 310",
    dot: [285, 310],
    texts: [{ x: 125, y: 346, value: "DOME" }],
  },
  {
    id: 2,
    path: "M303 510 L225 510 L190 485 L155 485",
    dot: [303, 510],
    texts: [
      { x: 40, y: 490, value: "FRONT DOOR" },
      { x: 40, y: 520, value: "Stainless Steel", type: "sub" },
      { x: 40, y: 546, value: "with Handle", type: "sub" },
    ],
  },
  {
    id: 7,
    path: "M337 685 L280 685 L250 660 L215 660",
    dot: [337, 685],
    texts: [
      { x: 75, y: 635, value: "IMPORTED HIGH" },
      { x: 75, y: 663, value: "PRESSURE DOUBLE" },
      { x: 75, y: 691, value: "BURNER" },
      { x: 75, y: 720, value: "Ventury And Long", type: "sub" },
      { x: 75, y: 744, value: "Flame Burner System ..", type: "sub" },
      { x: 75, y: 768, value: "Advance Long Flame", type: "sub" },
      { x: 75, y: 792, value: "Technology", type: "sub" },
    ],
  },
  {
    id: 8,
    path: "M352 740 L310 820 L260 820 L215 820",
    dot: [352, 740],
    texts: [
      { x: 80, y: 840, value: "COOKING FLOOR" },
      { x: 80, y: 870, value: "Customise Fire Brick", type: "sub" },
      { x: 80, y: 895, value: "(High Quality", type: "sub" },
      { x: 80, y: 920, value: "Fire Brick)", type: "sub" },
    ],
  },
  {
    id: 9,
    path: "M510 935 L815 935 L860 935",
    dot: [530, 925],
    texts: [
      { x: 875, y: 945, value: "PUSH BUTTON" },
      { x: 875, y: 975, value: "Fire Ignition", type: "sub" },
    ],
  },
  {
    id: 10,
    path: "M580 1000 L830 1000 L860 1000",
    dot: [580, 1000],
    texts: [{ x: 875, y: 1010, value: "PILOT FIRE" }],
  },
  {
    id: 11,
    path: "M455 1015 L455 1305",
    dot: [455, 1015],
    texts: [
      {
        x: 455,
        y: 1345,
        value: "MAIN FIRE",
        anchor: "middle",
      },
    ],
  },
];

// DESKTOP CALLOUTS
const desktopCallouts: Callout[] = [
  {
    id: 0,
    path: "M795 126 L1035 126 L1070 126",
    dot: [795, 126],
    texts: [
      { x: 1090, y: 133, value: "CHIMNEY PIPE" },
      { x: 1090, y: 158, value: "Stainless Steel", type: "sub" },
    ],
  },
  {
    id: 3,
    path: "M895 182 L1035 182 L1070 215",
    dot: [895, 182],
    texts: [
      { x: 1090, y: 224, value: "1. TILE LAYER" },
      { x: 1090, y: 249, value: "Premium Mosaic Tile", type: "sub" },
    ],
  },
  {
    id: 4,
    path: "M874 228 L1035 260 L1070 294",
    dot: [874, 228],
    texts: [
      { x: 1090, y: 302, value: "2. CONCRETE LAYER" },
      { x: 1090, y: 327, value: "High Strength Concrete", type: "sub" },
    ],
  },
  {
    id: 5,
    path: "M858 278 L1030 335 L1070 375",
    dot: [858, 278],
    texts: [
      { x: 1090, y: 386, value: "3. CUSTOM FIRE BRICK DOME" },
      { x: 1090, y: 412, value: "High Quality Custom Fire Brick", type: "sub" },
    ],
  },
  {
    id: 6,
    path: "M894 323 L1035 425 L1070 455",
    dot: [894, 323],
    texts: [
      { x: 1090, y: 466, value: "4. MULTI-LAYER INSULATION" },
      { x: 1090, y: 491, value: "Heat Resistant Insulation Layer", type: "sub" },
    ],
  },
  {
    id: 1,
    path: "M637 207 L470 207 L430 207",
    dot: [637, 207],
    texts: [{ x: 70, y: 214, value: "DOME" }],
  },
  {
    id: 2,
    path: "M647 312 L470 312 L430 312",
    dot: [647, 312],
    texts: [
      { x: 70, y: 305, value: "FRONT DOOR" },
      { x: 70, y: 330, value: "Stainless Steel with Handle", type: "sub" },
    ],
  },
  {
    id: 7,
    path: "M665 404 L480 430 L430 430",
    dot: [665, 404],
    texts: [
      { x: 70, y: 438, value: "IMPORTED HIGH-PRESSURE" },
      { x: 70, y: 463, value: "DOUBLE BURNER" },
      { x: 70, y: 488, value: "Venturi and Long Flame Burner", type: "sub" },
      { x: 70, y: 511, value: "System · Advanced Long Flame Technology", type: "sub" },
    ],
  },
  {
    id: 8,
    path: "M673 433 L480 550 L430 550",
    dot: [673, 433],
    texts: [
      { x: 70, y: 571, value: "COOKING FLOOR" },
      { x: 70, y: 596, value: "Custom High-Quality Fire Brick", type: "sub" },
    ],
  },
  {
    id: 9,
    path: "M768 530 L1035 590 L1070 590",
    dot: [768, 530],
    texts: [
      { x: 1090, y: 598, value: "PUSH BUTTON" },
      { x: 1090, y: 623, value: "Fire Ignition", type: "sub" },
    ],
  },
  {
    id: 10,
    path: "M793 570 L1035 680 L1070 680",
    dot: [793, 570],
    texts: [{ x: 1090, y: 688, value: "PILOT FIRE" }],
  },
  {
    id: 11,
    path: "M727 578 L727 760",
    dot: [727, 578],
    texts: [
      {
        x: 727,
        y: 798,
        value: "MAIN FIRE",
        anchor: "middle",
      },
    ],
  },
];

function CalloutSVG({
  desktop = false,
  visibleCount,
}: {
  desktop?: boolean;
  visibleCount: number;
}) {
  const callouts = desktop ? desktopCallouts : mobileCallouts;

  return (
    <svg
      className={desktop ? "calloutSvgDesktop" : "calloutSvg"}
      viewBox={desktop ? "0 0 1536 864" : "0 0 1066 1476"}
      preserveAspectRatio={desktop ? "none" : "xMidYMid meet"}
      role="img"
      aria-label="Pizza oven component labels and pointer lines"
    >
      {callouts.map((item, index) => (
        <g
          key={item.id}
          className={`callout ${index < visibleCount ? "on" : ""}`}
        >
          <path className="leader" d={item.path} />

          <circle
            className="dot"
            cx={item.dot[0]}
            cy={item.dot[1]}
            r={desktop ? 5 : 6}
          />

          {item.texts.map((text, i) => (
            <text
              key={i}
              x={text.x}
              y={text.y}
              textAnchor={text.anchor || "start"}
              className={text.type === "sub" ? "sub" : "label"}
            >
              {text.value}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}

const specifications = [
  {
    number: "01",
    title: "Mosaic Tile Dome",
    description: "Premium mosaic tile exterior finish for the oven dome.",
  },
  {
    number: "02",
    title: "Concrete Structure",
    description: "High-strength concrete supporting the dome assembly.",
  },
  {
    number: "03",
    title: "Fire Brick Dome",
    description: "Custom fire-brick construction for the cooking chamber.",
  },
  {
    number: "04",
    title: "Multi-Layer Insulation",
    description: "Heat-resistant insulation layers designed to retain heat.",
  },
  {
    number: "05",
    title: "Stainless Steel Door",
    description: "Front door with stainless-steel construction and handle.",
  },
  {
    number: "06",
    title: "Double Burner System",
    description: "Imported high-pressure Venturi and long-flame burner system.",
  },
  {
    number: "07",
    title: "Cooking Floor",
    description: "Custom high-quality fire-brick cooking floor.",
  },
  {
    number: "08",
    title: "Fire Ignition",
    description: "Push-button ignition with pilot and main fire.",
  },
];

type ImageStyle = React.CSSProperties & {
  "--scale": number;
  "--lift"?: string;
};

export default function EngineeringExperience() {
  const storyRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);

  // SCROLL TRACKING
  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const clamp = (value: number, min = 0, max = 1) =>
      Math.max(min, Math.min(max, value));

    const update = () => {
      const rect = story.getBoundingClientRect();

      const scrollDistance =
        story.offsetHeight - window.innerHeight;

      const p =
        scrollDistance > 0
          ? clamp(-rect.top / scrollDistance)
          : 0;

      setProgress(p);
      frameRef.current = null;
    };

    const handleScroll = () => {
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // TIMELINE
  const p = progress;

  // Complete oven -> exploded oven
  const explosion = Math.max(
    0,
    Math.min(1, (p - 0.075) / 0.20)
  );

  // Sequential component reveal
  // All labels are visible before the sticky section ends.
  const reveal = Math.max(
    0,
    Math.min(1, (p - 0.30) / 0.62)
  );

  const visibleMobile = Math.floor(
    reveal * mobileCallouts.length + 0.0001
  );

  const visibleDesktop = Math.floor(
    reveal * desktopCallouts.length + 0.0001
  );

  // Dynamic heading
  let stepIndex: number;

  if (p < 0.12) {
    stepIndex = 0;
  } else if (p < 0.30) {
    stepIndex = 1;
  } else {
    stepIndex = Math.min(
      13,
      2 + Math.floor(reveal * 12)
    );
  }

  const currentStep = steps[stepIndex];

  return (
    <div className="oven-engineering">

      {/* INTRO SECTION */}

      {/* <section className="engineeringIntro">
        <div className="engineeringKicker">
          THE ENGINEERING EXPERIENCE
        </div>

        <h2>One oven. Every layer revealed.</h2>

        <p>
          Scroll down to move from the complete oven to its exploded
          construction, then explore each component with its own label
          and pointer line. Scroll upward to reverse the sequence.
        </p>
      </section> */}

      {/* STICKY SCROLL STORY */}

      <section
        className="engineeringScrollStory"
        id="engineering"
        ref={storyRef}
      >
        <div className="engineeringSticky">

          {/* DYNAMIC TITLE */}

          <div className="engineeringStoryTop">
            <div className="engineeringStepNumber">
              {currentStep.num}
            </div>

            <h2>{currentStep.title}</h2>

            <p>{currentStep.desc}</p>
          </div>

          {/* OVEN VISUAL */}

          <div className="engineeringPortrait">

            {/* COMPLETE OVEN */}

            <img
              className="ovenLayer ovenFront"
              src={ovenfront}
              alt="Complete wood fired pizza oven"
              style={{
                opacity: 1 - explosion,
                "--scale": 1 - explosion * 0.035,
                "--lift": `${-explosion * 8}px`,
              } as ImageStyle}
            />

            {/* EXPLODED OVEN */}

            <img
              className="ovenLayer ovenExploded"
              src={ovenexplode}
              alt="Exploded pizza oven construction"
              style={{
                opacity: explosion,
                "--scale": 0.94 + explosion * 0.06,
              } as ImageStyle}
            />

            {/* MOBILE CALLOUTS */}

            <CalloutSVG visibleCount={visibleMobile} />

            {/* DESKTOP CALLOUTS */}

            <CalloutSVG
              desktop
              visibleCount={visibleDesktop}
            />

          </div>

          {/* SCROLL PROGRESS */}

          <div className="engineeringProgress">
            <i
              style={{
                width: `${p * 100}%`,
              }}
            />
          </div>

          {/* COUNTER */}

          <div className="engineeringCounter">
            {String(Math.min(14, stepIndex + 1)).padStart(2, "0")} — 14
          </div>

        </div>
      </section>

      {/* SPECS SECTION */}

      {/* <section className="engineeringSpecs">

        <div className="engineeringSpecsHead">
          <div className="engineeringKicker">
            ENGINEERING SPECIFICATIONS
          </div>

          <h2>
            Built with purpose.
            <br />
            Engineered for performance.
          </h2>

          <p>
            Every component plays a role in the construction and
            functionality of the oven.
          </p>
        </div>

        <div className="engineeringSpecGrid">
          {specifications.map((spec) => (
            <article
              className="engineeringSpec"
              key={spec.number}
            >
              <small>{spec.number} / COMPONENT</small>

              <h3>{spec.title}</h3>

              <p>{spec.description}</p>
            </article>
          ))}
        </div>

      </section> */}

    </div>
  );
}
