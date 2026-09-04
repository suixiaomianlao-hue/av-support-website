import { useState, useMemo, useRef, useEffect } from "react";

interface Step {
  instruction: string;
  note?: string;
}

interface Device {
  id: string;
  name: string;
  icon: string;
  steps: Step[];
}

interface Space {
  id: string;
  name: string;
  category: string;
  description: string;
  photo: string;
  devices: Device[];
}

const spaces: Space[] = [
  {
    id: "classroom-a101",
    name: "Classroom A101",
    category: "Classroom",
    description: "Standard lecture room with projection and audio setup for up to 40 students.",
    photo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=480&fit=crop&auto=format",
    devices: [
      {
        id: "projector",
        name: "Projector",
        icon: "📽",
        steps: [
          { instruction: "Locate the silver remote on the instructor desk and point it at the projector mounted on the ceiling." },
          { instruction: "Press the red POWER button once. The projector will beep and the warm-up indicator will flash for 30 seconds." },
          { instruction: "On the classroom PC, open your presentation or source. The image will appear automatically." },
          { instruction: "Use INPUT on the remote to switch between PC, HDMI laptop, or document camera if needed." },
          { instruction: "To shut down, press POWER twice on the remote. Wait for the fan to stop (approx. 2 minutes) before leaving the room.", note: "Never cut power from the wall while the projector is cooling." },
        ],
      },
      {
        id: "wireless-mic",
        name: "Wireless Microphone",
        icon: "🎙",
        steps: [
          { instruction: "Open the black charging dock on the side shelf. Lift the handheld mic — the battery indicator should show green." },
          { instruction: "Slide the ON/MUTE switch on the mic body upward to ON." },
          { instruction: "Speak at a normal distance (20–30 cm). The receiver unit on the AV rack will show signal bars." },
          { instruction: "Adjust room volume using the dial labeled MIC LEVEL on the wall panel near the board." },
          { instruction: "After use, slide the switch to OFF and return the mic to the dock to charge." },
        ],
      },
      {
        id: "document-camera",
        name: "Document Camera",
        icon: "📄",
        steps: [
          { instruction: "Press the power button on the base of the document camera arm. The LED ring around the lens will illuminate." },
          { instruction: "On the projector remote, press INPUT and select DOC CAM." },
          { instruction: "Place your document flat on the white mat beneath the camera head." },
          { instruction: "Use the + / – buttons on the camera body to zoom in or out." },
          { instruction: "Press FREEZE to hold a still frame while you rearrange materials." },
          { instruction: "Power off by pressing the same button on the base.", note: "Fold the arm down flat when done to avoid damage." },
        ],
      },
    ],
  },
  {
    id: "classroom-b205",
    name: "Classroom B205",
    category: "Classroom",
    description: "Technology-enhanced room with an interactive whiteboard and integrated sound system.",
    photo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=480&fit=crop&auto=format",
    devices: [
      {
        id: "interactive-whiteboard",
        name: "Interactive Whiteboard",
        icon: "🖥",
        steps: [
          { instruction: "Press the power button on the bottom-right edge of the board frame. The panel will glow white within 10 seconds." },
          { instruction: "On the connected PC, the SMART Notebook software launches automatically. The board is now touch-enabled." },
          { instruction: "Use your finger as a pointer, or pick up a colored stylus from the tray for writing." },
          { instruction: "To erase, use the eraser end of any stylus or wipe with your closed fist." },
          { instruction: "Save your session via File → Save in SMART Notebook before closing, or use the QR-share button to send notes to students." },
          { instruction: "Power off from the board's home menu: tap the gear icon → Shut Down." },
        ],
      },
      {
        id: "sound-system",
        name: "Room Sound System",
        icon: "🔊",
        steps: [
          { instruction: "Locate the AMX touch panel on the instructor desk. Tap anywhere to wake it." },
          { instruction: "Tap AUDIO to open the sound control page." },
          { instruction: "Toggle the main speaker switch to ON. Use the slider to set volume (recommended: 60–70% for lectures)." },
          { instruction: "Select your audio source: PC, MIC, or BLUETOOTH from the source buttons." },
          { instruction: "To connect via Bluetooth: tap BT PAIR, then pair from your device searching for 'B205-Speaker'." },
          { instruction: "When finished, tap SYSTEM OFF on the AMX panel to power everything down in the correct sequence." },
        ],
      },
    ],
  },
  {
    id: "meeting-room-301",
    name: "Meeting Room 301",
    category: "Meeting Room",
    description: "Executive conference room with full video conferencing, display, and wireless sharing for 12 people.",
    photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=480&fit=crop&auto=format",
    devices: [
      {
        id: "video-conferencing",
        name: "Video Conferencing System",
        icon: "📹",
        steps: [
          { instruction: "Tap the Poly Studio touchscreen controller on the table to wake it." },
          { instruction: "Select Microsoft Teams or Zoom from the home screen depending on your meeting platform." },
          { instruction: "Join your meeting by entering the meeting ID, or tap JOIN if a calendar invite is pre-loaded." },
          { instruction: "The room camera and ceiling mic array activate automatically when a call starts." },
          { instruction: "Use the controller to mute/unmute, adjust camera angle, or share content from a laptop via HDMI." },
          { instruction: "End the call by tapping END CALL on the controller. The system returns to idle after 60 seconds.", note: "For Microsoft Teams Rooms meetings, participants join from their own devices; no additional setup needed." },
        ],
      },
      {
        id: "tv-display",
        name: "85\" TV Display",
        icon: "📺",
        steps: [
          { instruction: "Press the power button on the Samsung remote (stored in the drawer at the head of the table)." },
          { instruction: "Press SOURCE and select HDMI 1 for the room PC, or HDMI 2 for a laptop." },
          { instruction: "To mirror a laptop, connect the HDMI cable from the center of the table. Display appears within 5 seconds." },
          { instruction: "Adjust brightness with the remote. For presentations, the DYNAMIC mode works best in daylight." },
          { instruction: "Power off with the remote when done. Return the remote to the drawer." },
        ],
      },
      {
        id: "clickshare",
        name: "Wireless Presentation (ClickShare)",
        icon: "📡",
        steps: [
          { instruction: "Pick up a ClickShare button from the holder on the table. The button has a USB-A and USB-C connector." },
          { instruction: "Plug the button into your laptop. The first time, it installs a small app automatically (takes ~30 seconds)." },
          { instruction: "Click the button once. Your screen is instantly shared to the room display." },
          { instruction: "Up to 4 people can share simultaneously — each person uses their own button." },
          { instruction: "Click the button again or unplug it to stop sharing. Return buttons to the holder.", note: "No app installation needed if the ClickShare desktop app was installed previously." },
        ],
      },
    ],
  },
  {
    id: "meeting-room-402",
    name: "Meeting Room 402",
    category: "Meeting Room",
    description: "Compact huddle room with a smart TV and wireless mic for small team meetings up to 6.",
    photo: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&h=480&fit=crop&auto=format",
    devices: [
      {
        id: "smart-tv",
        name: "Smart TV",
        icon: "📺",
        steps: [
          { instruction: "Press the power button on the LG remote. The TV turns on within 3 seconds." },
          { instruction: "For casting from Android or Windows, press the INPUT button and select Screen Share or Miracast." },
          { instruction: "For Apple devices, select AirPlay from the input list and look for 'Room402-TV' on your iPhone or Mac." },
          { instruction: "For wired connection, use the HDMI cable on the side shelf and select HDMI 1." },
          { instruction: "Press the home button on the remote to access streaming apps if needed." },
          { instruction: "Power off with the remote when finished." },
        ],
      },
      {
        id: "wireless-mic-402",
        name: "Wireless Microphone",
        icon: "🎙",
        steps: [
          { instruction: "The Shure MXW1 bodypack is on the side table in its charging cradle." },
          { instruction: "Press and hold the power button on the bodypack for 2 seconds until the LED turns green." },
          { instruction: "Clip the lapel mic cable to your collar, routing the cable inside your jacket." },
          { instruction: "Speak normally — the system auto-levels volume. No manual adjustment required." },
          { instruction: "After use, hold the power button for 2 seconds to switch off, then return to the cradle." },
        ],
      },
    ],
  },
  {
    id: "main-hall",
    name: "Main Hall",
    category: "Hall",
    description: "Large-format event venue with professional stage lighting, PA system, and live streaming for 300+ audiences.",
    photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=480&fit=crop&auto=format",
    devices: [
      {
        id: "lighting-console",
        name: "Stage Lighting Console",
        icon: "💡",
        steps: [
          { instruction: "Press the main power switch on the ETC Element console at the lighting booth." },
          { instruction: "Load the venue's default show file: press LOAD SHOW → select 'MainHall_Default' → ENTER." },
          { instruction: "Use the Grand Master fader (far right) to bring up overall intensity. Start at 50% and adjust." },
          { instruction: "Trigger preset scenes by pressing the numbered Submaster buttons (1 = house lights, 2 = stage wash, 3 = full stage)." },
          { instruction: "For custom cues, consult the lighting operator manual in the booth binder.", note: "Do not change patch or fixture assignments. Contact the AV team for custom programming." },
        ],
      },
      {
        id: "pa-system",
        name: "PA System",
        icon: "🔊",
        steps: [
          { instruction: "Power on in order: stagebox first, then the Yamaha mixing console at FOH, then amplifier racks (left then right)." },
          { instruction: "Set the master fader on the mixing desk to -10 dB as a starting point." },
          { instruction: "Assign microphone channels: check that each channel strip shows signal when the mic is active." },
          { instruction: "Perform a brief sound check before the event — speak into each mic and confirm the speakers respond." },
          { instruction: "For feedback, quickly pull down the suspect channel's gain (not the fader) and notify the operator." },
          { instruction: "Power off in reverse order: amps off first, then console, then stagebox.", note: "Always power amplifiers off before the console to prevent speaker-damaging pops." },
        ],
      },
      {
        id: "livestream-encoder",
        name: "Live Stream Encoder",
        icon: "🎥",
        steps: [
          { instruction: "Power on the Blackmagic Web Presenter at the tech desk. Its front panel LEDs will turn white." },
          { instruction: "Connect the HDMI input from the stage camera or slide output to INPUT 1." },
          { instruction: "Connect an Ethernet cable from the encoder to the building network port labeled STREAM." },
          { instruction: "Open the Web Presenter dashboard on the control laptop: enter 192.168.10.50 in a browser." },
          { instruction: "Enter the platform stream key (YouTube/Teams/Zoom) in the RTMP URL field and click START STREAMING." },
          { instruction: "Monitor the bitrate indicator — green means healthy. Click STOP STREAMING when the event ends.", note: "Stream keys are stored in the venue password manager. Ask the AV coordinator for access." },
        ],
      },
    ],
  },
  {
    id: "seminar-hall",
    name: "Seminar Hall",
    category: "Hall",
    description: "Dual-projection seminar space with podium mic and integrated recording for 80 attendees.",
    photo: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=480&fit=crop&auto=format",
    devices: [
      {
        id: "dual-projectors",
        name: "Dual Projectors",
        icon: "📽",
        steps: [
          { instruction: "Press the ALL ON button on the AMX wall panel. Both projectors power up simultaneously." },
          { instruction: "Left screen defaults to the podium PC; right screen defaults to a duplicate or extended display." },
          { instruction: "To show different content on each screen, right-click the desktop → Display Settings → Extend." },
          { instruction: "Connect a laptop via HDMI to the podium input. Use INPUT SELECT on the AMX panel to route it." },
          { instruction: "Press ALL OFF on the AMX panel when finished. Both projectors cool down together." },
        ],
      },
      {
        id: "podium-mic",
        name: "Podium Microphone",
        icon: "🎙",
        steps: [
          { instruction: "The gooseneck mic on the podium is always powered — no switch required." },
          { instruction: "Adjust the mic head to point toward the speaker's mouth (20–30 cm distance is ideal)." },
          { instruction: "Volume is controlled from the room's AMX panel under AUDIO → PODIUM MIC." },
          { instruction: "For Q&A, handheld mics in the audience seating are activated via the AUDIENCE MIC button on AMX." },
          { instruction: "If feedback occurs, reduce the PODIUM MIC level by 3 dB increments until clear." },
        ],
      },
      {
        id: "recording-system",
        name: "Session Recording System",
        icon: "⏺",
        steps: [
          { instruction: "On the podium touchscreen, tap RECORDING to open the capture interface." },
          { instruction: "Enter the session name and presenter name — this labels the recording file automatically." },
          { instruction: "Tap START RECORDING. A red indicator appears on all displays to confirm recording is active." },
          { instruction: "Recordings capture both projector outputs and podium audio simultaneously." },
          { instruction: "Tap STOP RECORDING when finished. Files are saved to the shared drive at \\\\hallshare\\recordings." },
          { instruction: "Tap PUBLISH to make the recording available in the institution's media portal within 2 hours.", note: "Ensure all participants have consented to recording before starting." },
        ],
      },
    ],
  },
];

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  Classroom: { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-400" },
  "Meeting Room": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
  Hall: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
};

function CategoryBadge({ category }: { category: string }) {
  const c = categoryColors[category] ?? { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {category}
    </span>
  );
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: 2, padding: "0 2px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

interface SearchResult {
  space: Space;
  matchedDevices: Device[];
  matchType: "space" | "device";
}

function useSearch(query: string): SearchResult[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return spaces.map((s) => ({ space: s, matchedDevices: [], matchType: "space" as const }));
    const results: SearchResult[] = [];
    for (const space of spaces) {
      const spaceMatch =
        space.name.toLowerCase().includes(q) ||
        space.category.toLowerCase().includes(q) ||
        space.description.toLowerCase().includes(q);
      const matchedDevices = space.devices.filter((d) => d.name.toLowerCase().includes(q));
      if (spaceMatch || matchedDevices.length > 0) {
        results.push({
          space,
          matchedDevices: spaceMatch ? [] : matchedDevices,
          matchType: spaceMatch ? "space" : "device",
        });
      }
    }
    return results;
  }, [query]);
}

function HomeView({ onSelectSpace }: { onSelectSpace: (id: string, deviceId?: string) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useSearch(query);
  const isFiltering = query.trim().length > 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-full">
      {/* Top bar */}
      <header style={{ backgroundColor: "var(--secondary)" }} className="sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: "var(--primary)" }}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" fill="white" />
                <rect x="9" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.5" />
                <rect x="1" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.5" />
                <rect x="9" y="9" width="6" height="6" rx="1" fill="white" />
              </svg>
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">Equipment Guide</span>
          </div>
          <span style={{ color: "var(--muted-foreground)" }} className="text-xs hidden sm:block">
            Digital Equipment Operation Instructions
          </span>
        </div>
      </header>

      {/* Hero + search */}
      <div className="relative pb-10 pt-12 overflow-hidden" style={{ backgroundColor: "var(--secondary)" }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1714846973752-deba7a841e13?w=1600&h=600&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          style={{ mixBlendMode: "luminosity" }}
        />
        {/* Gradient vignette for extra legibility */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,23,42,0.85) 40%, rgba(15,23,42,0.4) 100%)" }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <p style={{ color: "var(--primary)", fontFamily: "'DM Mono', monospace" }} className="text-xs font-medium tracking-widest uppercase mb-4">
            Operations Manual
          </p>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", color: "#f8fafc" }}
            className="text-4xl sm:text-5xl font-normal leading-tight mb-4 whitespace-nowrap"
          >
            Equipment <em>Operation Guides</em>
          </h1>
          <p style={{ color: "#94a3b8" }} className="text-base leading-relaxed mb-8 whitespace-nowrap">
            Select a space below to view step-by-step instructions for operating AV and digital equipment.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg" style={{ zIndex: 1 }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#64748b" }}
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search spaces or devices…"
              className="w-full pl-10 pr-24 py-3 text-sm rounded-xl focus:outline-none transition-all duration-150"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#f8fafc",
                caretColor: "var(--primary)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.border = "1px solid var(--primary)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
              }}
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-colors"
                style={{ color: "#94a3b8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                Clear
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            ) : (
              <kbd
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md hidden sm:block"
                style={{ color: "#64748b", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'DM Mono', monospace" }}
              >
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {isFiltering && (
          <p style={{ color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace" }} className="text-xs mb-6">
            {results.length === 0
              ? "No results"
              : `${results.length} space${results.length !== 1 ? "s" : ""} found for "${query}"`}
          </p>
        )}

        {results.length === 0 && isFiltering ? (
          <div className="text-center py-20">
            <p style={{ fontFamily: "'Instrument Serif', serif", color: "var(--foreground)" }} className="text-2xl mb-2">Nothing found</p>
            <p style={{ color: "var(--muted-foreground)" }} className="text-sm">
              Try searching for a space name, category, or device — e.g. "projector", "hall", "Teams"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(({ space, matchedDevices }) => (
              <button
                key={space.id}
                onClick={() => onSelectSpace(space.id, matchedDevices[0]?.id)}
                className="text-left group rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 focus:outline-none"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px var(--ring)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)")}
              >
                {/* Photo */}
                <div className="relative overflow-hidden bg-slate-200" style={{ height: 180 }}>
                  <img
                    src={space.photo}
                    alt={space.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <CategoryBadge category={space.category} />
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h2
                    style={{ fontFamily: "'Instrument Serif', serif", color: "var(--foreground)" }}
                    className="text-xl font-normal mb-1.5"
                  >
                    {highlight(space.name, query)}
                  </h2>
                  <p style={{ color: "var(--muted-foreground)" }} className="text-sm leading-relaxed mb-4">
                    {highlight(space.description, query)}
                  </p>

                  {/* Matched devices highlight strip */}
                  {matchedDevices.length > 0 && (
                    <div
                      className="mb-4 px-3 py-2 rounded-lg flex flex-wrap gap-2"
                      style={{ backgroundColor: "var(--muted)" }}
                    >
                      {matchedDevices.map((d) => (
                        <span
                          key={d.id}
                          className="flex items-center gap-1.5 text-xs font-medium"
                          style={{ color: "var(--primary)" }}
                        >
                          <span>{d.icon}</span>
                          {highlight(d.name, query)}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span style={{ color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace" }} className="text-xs">
                      {space.devices.length} device{space.devices.length !== 1 ? "s" : ""}
                    </span>
                    <span
                      style={{ color: "var(--primary)" }}
                      className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      {matchedDevices.length > 0 ? "Open device" : "View guide"}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)" }} className="mt-4">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <p style={{ color: "var(--muted-foreground)" }} className="text-xs">
            For technical support, contact the AV team at{" "}
            <span style={{ color: "var(--primary)" }}>avteam@institution.edu</span>
          </p>
          <p style={{ color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace" }} className="text-xs hidden sm:block">
            v2.4 · Updated Sept 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

function DeviceAccordion({ device, defaultOpen = false }: { device: Device; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultOpen && ref.current) {
      setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [defaultOpen]);

  return (
    <div
      ref={ref}
      style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
      className="overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150"
        style={{ backgroundColor: open ? "var(--muted)" : "var(--card)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" aria-hidden="true">{device.icon}</span>
          <span
            style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}
            className="font-medium text-sm sm:text-base"
          >
            {device.name}
          </span>
          <span
            style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
            className="text-xs hidden sm:block"
          >
            {device.steps.length} steps
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            color: "var(--muted-foreground)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--card)" }} className="px-5 py-5">
          <ol className="space-y-4">
            {device.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    fontFamily: "'DM Mono', monospace",
                    flexShrink: 0,
                  }}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mt-0.5"
                >
                  {i + 1}
                </span>
                <div>
                  <p style={{ color: "var(--foreground)" }} className="text-sm leading-relaxed">
                    {step.instruction}
                  </p>
                  {step.note && (
                    <p
                      style={{
                        color: "var(--muted-foreground)",
                        backgroundColor: "var(--muted)",
                        borderLeft: "3px solid var(--primary)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      className="text-xs mt-2 px-3 py-2 rounded-r-md leading-relaxed"
                    >
                      <strong>Note:</strong> {step.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function SpaceView({ space, onBack, openDeviceId }: { space: Space; onBack: () => void; openDeviceId?: string }) {
  return (
    <div className="min-h-full">
      {/* Top bar */}
      <header style={{ backgroundColor: "var(--secondary)" }} className="sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm transition-colors duration-150"
            style={{ color: "#94a3b8" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Spaces
          </button>
          <span style={{ color: "#475569" }}>/</span>
          <span className="text-sm font-medium" style={{ color: "#f8fafc" }}>{space.name}</span>
        </div>
      </header>

      {/* Space hero */}
      <div className="relative overflow-hidden bg-slate-800" style={{ height: 260 }}>
        <img
          src={space.photo}
          alt={space.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8">
          <div className="mb-3">
            <CategoryBadge category={space.category} />
          </div>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif", color: "#f8fafc" }}
            className="text-3xl sm:text-4xl font-normal"
          >
            {space.name}
          </h1>
          <p className="text-sm mt-2 max-w-md" style={{ color: "#94a3b8" }}>
            {space.description}
          </p>
        </div>
      </div>

      {/* Device list */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace" }} className="text-xs uppercase tracking-widest">
            {space.devices.length} Device{space.devices.length !== 1 ? "s" : ""} — Click to expand instructions
          </h2>
        </div>

        <div className="space-y-3">
          {space.devices.map((device) => (
            <DeviceAccordion key={device.id} device={device} defaultOpen={device.id === openDeviceId} />
          ))}
        </div>

        <div
          style={{ backgroundColor: "var(--muted)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
          className="mt-10 px-5 py-4 flex items-start gap-3"
        >
          <span className="text-lg mt-0.5">⚠️</span>
          <div>
            <p style={{ color: "var(--foreground)" }} className="text-sm font-medium mb-0.5">Need help?</p>
            <p style={{ color: "var(--muted-foreground)" }} className="text-sm">
              If equipment is unresponsive or instructions do not resolve the issue, contact AV support at{" "}
              <span style={{ color: "var(--primary)" }}>avteam@institution.edu</span> or call ext. <span style={{ fontFamily: "'DM Mono', monospace" }}>3400</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentSpaceId, setCurrentSpaceId] = useState<string | null>(null);
  const [openDeviceId, setOpenDeviceId] = useState<string | undefined>(undefined);

  const currentSpace = spaces.find((s) => s.id === currentSpaceId) ?? null;

  function handleSelectSpace(id: string, deviceId?: string) {
    setCurrentSpaceId(id);
    setOpenDeviceId(deviceId);
  }

  function handleBack() {
    setCurrentSpaceId(null);
    setOpenDeviceId(undefined);
  }

  return (
    <div className="size-full overflow-y-auto" style={{ backgroundColor: "var(--background)" }}>
      {currentSpace ? (
        <SpaceView space={currentSpace} onBack={handleBack} openDeviceId={openDeviceId} />
      ) : (
        <HomeView onSelectSpace={handleSelectSpace} />
      )}
    </div>
  );
}
