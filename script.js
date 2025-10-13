// Smooth scrolling for nav links
document.addEventListener('DOMContentLoaded',function(){
  // set current year
  const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.getElementById('nav');
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
          // close mobile nav
          nav && nav.classList.remove('open');
        }
      }
    });
  });

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  toggle && toggle.addEventListener('click',()=>{
    nav && nav.classList.toggle('open');
  });

  // animate on scroll
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('[data-animate]').forEach(el=>obs.observe(el));

  // Resume section uses a static window; no slider controls are required

  // specifically observe contact section to trigger staggered social animations
  const contactSection = document.getElementById('contact');
  if(contactSection){
    const contactObs = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ contactSection.classList.add('in-view'); }
      });
    },{threshold:0.18});
    contactObs.observe(contactSection);
  }

  // Contact Panel open/close behavior
  const contactPanel = document.getElementById('contactPanel');
  const contactPanelClose = document.getElementById('contactPanelClose');
  const contactBackdrop = document.querySelector('.contact-panel-backdrop');
  function openContactPanel(){
    if(!contactPanel) return;
    contactPanel.setAttribute('aria-hidden','false');
    // stagger contact cards
    const cards = contactPanel.querySelectorAll('.contact-card');
    cards.forEach((c,i)=>{ c.style.animationDelay = (120 + i*80) + 'ms'; });
  }
  function closeContactPanel(){ if(contactPanel) contactPanel.setAttribute('aria-hidden','true'); }
  contactPanelClose && contactPanelClose.addEventListener('click', closeContactPanel);
  contactBackdrop && contactBackdrop.addEventListener('click', closeContactPanel);

  // intercept nav contact link to open panel
  document.querySelectorAll('a[href="#contact"]').forEach(a=>{
    a.addEventListener('click',function(e){ e.preventDefault(); openContactPanel(); });
  });

  // scroll progress bar
  const progress = document.getElementById('progress');
  function updateProgress(){

    // Hero parallax for profile image
    const profileWrap = document.querySelector('.profile-wrap');
    const profilePhoto = document.querySelector('.profile-photo');
    if(profileWrap && profilePhoto){
      profileWrap.addEventListener('mousemove', e=>{
        const r = profileWrap.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        profilePhoto.style.transform = `translate(${px*8}px, ${py*8}px) rotate(${px*2}deg)`;
      });
      profileWrap.addEventListener('mouseleave',()=>{ profilePhoto.style.transform=''; });
    }

    // stagger child reveal for sections
    document.querySelectorAll('.section').forEach(section=>{
      const childObs = new IntersectionObserver(entries=>{
        entries.forEach(en=>{
          if(en.isIntersecting){
            const children = section.querySelectorAll('.card, .project-card, .cert-card, .skill');
            children.forEach((c,i)=>{ c.style.transitionDelay = (i*80)+'ms'; c.classList.add('in-view'); });
          }
        });
      },{threshold:0.15,rootMargin:'-30px'});
      childObs.observe(section);
    });
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / (h || 1)) * 100;
    if(progress) progress.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, {passive:true});

  // typing effect in hero
  const typedEl = document.getElementById('typed');
  if(typedEl){
    const text = typedEl.dataset.text || typedEl.textContent || '';
    typedEl.textContent = '';
    let i = 0;
    const speed = 18;
    const typer = setInterval(()=>{
      typedEl.textContent += text.charAt(i);
      i++;
      if(i >= text.length) clearInterval(typer);
    }, speed);
  }

  // progress bars
  document.querySelectorAll('.bar-fill').forEach(fill=>{
    const lvl = fill.dataset.level || 0;
    // stagger animation
    setTimeout(()=>{ fill.style.width = lvl + '%'; }, 200 + Math.random()*600);
  });

  // skill counters (animated numbers)
  document.querySelectorAll('.skill').forEach(skill=>{
    const fill = skill.querySelector('.bar-fill');
    const target = parseInt(fill ? fill.dataset.level || 0 : 0,10) || 0;
    const countEl = document.createElement('span'); countEl.className='count'; countEl.textContent='0%';
    skill.querySelector('.skill-head') && skill.querySelector('.skill-head').appendChild(countEl);
    let started = false;
    const inObs = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting && !started){
          started = true;
          let v=0; const step = Math.max(1,Math.floor(target/20));
          const t = setInterval(()=>{ v+=step; if(v>=target){ v=target; clearInterval(t); } countEl.textContent = v + '%'; }, 30);
        }
      });
    },{threshold:0.2});
    inObs.observe(skill);
  });

  // certificate modal
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');
  document.querySelectorAll('.cert-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const src = card.dataset.src;
      if(src){ modalImage.src = src; modal.setAttribute('aria-hidden','false'); }
    });
  });
  modalClose && modalClose.addEventListener('click',()=>{ modal.setAttribute('aria-hidden','true'); modalImage.src=''; });
  modal.addEventListener('click',(e)=>{ if(e.target===modal) { modal.setAttribute('aria-hidden','true'); modalImage.src=''; } });

  // button ripple effect
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('click',function(e){
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.left = (x - 60) + 'px'; ripple.style.top = (y - 60) + 'px';
      btn.classList.add('ripple');
      setTimeout(()=>btn.classList.remove('ripple'),250);
    });
  });

  // project tilt (pointer-based subtle 3D tilt)
  document.querySelectorAll('.project-card.tilt').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * 6; // rotateX
      const ry = (px - 0.5) * -10; // rotateY
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave',()=>{ card.style.transform = ''; });
  });

  // Contact form validation
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      feedback.textContent='';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const submitBtn = form.querySelector('button[type="submit"]');
      if(name.length < 2){ feedback.textContent = 'Please enter your name.'; submitBtn && submitBtn.classList.add('shake'); setTimeout(()=>submitBtn && submitBtn.classList.remove('shake'),420); return; }
      if(!emailRe.test(email)){ feedback.textContent = 'Please enter a valid email.'; submitBtn && submitBtn.classList.add('shake'); setTimeout(()=>submitBtn && submitBtn.classList.remove('shake'),420); return; }
      if(message.length < 10){ feedback.textContent = 'Message must be at least 10 characters.'; submitBtn && submitBtn.classList.add('shake'); setTimeout(()=>submitBtn && submitBtn.classList.remove('shake'),420); return; }

      // improved sending UX
      if(submitBtn){
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy','true');
        submitBtn.classList.add('sending');
        // create spinner node
        const s = document.createElement('span'); s.className = 'spinner'; s.setAttribute('aria-hidden','true');
        submitBtn.prepend(s);
      }

      // simulate network send
      setTimeout(()=>{
        if(submitBtn){
          submitBtn.classList.remove('sending');
          submitBtn.removeAttribute('aria-busy');
          submitBtn.disabled = false;
          const sp = submitBtn.querySelector('.spinner'); if(sp) sp.remove();
        }
        feedback.textContent = 'Thanks — your message was sent (demo).';
        showToast('Message sent — thank you!');
        form.reset();
      },1200);
    });
  }

  // copy-to-clipboard buttons in contact
  function showToast(text){
    let t = document.createElement('div'); t.className='toast'; t.textContent = text; document.body.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),300); },2200);
  }
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click',async function(){
      const val = btn.dataset.copy || '';
      try{
        await navigator.clipboard.writeText(val);
        showToast('Copied to clipboard');
      }catch(e){
        // fallback
        const el = document.createElement('textarea'); el.value = val; document.body.appendChild(el); el.select(); document.execCommand('copy'); el.remove(); showToast('Copied to clipboard');
      }
    });
  });

  // Resume download: create a simple downloadable file (replace with real PDF in assets/resume.pdf)
  // Resume download link uses the real PDF file added to the project: Vaibhav_Ingle_CV.pdf
  const downloadBtn = document.getElementById('downloadResume');
  const iframe = document.getElementById('resumeFrame');
  // iframe src already set to Vaibhav_Ingle_CV.pdf in HTML; if needed verify availability (optional)

  // Timeline animation for Experience section
  const timeline = document.getElementById('experienceTimeline');
  if(timeline){
    const items = timeline.querySelectorAll('.timeline-item');
    const tObs = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        const el = en.target;
        if(en.isIntersecting){ el.classList.add('active'); }
      });
    },{threshold:0.18});
    items.forEach(it=>{ tObs.observe(it);
      // allow keyboard interaction
      it.addEventListener('keydown',e=>{
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); it.classList.toggle('active'); }
      });
      // click toggles for small details
      it.addEventListener('click',()=>{ it.classList.toggle('active'); });
    });
  }

});
