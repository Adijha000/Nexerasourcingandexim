/* Nexera Canton Fair — interactions */
(function(){
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

  // FAQ accordion
  document.querySelectorAll('.qa button').forEach(function(b){
    b.addEventListener('click',function(){
      var qa=b.parentElement,ans=qa.querySelector('.ans'),open=qa.classList.contains('open');
      document.querySelectorAll('.qa').forEach(function(x){x.classList.remove('open');x.querySelector('.ans').style.maxHeight=null;});
      if(!open){qa.classList.add('open');ans.style.maxHeight=ans.scrollHeight+'px';}
    });
  });

  // Lead form -> Web3Forms (emails nexerasourcing01@gmail.com)
  var form=document.getElementById('leadForm'),msg=document.getElementById('formMsg'),btn=document.getElementById('submitBtn');
  if(form){
    form.addEventListener('submit',async function(e){
      e.preventDefault();
      var key=form.querySelector('[name=access_key]').value;
      msg.className='form-msg';btn.disabled=true;btn.textContent='Sending…';
      // Fallback: if no Web3Forms key set yet, open email client
      if(!key||key==='YOUR_WEB3FORMS_ACCESS_KEY'){
        var d=new FormData(form),body='';d.forEach(function(v,k){if(['access_key','subject','from_name','botcheck'].indexOf(k)<0)body+=k+': '+v+'%0D%0A';});
        window.location.href='mailto:nexerasourcing01@gmail.com?subject=Canton%20Fair%20Inquiry&body='+body;
        btn.disabled=false;btn.textContent='Request my free consultation';return;
      }
      try{
        var res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
        var out=await res.json();
        if(out.success){msg.classList.add('ok');msg.textContent='✅ Thank you! Our sourcing specialist will call you within 24 hours.';form.reset();
          if(window.gtag)gtag('event','generate_lead',{event_category:'form',event_label:'canton_fair'});
        }else{throw new Error();}
      }catch(err){msg.classList.add('err');msg.textContent='Something went wrong. Please WhatsApp us at +91 83054 29482.';}
      btn.disabled=false;btn.textContent='Request my free consultation';
    });
  }
})();
