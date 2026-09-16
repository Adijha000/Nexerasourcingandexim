/* Nexera Canton Fair — interactions */
(function(){
  // Gated brochure: file lives in a private Supabase bucket, only reachable via a
  // short-lived signed URL generated after a lead form is actually submitted.
  var SUPABASE_URL='https://byxylgasxyscobbyjoaz.supabase.co';
  var SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5eHlsZ2FzeHlzY29iYnlqb2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MDYzNjQsImV4cCI6MjEwMDI4MjM2NH0.HBERm0mcWCfHOa8f074s6QRaVTKmiEmFiwbX4KLziMc';
  var supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
  async function getBrochureSignedUrl(){
    if(!supabaseClient) throw new Error('brochure service unavailable');
    var res = await supabaseClient.storage.from('brochure-gated').createSignedUrl('Nexera-Canton-Fair-2026-Brochure.pdf', 300);
    if(res.error || !res.data) throw new Error('could not prepare brochure link');
    return res.data.signedUrl;
  }
  window.__nxGetBrochureUrl = getBrochureSignedUrl;

  // Inject the Guangzhou skyline hero scene (vector — always renders)
  var scene = document.getElementById('heroScene');
  if(scene){
    scene.innerHTML = '<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">'
    +'<defs><linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1">'
    +'<stop offset="0" stop-color="#06122b"/><stop offset="0.5" stop-color="#14315c"/>'
    +'<stop offset="0.8" stop-color="#7a4d63"/><stop offset="1" stop-color="#d98d47"/></linearGradient>'
    +'<radialGradient id="hsun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffe3a6"/>'
    +'<stop offset="0.5" stop-color="#f4b85e" stop-opacity="0.7"/><stop offset="1" stop-color="#f4b85e" stop-opacity="0"/></radialGradient></defs>'
    +'<rect width="1440" height="900" fill="url(#hsky)"/>'
    +'<circle cx="1050" cy="640" r="260" fill="url(#hsun)"/><circle cx="1050" cy="640" r="70" fill="#ffe6ad" opacity="0.85"/>'
    +buildings()
    +cantonTower(760,300)
    +'</svg>';
  }
  function buildings(){
    var s='<g fill="#0a1830" opacity="0.9">',x=0,seed=7;
    for(var i=0;i<40;i++){var w=18+((seed=seed*77+13)%26),h=90+((seed=seed*61+7)%230);
      s+='<rect x="'+x+'" y="'+(760-h)+'" width="'+w+'" height="'+(h+140)+'"/>';x+=w+6;}
    return s+'</g>';
  }
  function cantonTower(cx,topY){
    return '<g><line x1="'+cx+'" y1="'+topY+'" x2="'+cx+'" y2="'+(topY-70)+'" stroke="#7e68a6" stroke-width="4"/>'
    +'<path d="M'+(cx-16)+' '+topY+' Q'+(cx-52)+' '+(topY+220)+' '+(cx-8)+' '+(topY+300)+' Q'+(cx-40)+' '+(topY+430)+' '+(cx-30)+' '+(topY+460)+' L'+(cx+30)+' '+(topY+460)+' Q'+(cx+40)+' '+(topY+430)+' '+(cx+8)+' '+(topY+300)+' Q'+(cx+52)+' '+(topY+220)+' '+(cx+16)+' '+topY+' Z" fill="#2c2350"/>'
    +'<ellipse cx="'+cx+'" cy="'+(topY+120)+'" rx="24" ry="6" fill="none" stroke="#8e6eb8" stroke-width="2" opacity="0.6"/>'
    +'<ellipse cx="'+cx+'" cy="'+(topY+220)+'" rx="16" ry="6" fill="none" stroke="#b98bd8" stroke-width="2" opacity="0.7"/>'
    +'<ellipse cx="'+cx+'" cy="'+(topY+320)+'" rx="26" ry="6" fill="none" stroke="#8e6eb8" stroke-width="2" opacity="0.6"/></g>';
  }

  // Header scroll state
  var header=document.getElementById('header');
  window.addEventListener('scroll',function(){header.classList.toggle('scrolled',window.scrollY>40);});

  // Mobile nav
  var ham=document.getElementById('ham'),links=document.getElementById('navLinks');
  ham.addEventListener('click',function(){links.classList.toggle('open');});
  links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');});});

  // Scroll reveal
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  // Lazy-load Calendly widget script only when the booking section is scrolled near
  var bookSection=document.getElementById('book');
  if(bookSection){
    var calIo=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          var s=document.createElement('script');
          s.src='https://assets.calendly.com/assets/external/widget.js';
          s.async=true;
          document.body.appendChild(s);
          calIo.unobserve(bookSection);
        }
      });
    },{rootMargin:'300px'});
    calIo.observe(bookSection);
  }

  // Lazy-load muted autoplay video only when scrolled near (keeps initial page load light)
  var videoWrap=document.getElementById('videoWrap');
  if(videoWrap){
    var vio=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          var id=videoWrap.getAttribute('data-yt');
          var ifr=document.createElement('iframe');
          ifr.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&mute=1&loop=1&playlist='+id+'&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3';
          ifr.setAttribute('allow','autoplay; encrypted-media');
          ifr.setAttribute('title','Canton Fair Guangzhou walkthrough video');
          ifr.loading='lazy';
          videoWrap.appendChild(ifr);
          document.getElementById('videoPoster').style.opacity='0';
          vio.unobserve(videoWrap);
        }
      });
    },{rootMargin:'200px'});
    vio.observe(videoWrap);
  }

  // FAQ accordion
  document.querySelectorAll('.qa button').forEach(function(b){
    b.addEventListener('click',function(){
      var qa=b.parentElement,ans=qa.querySelector('.ans'),open=qa.classList.contains('open');
      document.querySelectorAll('.qa').forEach(function(x){x.classList.remove('open');x.querySelector('.ans').style.maxHeight=null;});
      if(!open){qa.classList.add('open');ans.style.maxHeight=ans.scrollHeight+'px';}
    });
  });

  // Lead form -> FormSubmit.co (emails nexerasourcing01@gmail.com, no account needed)
  var form=document.getElementById('leadForm'),msg=document.getElementById('formMsg'),btn=document.getElementById('submitBtn');
  if(form){
    form.addEventListener('submit',async function(e){
      e.preventDefault();
      msg.className='form-msg';btn.disabled=true;btn.textContent='Sending...';
      try{
        var res=await fetch('https://formsubmit.co/ajax/nexerasourcing01@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
        var out=await res.json();
        if(out.success==='true'||out.success===true){msg.classList.add('ok');
          msg.innerHTML='Thank you! Our sourcing specialist will call you within 24 hours.<br><a href="#" id="leadBrochureLink" class="btn btn-primary btn-block" style="margin-top:12px">Download the Canton Fair brochure</a>';
          form.reset();
          if(window.gtag)gtag('event','generate_lead',{event_category:'form',event_label:'canton_fair'});
          if(window.fbq)fbq('track','Lead',{content_name:'homepage_consultation'});
          var lbLink=document.getElementById('leadBrochureLink');
          if(lbLink)lbLink.addEventListener('click',async function(e){e.preventDefault();lbLink.textContent='Preparing...';try{var url=await getBrochureSignedUrl();window.location.href=url;lbLink.textContent='Download the Canton Fair brochure';}catch(err){lbLink.textContent='Could not load, WhatsApp us instead';}});
        }else{throw new Error();}
      }catch(err){msg.classList.add('err');msg.textContent='Something went wrong. Please WhatsApp us at +91 7746 050190.';}
      btn.disabled=false;btn.textContent='Request my free consultation';
    });
  }

  // Brochure download form -> FormSubmit.co, then trigger the actual PDF download
  var bForm=document.getElementById('brochureForm'),bMsg=document.getElementById('brochureMsg'),bBtn=document.getElementById('dlBrochureBtn');
  if(bForm){
    bForm.addEventListener('submit',async function(e){
      e.preventDefault();
      bMsg.className='form-msg';bBtn.disabled=true;bBtn.textContent='Preparing your download...';
      try{
        var res=await fetch('https://formsubmit.co/ajax/nexerasourcing01@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(bForm)))});
        var out=await res.json().catch(function(){return {success:'true'};});
        if(out.success==='true'||out.success===true){
          bMsg.classList.add('ok');
          bMsg.innerHTML='Thank you! Your download is starting. Our team may also reach out with a personalised sourcing plan.';
          var url=await getBrochureSignedUrl();
          window.location.href=url;
          bForm.reset();
          if(window.gtag)gtag('event','generate_lead',{event_category:'form',event_label:'brochure_download'});
          if(window.fbq)fbq('track','Lead',{content_name:'brochure_download'});
        }else{throw new Error();}
      }catch(err){
        bMsg.classList.add('err');
        bMsg.textContent='Something went wrong. Please WhatsApp us at +91 7746 050190 and we will send the brochure directly.';
      }
      bBtn.disabled=false;bBtn.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>Get the brochure (PDF)';
    });
  }

  // Scroll progress bar
  var sb=document.getElementById('scrollbar');
  if(sb){window.addEventListener('scroll',function(){var h=document.documentElement;var p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;sb.style.width=p+'%';});}

  // Animated counters
  function animateCount(elm){
    var to=+elm.getAttribute('data-to'),suf=elm.getAttribute('data-suffix')||'',start=0,dur=1600,t0=null;
    function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);var val=Math.floor((1-Math.pow(1-p,3))*to);elm.textContent=val.toLocaleString('en-IN')+suf;if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  }
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){animateCount(e.target);cio.unobserve(e.target);}});},{threshold:.5});
  document.querySelectorAll('.count').forEach(function(el){cio.observe(el);});

  // Subtle 3D tilt on hover
  document.querySelectorAll('.tilt').forEach(function(el){
    el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(600px) rotateX('+(-y*8)+'deg) rotateY('+(x*8)+'deg) translateY(-6px)';});
    el.addEventListener('mouseleave',function(){el.style.transform='';});
  });
})();
