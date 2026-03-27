import React, { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";

const AdminPage = () => {
  const { content, updateSection, resetContent } = useContent();
  const [ready, setReady] = useState(false);
  const [headlines, setHeadlines] = useState([]);
  const [subtexts, setSubtexts] = useState([]);
  const [marquee, setMarquee] = useState("");
  const [intro, setIntro] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [services, setServices] = useState([]);
  const [careers, setCareers] = useState([]);
  const [team, setTeam] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [primaryColor, setPrimaryColor] = useState('#004d43');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [altBackgroundColor, setAltBackgroundColor] = useState('#f8fafc');
  const [primaryColorDark, setPrimaryColorDark] = useState('#00b894');
  const [backgroundColorDark, setBackgroundColorDark] = useState('#18181b');
  const [altBackgroundColorDark, setAltBackgroundColorDark] = useState('#23272f');

  // Collapsible state for each section
  const [openSections, setOpenSections] = useState({
    landing: true,
    services: false,
    featured: false,
    careers: false,
    team: false,
    about: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (!content) return;
    setHeadlines((content.landing && content.landing.headlines) ? content.landing.headlines.slice() : []);
    setSubtexts((content.landing && content.landing.subtexts) ? content.landing.subtexts.slice() : []);
    setMarquee((content.landing && content.landing.marquee) ? content.landing.marquee : "");
    setIntro((content.about && content.about.intro) ? content.about.intro : "");
    setParagraphs((content.about && content.about.paragraphs) ? content.about.paragraphs.slice() : []);
    setServices((content.services || []).map(s => ({ ...s })));
    setCareers((content.careers || []).map(r => ({ ...r })));
    setFeatured((content.featured || []).map(f => ({ ...f })));
    setTeam((content.team || []).map(t => ({ ...t })));
    setPrimaryColor(content.primaryColor || '#004d43');
    setBackgroundColor(content.backgroundColor || '#ffffff');
    setAltBackgroundColor(content.altBackgroundColor || '#f8fafc');
    setPrimaryColorDark(content.primaryColorDark || '#00b894');
    setBackgroundColorDark(content.backgroundColorDark || '#18181b');
    setAltBackgroundColorDark(content.altBackgroundColorDark || '#23272f');
    setReady(true);
  }, [content]);

  const saveLanding = () => {
    updateSection("landing", { headlines, subtexts, marquee });
    alert("Landing saved");
  };

  const saveThemeColor = () => {
    updateSection("primaryColor", primaryColor);
    updateSection("backgroundColor", backgroundColor);
    updateSection("altBackgroundColor", altBackgroundColor);
    updateSection("primaryColorDark", primaryColorDark);
    updateSection("backgroundColorDark", backgroundColorDark);
    updateSection("altBackgroundColorDark", altBackgroundColorDark);
    alert("Theme colors saved");
  };

  const saveServices = () => {
    updateSection("services", services);
    alert("Services saved");
  };

  const saveFeatured = () => {
    updateSection("featured", featured);
    alert("Featured projects saved");
  };

  const saveCareers = () => {
    updateSection("careers", careers);
    alert("Careers saved");
  };

  const saveTeam = () => {
    updateSection('team', team);
    alert('Team saved');
  };

  const setTeamField = (i, key, val) => {
    const copy = team.slice();
    copy[i] = { ...copy[i], [key]: val };
    setTeam(copy);
  };

  const setServiceField = (i, key, val) => {
    const copy = services.slice();
    copy[i] = { ...copy[i], [key]: val };
    setServices(copy);
  };

  const handleResetDefaults = () => {
    // reset context on server; clear local editors
    resetContent();
    setHeadlines([]);
    setIntro("");
    setParagraphs([]);
    setServices([]);
    setCareers([]);
    alert('Reset complete (server cleared)');
  };

  const setCareerField = (i, key, val) => {
    const copy = careers.slice();
    copy[i] = { ...copy[i], [key]: val };
    setCareers(copy);
  };

  const saveAbout = () => {
    updateSection("about", { intro, paragraphs });
    alert("About saved");
  };

  const setParagraph = (i, val) => {
    const copy = paragraphs.slice();
    copy[i] = val;
    setParagraphs(copy);
  };

  if (!content) {
    return (
      <div className="min-h-screen p-8 md:p-16 bg-white text-zinc-900">
        <h2 className="text-2xl mb-6">Admin — Site Content</h2>
        <p className="text-sm text-zinc-600 mb-4">API content unavailable. Start the server to load/edit content.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-zinc-900 text-white rounded">Retry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-16 bg-white text-zinc-900">
      <h2 className="text-2xl mb-6">Admin — Site Content</h2>

      <section className="mb-8 border rounded">
        <button type="button" className="w-full flex justify-between items-center px-4 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-t font-semibold text-left" onClick={() => toggleSection('theme')}>
          <span>Theme Colors</span>
          <span>{openSections.theme ? '▲' : '▼'}</span>
        </button>
        {openSections.theme && (
          <div className="p-4 flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-2">Primary Color (hex)</label>
              <input
                type="color"
                value={primaryColor}
                onChange={e => setPrimaryColor(e.target.value)}
                className="w-16 h-10 p-0 border rounded cursor-pointer"
                style={{ background: 'none' }}
              />
              <input
                type="text"
                value={primaryColor}
                onChange={e => setPrimaryColor(e.target.value)}
                className="ml-4 p-2 border rounded w-32"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Background Color (hex)</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={e => setBackgroundColor(e.target.value)}
                className="w-16 h-10 p-0 border rounded cursor-pointer"
                style={{ background: 'none' }}
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={e => setBackgroundColor(e.target.value)}
                className="ml-4 p-2 border rounded w-32"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Alt Background Color (hex)</label>
              <input
                type="color"
                value={altBackgroundColor}
                onChange={e => setAltBackgroundColor(e.target.value)}
                className="w-16 h-10 p-0 border rounded cursor-pointer"
                style={{ background: 'none' }}
              />
              <input
                type="text"
                value={altBackgroundColor}
                onChange={e => setAltBackgroundColor(e.target.value)}
                className="ml-4 p-2 border rounded w-32"
              />
            </div>
            <div className="mt-6 border-t pt-4">
              <h4 className="font-semibold mb-2">Dark Mode Colors</h4>
              <div>
                <label className="block text-sm mb-2">Primary Color (Dark)</label>
                <input
                  type="color"
                  value={primaryColorDark}
                  onChange={e => setPrimaryColorDark(e.target.value)}
                  className="w-16 h-10 p-0 border rounded cursor-pointer"
                  style={{ background: 'none' }}
                />
                <input
                  type="text"
                  value={primaryColorDark}
                  onChange={e => setPrimaryColorDark(e.target.value)}
                  className="ml-4 p-2 border rounded w-32"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Background Color (Dark)</label>
                <input
                  type="color"
                  value={backgroundColorDark}
                  onChange={e => setBackgroundColorDark(e.target.value)}
                  className="w-16 h-10 p-0 border rounded cursor-pointer"
                  style={{ background: 'none' }}
                />
                <input
                  type="text"
                  value={backgroundColorDark}
                  onChange={e => setBackgroundColorDark(e.target.value)}
                  className="ml-4 p-2 border rounded w-32"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Alt Background Color (Dark)</label>
                <input
                  type="color"
                  value={altBackgroundColorDark}
                  onChange={e => setAltBackgroundColorDark(e.target.value)}
                  className="w-16 h-10 p-0 border rounded cursor-pointer"
                  style={{ background: 'none' }}
                />
                <input
                  type="text"
                  value={altBackgroundColorDark}
                  onChange={e => setAltBackgroundColorDark(e.target.value)}
                  className="ml-4 p-2 border rounded w-32"
                />
              </div>
            </div>
            <button onClick={saveThemeColor} className="px-4 py-2 bg-[#004d43] text-white rounded mt-4">Save Theme Colors</button>
          </div>
        )}
      </section>

      <section className="mb-8 border rounded">
        <button type="button" className="w-full flex justify-between items-center px-4 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-t font-semibold text-left" onClick={() => toggleSection('landing')}>
          <span>Landing Headlines</span>
          <span>{openSections.landing ? '▲' : '▼'}</span>
        </button>
        {openSections.landing && (
          <div className="p-4">
            {headlines.map((h, i) => (
              <input
                key={i}
                className="w-full mb-2 p-2 border rounded"
                value={h}
                onChange={(e) => {
                  const copy = headlines.slice();
                  copy[i] = e.target.value;
                  setHeadlines(copy);
                }}
              />
            ))}
            <h4 className="font-medium mt-3 mb-2">Landing Subtexts (footer)</h4>
            {subtexts.map((s, i) => (
              <input
                key={`sub-${i}`}
                className="w-full mb-2 p-2 border rounded"
                value={s}
                onChange={(e) => {
                  const copy = subtexts.slice();
                  copy[i] = e.target.value;
                  setSubtexts(copy);
                }}
              />
            ))}
            <div className="mb-3">
              <label className="block text-sm mb-1">Marquee text (mobile)</label>
              <input className="w-full p-2 border rounded" placeholder="We are Velosync" value={marquee} onChange={(e) => setMarquee(e.target.value)} />
            </div>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setSubtexts([...subtexts, ""]) } className="px-4 py-2 bg-zinc-900 text-white rounded">Add Subtext</button>
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => setHeadlines([...headlines, ""]) } className="px-4 py-2 bg-zinc-900 text-white rounded">Add</button>
              <button onClick={saveLanding} className="px-4 py-2 bg-[#004d43] text-white rounded">Save Landing</button>
            </div>
          </div>
        )}
      </section>

      <section className="mb-8 border rounded">
        <button type="button" className="w-full flex justify-between items-center px-4 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-t font-semibold text-left" onClick={() => toggleSection('services')}>
          <span>Services (cards)</span>
          <span>{openSections.services ? '▲' : '▼'}</span>
        </button>
        {openSections.services && (
          <div className="p-4">
            {services.map((s, i) => (
              <div key={i} className="mb-4 border p-3 rounded">
                <input className="w-full mb-2 p-2 border rounded" value={s.number || ''} onChange={(e) => setServiceField(i, 'number', e.target.value)} placeholder="Number" />
                <input className="w-full mb-2 p-2 border rounded" value={s.title || ''} onChange={(e) => setServiceField(i, 'title', e.target.value)} placeholder="Title" />
                <textarea className="w-full mb-2 p-2 border rounded" rows={3} value={s.description || ''} onChange={(e) => setServiceField(i, 'description', e.target.value)} placeholder="Description" />
                <input className="w-full mb-2 p-2 border rounded" value={(s.tags || []).join(', ')} onChange={(e) => setServiceField(i, 'tags', e.target.value.split(',').map(t => t.trim()))} placeholder="tags (comma separated)" />
                <div className="flex gap-2">
                  <button onClick={() => setServices(services.filter((_, idx) => idx !== i))} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setServices([...services, { number: '', title: '', description: '', tags: [] }])} className="px-4 py-2 bg-zinc-900 text-white rounded">Add Service</button>
              <button onClick={saveServices} className="px-4 py-2 bg-[#004d43] text-white rounded">Save Services</button>
            </div>
          </div>
        )}
      </section>

      <section className="mb-8 border rounded">
        <button type="button" className="w-full flex justify-between items-center px-4 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-t font-semibold text-left" onClick={() => toggleSection('featured')}>
          <span>Featured Projects</span>
          <span>{openSections.featured ? '▲' : '▼'}</span>
        </button>
        {openSections.featured && (
          <div className="p-4">
            {featured.map((f, i) => (
              <div key={i} className="mb-4 border p-3 rounded">
                <input className="w-full mb-2 p-2 border rounded" value={f.name || ''} onChange={(e) => {
                  const copy = featured.slice(); copy[i] = { ...copy[i], name: e.target.value }; setFeatured(copy);
                }} placeholder="Project name" />
                <input className="w-full mb-2 p-2 border rounded" value={(f.tags || []).join(', ')} onChange={(e) => {
                  const copy = featured.slice(); copy[i] = { ...copy[i], tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }; setFeatured(copy);
                }} placeholder="tags (comma separated)" />

                <label className="block text-sm mt-2 mb-1">Accent Color</label>
                <input
                  type="color"
                  className="w-16 h-8 mb-2 p-1 border rounded"
                  value={f.accent || '#004d43'}
                  onChange={e => {
                    const copy = featured.slice();
                    copy[i] = { ...copy[i], accent: e.target.value };
                    setFeatured(copy);
                  }}
                  title="Pick accent color"
                />

                <label className="block text-sm mt-2 mb-1">Image URL (optional)</label>
                <input className="w-full mb-2 p-2 border rounded" value={f.image || ''} onChange={(e) => {
                  const val = e.target.value;
                  const copy = featured.slice();
                  // If user pastes raw SVG markup, store it as raw text so preview can render it
                  if (val && val.trim().startsWith('<svg')) {
                    copy[i] = { ...copy[i], image: val };
                  } else {
                    copy[i] = { ...copy[i], image: val };
                  }
                  setFeatured(copy);
                }} placeholder="https://... or data:image/... or paste <svg>...</svg>" />

                <label className="block text-sm mt-2 mb-1">Or upload image/SVG</label>
                <input className="w-full mb-2" type="file" accept="image/*,.svg" onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  // If SVG, read as text so we can store raw SVG markup; otherwise store data URL
                  if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
                    reader.onload = (ev) => {
                      const svgText = String(ev.target.result);
                      const copy = featured.slice();
                      copy[i] = { ...copy[i], image: svgText };
                      setFeatured(copy);
                    };
                    reader.readAsText(file);
                  } else {
                    reader.onload = (ev) => {
                      const copy = featured.slice();
                      copy[i] = { ...copy[i], image: ev.target.result };
                      setFeatured(copy);
                    };
                    reader.readAsDataURL(file);
                  }
                }} />
                {f.image && (
                  <div className="mb-2">
                    <p className="text-sm mb-1">Preview:</p>
                    {typeof f.image === 'string' && f.image.trim().startsWith('<svg') ? (
                      <div className="w-40 h-24 border rounded overflow-hidden" dangerouslySetInnerHTML={{ __html: f.image }} />
                    ) : (
                      <img src={f.image} alt={f.name || `featured-${i}`} className="w-40 h-24 object-cover rounded border" />
                    )}
                    <div className="mt-2">
                      <button onClick={() => {
                        const copy = featured.slice(); copy[i] = { ...copy[i], image: undefined }; setFeatured(copy);
                      }} className="px-3 py-1 bg-red-500 text-white rounded mt-2">Remove image</button>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => setFeatured(featured.filter((_, idx) => idx !== i))} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setFeatured([...featured, { name: '', tags: [] }])} className="px-4 py-2 bg-zinc-900 text-white rounded">Add Project</button>
              <button onClick={saveFeatured} className="px-4 py-2 bg-[#004d43] text-white rounded">Save Featured</button>
            </div>
          </div>
        )}
      </section>

      <section className="mb-8 border rounded">
        <button type="button" className="w-full flex justify-between items-center px-4 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-t font-semibold text-left" onClick={() => toggleSection('careers')}>
          <span>Careers (roles)</span>
          <span>{openSections.careers ? '▲' : '▼'}</span>
        </button>
        {openSections.careers && (
          <div className="p-4">
            {careers.map((r, i) => (
              <div key={i} className="mb-4 border p-3 rounded">
                <input className="w-full mb-2 p-2 border rounded" value={r.department || ''} onChange={(e) => setCareerField(i, 'department', e.target.value)} placeholder="Department" />
                <input className="w-full mb-2 p-2 border rounded" value={r.title || ''} onChange={(e) => setCareerField(i, 'title', e.target.value)} placeholder="Title" />
                <input className="w-full mb-2 p-2 border rounded" value={r.type || ''} onChange={(e) => setCareerField(i, 'type', e.target.value)} placeholder="Type" />
                <input className="w-full mb-2 p-2 border rounded" value={r.location || ''} onChange={(e) => setCareerField(i, 'location', e.target.value)} placeholder="Location" />
                <textarea className="w-full mb-2 p-2 border rounded" rows={3} value={r.description || ''} onChange={(e) => setCareerField(i, 'description', e.target.value)} placeholder="Description" />
                <input className="w-full mb-2 p-2 border rounded" value={(r.tags || []).join(', ')} onChange={(e) => setCareerField(i, 'tags', e.target.value.split(',').map(t => t.trim()))} placeholder="tags (comma separated)" />
                <input className="w-full mb-2 p-2 border rounded" value={r.accent || ''} onChange={(e) => setCareerField(i, 'accent', e.target.value)} placeholder="Accent color (hex)" />
                <div className="flex gap-2">
                  <button onClick={() => setCareers(careers.filter((_, idx) => idx !== i))} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setCareers([...careers, { department: '', title: '', type: '', location: '', description: '', tags: [], accent: '#004d43' }])} className="px-4 py-2 bg-zinc-900 text-white rounded">Add Role</button>
              <button onClick={saveCareers} className="px-4 py-2 bg-[#004d43] text-white rounded">Save Careers</button>
            </div>
          </div>
        )}
      </section>

      <section className="mb-8 border rounded">
        <button type="button" className="w-full flex justify-between items-center px-4 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-t font-semibold text-left" onClick={() => toggleSection('team')}>
          <span>Team / Contributors</span>
          <span>{openSections.team ? '▲' : '▼'}</span>
        </button>
        {openSections.team && (
          <div className="p-4">
            {team.map((m, i) => (
              <div key={i} className="mb-4 border p-3 rounded">
                <input className="w-full mb-2 p-2 border rounded" value={m.name || ''} onChange={(e) => setTeamField(i, 'name', e.target.value)} placeholder="Name" />
                <input className="w-full mb-2 p-2 border rounded" value={m.role || ''} onChange={(e) => setTeamField(i, 'role', e.target.value)} placeholder="Role" />
                <input className="w-full mb-2 p-2 border rounded" value={m.experience || ''} onChange={(e) => setTeamField(i, 'experience', e.target.value)} placeholder="Experience (years or description)" />
                <label className="block text-sm mt-2 mb-1">Photo URL (optional)</label>
                <input className="w-full mb-2 p-2 border rounded" value={m.photo || ''} onChange={(e) => setTeamField(i, 'photo', e.target.value)} placeholder="https://... or data:image/..." />
                <label className="block text-sm mt-2 mb-1">Or upload photo</label>
                <input className="w-full mb-2" type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files && e.target.files[0]; if (!file) return; const reader = new FileReader();
                  reader.onload = (ev) => { const copy = team.slice(); copy[i] = { ...copy[i], photo: ev.target.result }; setTeam(copy); };
                  reader.readAsDataURL(file);
                }} />
                {m.photo && (
                  <div className="mb-2">
                    <p className="text-sm mb-1">Preview:</p>
                    <img src={m.photo} alt={m.name || `member-${i}`} className="w-24 h-24 object-cover rounded-full border" />
                    <div className="mt-2">
                      <button onClick={() => { const copy = team.slice(); copy[i] = { ...copy[i], photo: undefined }; setTeam(copy); }} className="px-3 py-1 bg-red-500 text-white rounded mt-2">Remove photo</button>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => setTeam(team.filter((_, idx) => idx !== i))} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setTeam([...team, { name: '', role: '', photo: '', experience: '' }])} className="px-4 py-2 bg-zinc-900 text-white rounded">Add Contributor</button>
              <button onClick={saveTeam} className="px-4 py-2 bg-[#004d43] text-white rounded">Save Team</button>
            </div>
          </div>
        )}
      </section>

      <section className="mb-8 border rounded">
        <button type="button" className="w-full flex justify-between items-center px-4 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-t font-semibold text-left" onClick={() => toggleSection('about')}>
          <span>About</span>
          <span>{openSections.about ? '▲' : '▼'}</span>
        </button>
        {openSections.about && (
          <div className="p-4">
            <textarea className="w-full p-2 border rounded mb-2" rows={3} value={intro} onChange={(e) => setIntro(e.target.value)} />
            {paragraphs.map((p, i) => (
              <textarea key={i} className="w-full mb-2 p-2 border rounded" rows={3} value={p} onChange={(e) => setParagraph(i, e.target.value)} />
            ))}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setParagraphs([...paragraphs, ""]) } className="px-4 py-2 bg-zinc-900 text-white rounded">Add Paragraph</button>
              <button onClick={saveAbout} className="px-4 py-2 bg-[#004d43] text-white rounded">Save About</button>
            </div>
          </div>
        )}
      </section>

      <p className="text-sm text-zinc-500">Content is saved to the server via the API (defaults used if API unavailable).</p>
      <div className="mt-6">
        <button onClick={handleResetDefaults} className="px-4 py-2 bg-red-500 text-white rounded">Reset to defaults</button>
      </div>
    </div>
  );
};

export default AdminPage;
