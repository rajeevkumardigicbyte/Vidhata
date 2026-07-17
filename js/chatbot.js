/* =============================================================
   VIDHATA PLASTICS — AI NAVIGATION ASSISTANT  v2.0
   js/chatbot.js  |  Self-contained · Zero-dependency
   ─────────────────────────────────────────────────────────────
   Features
     • Page-aware context chips (13 pages × 4 chips each)
     • Persistent conversation via localStorage (24 h TTL)
     • Direct FAQ answers for 8 common factual questions
     • WhatsApp + Phone quick-dial bar
     • Thumbs-up / thumbs-down message feedback
     • Google Analytics 4 event tracking (gtag optional)
     • Same-page anchor smooth-scroll (no reload)
   ============================================================= */

(function () {
  'use strict';

  /* ─── Configuration ──────────────────────────────────────── */
  var CFG = {
    phone      : '+919885100808',
    phoneLabel : '+91 98851 00808',
    whatsapp   : 'https://wa.me/919885100808?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20Vidhata%20Plastics%20services.',
    storageKey : 'vp-bot-v2',
    maxHistory : 40,
    maxAgeMs   : 24 * 60 * 60 * 1000   // 24 hours
  };

  /* ─── Site Knowledge Base ────────────────────────────────── */
  var SITE_MAP = [
    { id:'home',          page:'index.html',               title:'Home',                           icon:'🏠', description:'Vidhata overview — 20+ years, ISO certified, precision plastics.',                         keywords:['home','main','start','overview','welcome','vidhata','plastics','precision','landing','front','introduction'],                                                                                                                                   weight:0.8, category:'general' },
    { id:'about',         page:'about.html',               title:'About Us',                       icon:'🏢', description:'Company story, leadership team, mission & vision — 20+ years of excellence.',               keywords:['about','company','history','story','leadership','team','director','founder','ks rao','vikrant','kandimalla','mission','vision','profile','management','chairman','who','background'],                                                           weight:1.0, category:'about' },
    { id:'services',      page:'services.html',            title:'All Services',                   icon:'⚙️', description:'Complete manufacturing services: design, tooling, production, assembly.',                    keywords:['service','services','offer','capabilities','provide','manufacture','what','do','specialise','specialize','solutions','end to end','full service'],                                                                                               weight:1.0, category:'services' },
    { id:'design',        page:'services.html#design',     title:'Product Design',                 icon:'✏️', description:'3D CAD modeling, Design for Manufacturability (DFM), mold flow analysis.',                  keywords:['design','cad','dfm','3d','product design','modeling','prototype','mold flow','simulation','optimize','solidworks','catia','engineering design','concept'],                                                                                         weight:1.2, category:'services' },
    { id:'tooling',       page:'services.html#tooling',    title:'Tool & Mould Manufacturing',     icon:'🔧', description:'Injection moulds, extrusion tools, polyurethane moulds, press tools & hard tooling.',       keywords:['tool','mould','mold','tooling','injection mould','extrusion tool','press tool','hard tool','prototype tool','jig','fixture','die','moulding tool'],                                                                                              weight:1.2, category:'services' },
    { id:'manufacturing', page:'services.html#manufacturing', title:'Manufacturing',               icon:'🏗️', description:'Injection moulding, blow moulding, polyurethane processing, high-volume production.',       keywords:['manufacturing','injection moulding','blow moulding','polyurethane','pu','extrusion','polycarbonate','high volume','production run','plastic production','moulding','molding','mass production'],                                                  weight:1.2, category:'services' },
    { id:'assembly',      page:'services.html#assembly',   title:'Assembly Services',              icon:'🔩', description:'Component assembly, medical disposable assembly, packaging & logistics support.',            keywords:['assembly','assemble','packaging','pack','logistics','supply chain','warehouse','deliver','kit','component assembly','secondary operation'],                                                                                                      weight:1.2, category:'services' },
    { id:'regulatory',    page:'services.html#regulatory', title:'Regulatory Support',             icon:'📋', description:'ISO 13485 documentation, Device Master Records, Design History Files & CE guidance.',       keywords:['regulatory','regulation','compliance','documentation','dmr','dhf','device master','design history','pathway','fda','eu','ce','qmsr','record','document','submission'],                                                                           weight:1.2, category:'services' },
    { id:'medical',       page:'medical.html',             title:'Medical & Pharma Manufacturing', icon:'🏥', description:'ISO 13485 cleanroom manufacturing: medical devices, IVD, drug delivery, dialysis.',         keywords:['medical','pharma','pharmaceutical','cleanroom','clean room','iso 13485','ivd','in vitro','diagnostics','dialysis','catheter','drug delivery','bioprocess','cell therapy','gene therapy','medical device','healthcare','sterile','hospital','disposable','tubing','nephroplus','blood collection','ophthalmic','medical manufacturing'],  weight:1.3, category:'medical' },
    { id:'industries',    page:'industries.html',          title:'Industries We Serve',            icon:'🌐', description:'Medical, pharma, electronics, LED lighting, industrial & consumer goods.',                  keywords:['industry','industries','sector','market','vertical','segment','electronics','led','lighting','consumer','industrial','energy meter','charger','mobile','pos','battery','shoe','footwear','child resistant','flip off','seal','dropper','closure'],  weight:1.0, category:'industries' },
    { id:'infrastructure',page:'infrastructure.html',      title:'Manufacturing Infrastructure',   icon:'🏭', description:'DMG Mori, Makino, Haas CNC machines, Fanuc wire EDM, Haitian moulding machines.',          keywords:['infrastructure','equipment','machine','machinery','cnc','dmg','mori','makino','haas','fanuc','edm','charmilles','haitian','grinding','metrology','mitutoyo','trimos','facility','plant','capacity','tonnage','120t','250t','tool room','wire edm'],  weight:1.0, category:'infrastructure' },
    { id:'quality',       page:'quality.html',             title:'Quality & Certifications',       icon:'✅', description:'ISO 9001:2015, ISO 13485, CE, QMSR compliance. Metrology lab & stability chambers.',        keywords:['quality','certification','certified','iso','iso 9001','iso 13485','ce','qmsr','testing','inspection','metrology','lab','laboratory','stability','autoclave','oven','standard','audit','accredit','compliance','quality system'],                     weight:1.1, category:'quality' },
    { id:'case-studies',  page:'case-studies.html',        title:'Case Studies',                   icon:'📊', description:'Success stories — Reliance Jio, ECIL EVM moulds, LED lighting, PU soles.',                keywords:['case study','case studies','success','story','stories','project','example','evm','ecil','jio','led','pu sole','achievement','portfolio','reference','testimonial','result','success story'],                                                          weight:1.0, category:'case-studies' },
    { id:'clients',       page:'clients.html',             title:'Our Clients',                    icon:'🤝', description:'Philips, Reliance Jio, Eveready, Orient Electric, NephroPlus, Adidas, Tupperware & more.',  keywords:['client','clients','customer','customers','partner','partners','philips','reliance','jio','eveready','orient','nephroplus','adidas','ecco','bata','exide','hbl','tupperware','rockwell','astra','cathronic','east pharma','keycare','pravesha'],      weight:1.0, category:'clients' },
    { id:'careers',       page:'careers.html',             title:'Careers',                        icon:'💼', description:'Join Vidhata — open positions, engineering roles, work culture & applications.',             keywords:['career','careers','job','jobs','hiring','recruit','recruitment','work','apply','application','position','vacancy','opportunity','join','engineer','technician','fresher','employment','opening'],                                                     weight:1.0, category:'careers' },
    { id:'blog',          page:'blog.html',                title:'Blog & Insights',                icon:'📝', description:'Manufacturing news, industry insights, technology trends from Vidhata.',                    keywords:['blog','insight','insights','news','article','articles','post','read','latest','update','trend','publication','resources','press'],                                                                                                                     weight:0.9, category:'blog' },
    { id:'contact',       page:'contact.html',             title:'Contact Us',                     icon:'📬', description:'Request a quote or consultation — offices in Hyderabad.',                                   keywords:['contact','quote','request','schedule','consultation','call','email','phone','address','location','office','reach','inquiry','enquiry','talk','speak','visit','hyderabad','ecity','maheshwaram','cherlapally','get in touch','vikrant','director','number'],  weight:1.1, category:'contact' }
  ];

  /* ─── Page-Aware Context Chips ───────────────────────────── */
  // Each page gets 4 contextually relevant starting chips.
  var PAGE_CHIPS = {
    'index.html':          [{ label:'🏥 Medical Manufacturing', query:'medical manufacturing cleanroom' }, { label:'⚙️ Our Services',      query:'manufacturing services capabilities' }, { label:'📬 Request a Quote',    query:'request quote contact' }, { label:'✅ Quality & ISO',       query:'quality iso certification' }],
    'about.html':          [{ label:'⚙️ Our Services',          query:'services manufacturing' },          { label:'🤝 Our Clients',        query:'clients customers' },                  { label:'📊 Case Studies',       query:'case studies success' },       { label:'💼 Join Our Team',      query:'careers jobs' }],
    'services.html':       [{ label:'🏥 Medical Manufacturing', query:'medical pharma cleanroom' },        { label:'🔧 Tool & Mould',       query:'tool mould tooling injection' },        { label:'✏️ Product Design',     query:'design cad dfm' },              { label:'📬 Request a Quote',    query:'contact quote' }],
    'medical.html':        [{ label:'✅ ISO 13485 Cert.',        query:'iso 13485 regulatory compliance' }, { label:'🤝 Medical Clients',    query:'nephroplus cathronic medical clients' }, { label:'🔩 Assembly Services',  query:'assembly packaging medical' },   { label:'📬 Get a Quote',        query:'contact quote' }],
    'industries.html':     [{ label:'🏥 Medical Sector',        query:'medical pharma healthcare' },       { label:'💡 Electronics & LED',  query:'electronics led lighting charger' },     { label:'⚙️ Our Services',      query:'services manufacturing' },        { label:'📬 Contact Us',         query:'contact' }],
    'infrastructure.html': [{ label:'⚙️ Our Services',          query:'manufacturing services' },          { label:'✅ Quality Systems',    query:'quality certification iso' },            { label:'🏥 Medical Facility',   query:'medical cleanroom' },             { label:'📬 Contact Us',         query:'contact' }],
    'quality.html':        [{ label:'🏥 ISO 13485 Medical',     query:'medical iso 13485 cleanroom' },     { label:'🏭 Infrastructure',     query:'infrastructure cnc equipment' },         { label:'📋 Regulatory Support', query:'regulatory compliance documentation' }, { label:'📬 Request a Quote', query:'contact quote' }],
    'case-studies.html':   [{ label:'🤝 Our Clients',           query:'clients' },                         { label:'🌐 Industries',         query:'industries sectors' },                   { label:'⚙️ Our Services',      query:'services' },                      { label:'📬 Start a Project',    query:'contact quote' }],
    'clients.html':        [{ label:'📊 Case Studies',          query:'case studies success stories' },    { label:'🌐 Industries',         query:'industries sectors' },                   { label:'⚙️ Our Services',      query:'services manufacturing' },        { label:'📬 Work With Us',       query:'contact quote' }],
    'careers.html':        [{ label:'🏢 About Us',              query:'about company team' },              { label:'⚙️ What We Do',         query:'services manufacturing' },               { label:'✅ Our Culture',        query:'quality' },                       { label:'📬 Contact HR',         query:'contact' }],
    'blog.html':           [{ label:'⚙️ Our Services',          query:'services' },                        { label:'🏥 Medical Focus',      query:'medical' },                              { label:'📊 Case Studies',       query:'case studies' },                  { label:'📬 Contact Us',         query:'contact' }],
    'contact.html':        [{ label:'⚙️ Our Services',          query:'services capabilities' },           { label:'📊 Case Studies',       query:'case studies success stories' },         { label:'🤝 Our Clients',        query:'clients customers' },             { label:'🏥 Medical Mfg.',       query:'medical' }],
    'privacy.html':        [{ label:'🏠 Home',                   query:'home overview' },                   { label:'⚙️ Services',           query:'services' },                             { label:'📬 Contact Us',         query:'contact' }]
  };

  /* ─── FAQ Direct-Answer Database ─────────────────────────── */
  // alwaysTrigger: true — ignores page-score threshold
  var FAQS = [
    {
      type: 'location', alwaysTrigger: true,
      patterns: ['location','address','where','situated','based','headquarter','office','city','telangana','rangareddy','maheshwaram','cherlapally','ecity','directions','map'],
      answer: "📍 Vidhata Plastics is headquartered in Hyderabad with two facilities:\n\n🏢 Corporate Office\nUnit 2 – E-City, Maheshwaram\nRangareddy, Telangana – 501359\n\n🏭 Manufacturing Unit\nPhase-II, IDA Cherlapally, Hyderabad",
      cardIds: ['contact'],
      chips: [{ label:'📬 Contact Page', query:'contact' }]
    },
    {
      type: 'phone', alwaysTrigger: true,
      patterns: ['phone','call','number','mobile','telephone','dial','helpline','contact number'],
      answer: "📞 Reach our Director directly:\n\nVikrant Kandimalla\n+91 98851 00808\n\nYou can also use the WhatsApp or Call buttons below.",
      cardIds: ['contact'],
      chips: [{ label:'📬 Contact Page', query:'contact' }]
    },
    {
      type: 'email', alwaysTrigger: true,
      patterns: ['email','mail','email id','email address','send message','write to'],
      answer: "📧 Reach us by email:\n\n→ vikrant@vidhata.co.in  (Director)\n→ info@vidhata.co.in  (General Enquiries)\n\nWe typically respond within one business day.",
      cardIds: ['contact'],
      chips: [{ label:'📬 Contact Page', query:'contact' }]
    },
    {
      type: 'timing', alwaysTrigger: true,
      patterns: ['timing','working hours','office hours','available','when can','open hours','business hours'],
      answer: "🕒 Office Hours:\n\nMonday – Saturday: 9:00 AM – 6:00 PM IST\n\nFor urgent queries, WhatsApp or email us any time — we respond within one business day.",
      cardIds: ['contact'],
      chips: [{ label:'📬 Contact Us', query:'contact' }]
    },
    {
      type: 'experience',
      patterns: ['experience','years','founded','established','since','history','started','how long','old'],
      answer: "🏭 Vidhata Plastics has 20+ years of precision plastics expertise.\n\nFounded and led by:\n• K.S. Rao — Managing Director, 30+ years in engineering & manufacturing\n• Vikrant Kandimalla — Director, MS Aerospace (Embry-Riddle University, USA)",
      cardIds: ['about','case-studies'],
      chips: [{ label:'🏢 About Us', query:'about company' }, { label:'📊 Case Studies', query:'case studies success' }]
    },
    {
      type: 'certifications',
      patterns: ['certification','certified','accredited','standard','compliance','certificate','accreditation'],
      answer: "✅ Vidhata holds these certifications:\n\n• ISO 9001:2015 — Quality Management System\n• ISO 13485 — Medical Device Manufacturing\n• CE Compliance\n• QMSR (Quality Management System Regulation)",
      cardIds: ['quality'],
      chips: [{ label:'✅ Quality Details', query:'quality certification' }, { label:'🏥 Medical Mfg.', query:'medical cleanroom' }]
    },
    {
      type: 'iso13485',
      patterns: ['iso 13485','iso13485','medical certified','medical certification','cleanroom certified','medical standard'],
      answer: "🏥 Yes — Vidhata is ISO 13485 certified!\n\nOur dedicated cleanroom facility handles:\n• Medical devices & IVD products\n• Drug delivery systems\n• Pharmaceutical packaging\n• Bioprocess & cell therapy components",
      cardIds: ['medical','quality'],
      chips: [{ label:'🏥 Medical Manufacturing', query:'medical pharma cleanroom' }, { label:'✅ Quality & Certs', query:'quality certification' }]
    },
    {
      type: 'capacity',
      patterns: ['capacity','moulds','molds','how many','volume','scale','minimum order','moq','output','throughput','production volume'],
      answer: "📊 Vidhata's track record:\n\n• 400+ injection moulds designed & built\n• 200M+ plastic components produced\n• 5,000 MT raw material processed / year\n• IMM capacity: 120T – 250T (Haitian machines)\n• LED lighting: 30M+ units / year",
      cardIds: ['infrastructure','case-studies'],
      chips: [{ label:'🏭 Infrastructure', query:'infrastructure equipment cnc' }, { label:'📊 Case Studies', query:'case studies success' }]
    }
  ];

  /* ─── Response Templates by Category ────────────────────── */
  var RESPONSES = {
    greeting  : [
      "👋 Hello! Welcome to Vidhata Plastics. I can guide you through our manufacturing capabilities, quality certifications, client portfolio, and more. What are you looking for today?",
      "Hi there! 👋 I'm Vidhata's AI Assistant. Whether you're exploring services, checking certifications, or looking to start a project — I'm here to help!",
      "Hello! Great to have you here. Vidhata Plastics is a one-stop precision plastics manufacturer with 20+ years of experience. How can I assist you? 😊"
    ],
    thanks    : [
      "You're welcome! 😊 Feel free to ask if you need more information.",
      "Happy to help! Is there anything else you'd like to explore? 👍",
      "Glad I could assist! Let me know if you have more questions. 🌟"
    ],
    fallback  : [
      "I didn't find an exact match, but here are our main sections — I'm sure one of these will help:",
      "Let me show you our key areas — hopefully one of these covers what you need:",
      "I'm not sure about that specific topic, but here are the key pages of our website:"
    ],
    about        : "Vidhata Plastics has 20+ years of precision plastics expertise, led by K.S. Rao (Managing Director) and Vikrant Kandimalla (Director, MS Aerospace Engineering). Here's what you'll find:",
    medical      : "Our medical manufacturing capabilities are among our strongest offerings! 🏥 Vidhata operates an ISO 13485-compliant cleanroom facility serving healthcare leaders like NephroPlus, Cathronic Medical, and East Pharma Technologies.",
    services     : "Vidhata offers a complete end-to-end plastics manufacturing service — from initial concept design all the way to final delivery. ⚙️ Here are the most relevant sections:",
    quality      : "Quality is built into every stage at Vidhata. 📋 We hold ISO 9001:2015 and ISO 13485 certifications, backed by comprehensive testing labs and metrology facilities.",
    contact      : "Ready to start a project with us? 📬 Our team would love to hear from you — request a quote or schedule a consultation today.",
    careers      : "Interested in joining the Vidhata team? 💼 We're always looking for talented engineers and manufacturing professionals. Here's where to look:",
    infrastructure:"Our state-of-the-art facility houses world-class CNC, EDM, and injection moulding equipment. 🏭 Explore our full infrastructure:",
    clients      : "We're proud to serve some of India's most prestigious brands across healthcare, electronics, and consumer goods. 🤝 Here's a look:",
    industries   : "Vidhata serves a diverse range of industries — from medical devices to LED lighting and footwear. 🌐 Explore the sectors we specialise in:",
    'case-studies': "See real results from our work with leading brands! 📊 Explore our project highlights and success stories:",
    blog         : "Stay updated with the latest from Vidhata Plastics — manufacturing insights, trends, and company news. 📝",
    general      : "Here's what I found that might be useful:",
    default      : "Here are the most relevant sections I found for you:"
  };

  /* ─── Follow-up Chips by Category ───────────────────────── */
  var FOLLOW_UP = {
    medical      : [{ label:'📋 ISO 13485 Details',    query:'iso 13485 regulatory' }, { label:'🤝 Medical Clients',   query:'nephroplus cathronic medical clients' }, { label:'📬 Get a Quote',       query:'contact quote' }],
    services     : [{ label:'🏥 Medical Mfg.',          query:'medical pharma cleanroom' }, { label:'🔧 Tooling & Moulds', query:'tool mould tooling' }, { label:'📬 Request a Quote', query:'contact quote' }],
    quality      : [{ label:'🏥 Medical Mfg.',          query:'medical cleanroom iso 13485' }, { label:'📋 Regulatory Support', query:'regulatory compliance' }, { label:'🏭 Infrastructure', query:'infrastructure equipment' }],
    contact      : [{ label:'⚙️ Our Services',          query:'services capabilities' }, { label:'📊 Case Studies',     query:'case studies' }, { label:'🤝 Our Clients',       query:'clients customers' }],
    infrastructure:[{ label:'⚙️ Our Services',          query:'manufacturing services' }, { label:'✅ Quality Systems',  query:'quality certification iso' }, { label:'📬 Contact Us',        query:'contact quote' }],
    clients      : [{ label:'📊 Case Studies',          query:'case studies success' }, { label:'🌐 Industries',        query:'industries sectors' }, { label:'📬 Work With Us',      query:'contact quote' }],
    about        : [{ label:'⚙️ Our Services',          query:'services capabilities' }, { label:'🤝 Our Clients',      query:'clients partners' }, { label:'💼 Join Our Team',     query:'careers jobs' }],
    industries   : [{ label:'🏥 Medical Sector',        query:'medical pharma healthcare' }, { label:'⚙️ Our Services', query:'services manufacturing' }, { label:'🤝 Our Clients',       query:'clients' }],
    'case-studies': [{ label:'🤝 Our Clients',          query:'clients' }, { label:'🌐 Industries',        query:'industries sectors' }, { label:'📬 Start a Project',   query:'contact quote' }],
    careers      : [{ label:'🏢 About Us',              query:'about company team' }, { label:'⚙️ What We Do',       query:'services manufacturing' }, { label:'📬 Contact HR',        query:'contact' }],
    blog         : [{ label:'⚙️ Our Services',          query:'services' }, { label:'🏥 Medical Focus',     query:'medical' }, { label:'📬 Contact Us',        query:'contact' }]
  };

  /* ─── State ──────────────────────────────────────────────── */
  var isOpen       = false;
  var hasGreeted   = false;
  var typingTimer  = null;
  var lastQuery    = '';
  var msgCounter   = 0;
  var messageStore = [];   // in-memory mirror of localStorage

  /* ─── Storage ────────────────────────────────────────────── */
  function saveHistory() {
    try {
      localStorage.setItem(CFG.storageKey, JSON.stringify({
        ts      : Date.now(),
        greeted : hasGreeted,
        msgs    : messageStore.slice(-CFG.maxHistory)
      }));
    } catch (e) {}
  }

  function loadHistory() {
    try {
      var raw  = localStorage.getItem(CFG.storageKey);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (Date.now() - data.ts > CFG.maxAgeMs) {
        localStorage.removeItem(CFG.storageKey);
        return null;
      }
      return data;
    } catch (e) { return null; }
  }

  /* ─── Analytics ──────────────────────────────────────────── */
  function track(eventName, params) {
    try {
      // Google Analytics 4 (fires only if gtag is on the page)
      if (typeof gtag === 'function') {
        gtag('event', eventName, Object.assign({ event_category: 'chatbot' }, params || {}));
      }
    } catch (e) {}
  }

  /* ─── Text Helpers ───────────────────────────────────────── */
  function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function norm(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function tokenize(text) {
    return norm(text).split(' ').filter(function (t) { return t.length > 1; });
  }

  function isGreeting(text) {
    var greetings = ['hello','hi','hey','good morning','good afternoon','good evening','greetings','howdy','namaste','hiya','sup'];
    var n = norm(text);
    return greetings.some(function (g) { return n === g || n.startsWith(g + ' ') || n.endsWith(' ' + g); });
  }

  function isThanks(text) {
    var words = ['thank','thanks','thankyou','thx','ty','great','awesome','perfect','brilliant','excellent','wonderful','helpful','nice'];
    var n = norm(text);
    return words.some(function (w) { return n === w || n.includes(w); });
  }

  function isBotQuery(text) {
    var n = norm(text);
    return n.includes('who are you') || (n.includes('you') && n.includes('bot')) || n.includes('assistant') || n === 'what are you';
  }

  /* ─── Current Page ───────────────────────────────────────── */
  function currentPage() {
    var file = (window.location.pathname.split('/').pop() || 'index.html');
    return file.split('?')[0].split('#')[0];
  }

  function pageChips() {
    return PAGE_CHIPS[currentPage()] || PAGE_CHIPS['index.html'];
  }

  /* ─── Smooth-Scroll Navigation ───────────────────────────── */
  function navigateToSection(href) {
    var parts  = href.split('#');
    if (parts.length < 2 || !parts[1]) return false;
    var anchor = parts[1];
    var tPage  = parts[0];
    var cPage  = currentPage();
    if (tPage !== cPage) return false;
    var target = document.getElementById(anchor);
    if (!target) return false;
    closeChatPanel();
    setTimeout(function () {
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 20, behavior: 'smooth' });
    }, 220);
    return true;
  }

  /* ─── Intent Scoring ─────────────────────────────────────── */
  function scorePages(query) {
    var tokens = tokenize(query);
    if (!tokens.length) return [];
    var scored = SITE_MAP.map(function (page) {
      var score = 0;
      tokens.forEach(function (token) {
        page.keywords.forEach(function (kw) {
          if (kw === token)                                                    score += 3;
          else if (kw.indexOf(' ') < 0 && kw.includes(token) && token.length >= 3) score += 1.5;
          else if (token.includes(kw) && kw.length >= 3)                       score += 1;
        });
      });
      return Object.assign({}, page, { score: score * (page.weight || 1) });
    });
    return scored.filter(function (p) { return p.score > 0; }).sort(function (a, b) { return b.score - a.score; });
  }

  function dominantCategory(matches) {
    return matches.length ? (matches[0].category || 'default') : 'default';
  }

  /* ─── FAQ Check ──────────────────────────────────────────── */
  function checkFAQ(query) {
    var n      = norm(query);
    var tokens = tokenize(query);
    var topScore = -1;  // lazy-compute page score only if needed

    for (var i = 0; i < FAQS.length; i++) {
      var faq = FAQS[i];
      var matched = faq.patterns.some(function (p) {
        return p.indexOf(' ') >= 0 ? n.includes(p) : tokens.indexOf(p) >= 0 || n === p;
      });
      if (!matched) continue;

      if (faq.alwaysTrigger) return faq;

      // For non-alwaysTrigger FAQs: only surface if page scoring is weak (< 6)
      if (topScore < 0) {
        var pm = scorePages(query);
        topScore = pm.length ? pm[0].score : 0;
      }
      if (topScore < 6) return faq;
    }
    return null;
  }

  /* ─── DOM Helpers ────────────────────────────────────────── */
  function el(tag, cls, attrs) {
    var e = document.createElement(tag);
    if (cls)   e.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }

  function qs(id) { return document.getElementById(id); }

  function pageById(id) {
    for (var i = 0; i < SITE_MAP.length; i++) { if (SITE_MAP[i].id === id) return SITE_MAP[i]; }
    return null;
  }

  /* ─── Build Page Card ────────────────────────────────────── */
  function buildPageCard(page) {
    var card = el('a', 'vp-chat-card', { href: page.page, 'data-vpid': page.id });
    card.innerHTML =
      '<div class="vp-chat-card__icon">' + page.icon + '</div>' +
      '<div class="vp-chat-card__body">' +
        '<div class="vp-chat-card__title">' + page.title + '</div>' +
        '<div class="vp-chat-card__desc">' + page.description + '</div>' +
      '</div>' +
      '<div class="vp-chat-card__arrow">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      '</div>';
    card.addEventListener('click', function (e) {
      track('chatbot_card_click', { page_id: page.id, page_title: page.title, source_query: lastQuery });
      if (navigateToSection(page.page)) { e.preventDefault(); }
      else { closeChatPanel(); }
    });
    return card;
  }

  /* ─── Build Chip ─────────────────────────────────────────── */
  function buildChip(chip) {
    var btn = el('button', 'vp-chat-chip');
    btn.textContent = chip.label;
    btn.addEventListener('click', function () {
      track('chatbot_chip_click', { chip_label: chip.label, chip_query: chip.query });
      handleUserMessage(chip.query, chip.label);
    });
    return btn;
  }

  /* ─── Thumbs Feedback Widget ─────────────────────────────── */
  function buildFeedback(mid) {
    var wrap = el('div', 'vp-chat-feedback', { 'data-mid': mid });
    wrap.innerHTML =
      '<span class="vp-chat-fb-label">Helpful?</span>' +
      '<button class="vp-chat-fb-btn" data-vote="up"   title="Yes, helpful">👍</button>' +
      '<button class="vp-chat-fb-btn" data-vote="down" title="Not helpful">👎</button>';

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-vote]');
      if (!btn || wrap.classList.contains('vp-chat-feedback--voted')) return;
      var vote = btn.getAttribute('data-vote');
      wrap.classList.add('vp-chat-feedback--voted');
      wrap.innerHTML =
        '<span class="vp-chat-fb-label vp-chat-fb-thanks">' +
          (vote === 'up' ? '✓ Thanks for the feedback!' : '✓ We\'ll improve. Thanks!') +
        '</span>';
      track('chatbot_feedback', { vote: vote, context_query: lastQuery });
    });
    return wrap;
  }

  /* ─── Messages ───────────────────────────────────────────── */
  function addBotMessage(text, cards, opts) {
    opts = opts || {};
    var id   = 'vp-msg-' + (++msgCounter);
    var msgs = qs('vp-chat-messages');
    var row  = el('div', 'vp-chat-msg vp-chat-msg--bot', { id: id });

    var avatar = el('div', 'vp-chat-msg__avatar');
    avatar.textContent = 'V';

    var body   = el('div', 'vp-chat-msg__body');
    var bubble = el('div', 'vp-chat-msg__bubble' + (opts.faq ? ' vp-chat-msg__bubble--faq' : ''));
    bubble.textContent = text;
    body.appendChild(bubble);

    if (cards && cards.length) {
      var cw = el('div', 'vp-chat-cards');
      cards.forEach(function (c) { cw.appendChild(buildPageCard(c)); });
      body.appendChild(cw);
    }

    // Feedback only on fresh messages (not restored ones)
    if (!opts.restore) {
      body.appendChild(buildFeedback(id));
    }

    row.appendChild(avatar);
    row.appendChild(body);
    msgs.appendChild(row);
    scrollDown();

    if (!opts.restore) {
      messageStore.push({
        role    : 'bot',
        text    : text,
        cardIds : cards ? cards.map(function (c) { return c.id; }) : [],
        ts      : Date.now()
      });
      saveHistory();
    }
  }

  function addUserMessage(text, skipSave) {
    var msgs = qs('vp-chat-messages');
    var row  = el('div', 'vp-chat-msg vp-chat-msg--user');
    var bbl  = el('div', 'vp-chat-msg__bubble');
    bbl.textContent = text;
    row.appendChild(bbl);
    msgs.appendChild(row);
    scrollDown();
    if (!skipSave) {
      messageStore.push({ role: 'user', text: text, ts: Date.now() });
      saveHistory();
    }
  }

  /* ─── Typing Indicator ───────────────────────────────────── */
  function showTyping() {
    removeTyping();
    var msgs = qs('vp-chat-messages');
    var row  = el('div', 'vp-chat-msg vp-chat-msg--bot', { id: 'vp-typing' });
    row.innerHTML =
      '<div class="vp-chat-msg__avatar">V</div>' +
      '<div class="vp-chat-msg__body">' +
        '<div class="vp-chat-typing-dots"><span></span><span></span><span></span></div>' +
      '</div>';
    msgs.appendChild(row);
    scrollDown();
  }

  function removeTyping() {
    var t = qs('vp-typing');
    if (t) t.remove();
  }

  /* ─── Chips ──────────────────────────────────────────────── */
  function setChips(chips) {
    var el2 = qs('vp-chat-chips');
    if (!el2) return;
    el2.innerHTML = '';
    chips.forEach(function (c) { el2.appendChild(buildChip(c)); });
  }

  function clearChips() {
    var el2 = qs('vp-chat-chips');
    if (el2) el2.innerHTML = '';
  }

  function scrollDown() {
    var m = qs('vp-chat-messages');
    if (m) requestAnimationFrame(function () { m.scrollTop = m.scrollHeight; });
  }

  /* ─── Response Generator ─────────────────────────────────── */
  function generateResponse(query) {
    // ── conversational shortcuts ──
    if (isGreeting(query)) {
      return { text: randomFrom(RESPONSES.greeting), cards: [], chips: pageChips(), faq: false };
    }
    if (isThanks(query)) {
      return { text: randomFrom(RESPONSES.thanks), cards: [], chips: pageChips(), faq: false };
    }
    if (isBotQuery(query)) {
      return { text: "I'm the Vidhata AI Assistant! 🤖 I help visitors navigate the website and find exactly the right information — services, quality certifications, clients, careers, and more. Just type your question!", cards: [], chips: pageChips(), faq: false };
    }

    // ── FAQ direct answer ──
    var faq = checkFAQ(query);
    if (faq) {
      var faqCards = (faq.cardIds || []).map(pageById).filter(Boolean);
      track('chatbot_faq_match', { faq_type: faq.type, query: query });
      return { text: faq.answer, cards: faqCards, chips: faq.chips || pageChips(), faq: true };
    }

    // ── intent-matching page cards ──
    var matches = scorePages(query);
    var top3    = matches.slice(0, 3);

    if (!top3.length) {
      return { text: randomFrom(RESPONSES.fallback), cards: [], chips: pageChips(), faq: false };
    }

    var cat    = dominantCategory(top3);
    var resText = RESPONSES[cat] || RESPONSES.default;
    var chips  = FOLLOW_UP[cat] || pageChips().slice(0, 3);
    return { text: resText, cards: top3, chips: chips, faq: false };
  }

  /* ─── Handle User Message ────────────────────────────────── */
  function handleUserMessage(query, displayText) {
    var label = displayText || query;
    lastQuery = query;

    addUserMessage(label);
    clearChips();
    showTyping();

    track('chatbot_query', { query_text: query, display_text: label, page: currentPage() });

    if (typingTimer) clearTimeout(typingTimer);
    typingTimer = setTimeout(function () {
      removeTyping();
      var resp = generateResponse(query);
      addBotMessage(resp.text, resp.cards, { faq: resp.faq });
      if (resp.chips && resp.chips.length) setChips(resp.chips);
    }, 650 + Math.random() * 450);
  }

  /* ─── Restore History ────────────────────────────────────── */
  function restoreHistory(msgs) {
    msgs.forEach(function (msg) {
      if (msg.role === 'user') {
        addUserMessage(msg.text, true);
      } else {
        var cards = (msg.cardIds || []).map(pageById).filter(Boolean);
        addBotMessage(msg.text, cards, { restore: true });
      }
    });
    messageStore = msgs.slice();
  }

  /* ─── Open / Close ───────────────────────────────────────── */
  function openChatPanel() {
    isOpen = true;
    var panel  = qs('vp-chat-panel');
    var toggle = qs('vp-chat-toggle');
    var badge  = qs('vp-chat-badge');

    panel.classList.add('vp-chat-panel--open');
    panel.setAttribute('aria-hidden', 'false');
    toggle.classList.add('vp-chat-toggle--open');
    toggle.setAttribute('aria-expanded', 'true');
    setIcon(true);
    if (badge) badge.style.display = 'none';

    track('chatbot_open', { page: currentPage() });

    setTimeout(function () { var inp = qs('vp-chat-input'); if (inp) inp.focus(); }, 350);

    if (!hasGreeted) {
      // Fresh session — welcome message
      hasGreeted = true;
      setTimeout(function () {
        addBotMessage("👋 Hi! I'm Vidhata's AI Assistant.\n\nI can help you find information about our services, medical manufacturing, quality certifications, clients, careers, and more.\n\nWhat are you looking for today?");
        setChips(pageChips());
      }, 450);
    } else {
      // Returning user — refresh chips to match current page
      setChips(pageChips());
    }
  }

  function closeChatPanel() {
    isOpen = false;
    var panel  = qs('vp-chat-panel');
    var toggle = qs('vp-chat-toggle');
    panel.classList.remove('vp-chat-panel--open');
    panel.setAttribute('aria-hidden', 'true');
    toggle.classList.remove('vp-chat-toggle--open');
    toggle.setAttribute('aria-expanded', 'false');
    setIcon(false);
    if (typingTimer) { clearTimeout(typingTimer); removeTyping(); }
  }

  function setIcon(open) {
    var wrap = qs('vp-chat-toggle') && qs('vp-chat-toggle').querySelector('.vp-chat-toggle__icon');
    if (!wrap) return;
    wrap.innerHTML = open
      ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  }

  /* ─── Build Widget DOM ───────────────────────────────────── */
  function buildWidget() {

    /* ── Toggle Button ── */
    var toggle = el('button', 'vp-chat-toggle', {
      id              : 'vp-chat-toggle',
      'aria-label'    : 'Open Vidhata AI Assistant',
      'aria-expanded' : 'false',
      'aria-controls' : 'vp-chat-panel'
    });
    toggle.innerHTML =
      '<div class="vp-chat-toggle__icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
      '</div>' +
      '<span class="vp-chat-badge" id="vp-chat-badge">1</span>';

    /* ── Chat Panel ── */
    var panel = el('div', 'vp-chat-panel', {
      id           : 'vp-chat-panel',
      'aria-hidden': 'true',
      role         : 'dialog',
      'aria-label' : 'Vidhata AI Navigation Assistant',
      'aria-modal' : 'false'
    });

    panel.innerHTML =
      /* header */
      '<div class="vp-chat-header">' +
        '<div class="vp-chat-header__info">' +
          '<div class="vp-chat-avatar-wrap">' +
            '<div class="vp-chat-avatar">V</div>' +
            '<span class="vp-status-dot"></span>' +
          '</div>' +
          '<div class="vp-chat-header__text">' +
            '<div class="vp-chat-header__name">Vidhata Assistant</div>' +
            '<div class="vp-chat-header__sub"><span class="vp-online-indicator"></span> AI-powered navigation</div>' +
          '</div>' +
        '</div>' +
        '<button class="vp-chat-close" id="vp-chat-close" aria-label="Close chat">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>' +

      /* ── quick-dial bar (WhatsApp + Phone) ── */
      '<div class="vp-chat-quickdial">' +
        '<a class="vp-chat-qd-btn vp-chat-qd-btn--phone" href="tel:' + CFG.phone + '" id="vp-qd-call" aria-label="Call Vidhata">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.72A16 16 0 0 0 15.28 16l.97-.97a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
          '<span>' + CFG.phoneLabel + '</span>' +
        '</a>' +
        '<a class="vp-chat-qd-btn vp-chat-qd-btn--wa" href="' + CFG.whatsapp + '" target="_blank" rel="noopener" id="vp-qd-wa" aria-label="WhatsApp Vidhata">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>' +
          '<span>WhatsApp</span>' +
        '</a>' +
      '</div>' +

      /* messages */
      '<div class="vp-chat-messages" id="vp-chat-messages" role="log" aria-live="polite" aria-label="Chat messages"></div>' +

      /* chips */
      '<div class="vp-chat-chips-wrap"><div class="vp-chat-chips" id="vp-chat-chips"></div></div>' +

      /* footer / input */
      '<div class="vp-chat-footer">' +
        '<div class="vp-chat-input-wrap">' +
          '<input type="text" id="vp-chat-input" class="vp-chat-input" placeholder="Ask me anything…" autocomplete="off" maxlength="200" aria-label="Type your message" />' +
          '<button class="vp-chat-send" id="vp-chat-send" aria-label="Send message">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="vp-chat-brand">Powered by Vidhata AI</div>' +
      '</div>';

    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    /* ── Wire Up Events ── */
    toggle.addEventListener('click', function () { isOpen ? closeChatPanel() : openChatPanel(); });
    qs('vp-chat-close').addEventListener('click', closeChatPanel);

    qs('vp-qd-call').addEventListener('click', function () {
      track('chatbot_quickdial', { type: 'phone', page: currentPage() });
    });
    qs('vp-qd-wa').addEventListener('click', function () {
      track('chatbot_quickdial', { type: 'whatsapp', page: currentPage() });
    });

    var input   = qs('vp-chat-input');
    var sendBtn = qs('vp-chat-send');

    function send() {
      var val = input.value.trim();
      if (!val) return;
      input.value = '';
      handleUserMessage(val);
    }

    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });

    // Dismiss on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && document.body.contains(e.target) && !panel.contains(e.target) && !toggle.contains(e.target)) closeChatPanel();
    });

    // Attention badge after 3 s
    setTimeout(function () {
      var badge = qs('vp-chat-badge');
      if (badge && !hasGreeted) {
        badge.style.display   = 'flex';
        badge.style.animation = 'vp-bounce-in 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      }
    }, 3000);
  }

  /* ─── Init ───────────────────────────────────────────────── */
  function init() {
    if (qs('vp-chat-toggle')) return;   // guard: double-init
    buildWidget();

    // Restore persisted conversation
    var stored = loadHistory();
    if (stored && stored.msgs && stored.msgs.length > 0) {
      hasGreeted = true;
      restoreHistory(stored.msgs);
      // Always show fresh page-specific chips after restore
      setChips(pageChips());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
