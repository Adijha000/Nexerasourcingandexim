/* Auto-opening inquiry popup — shows within 3 seconds, once per session */
(function(){
  if(sessionStorage.getItem('nx_popup'))return;
  var ENDPOINT='https://formsubmit.co/ajax/nexerasourcing01@gmail.com';
  var CAL='https://calendly.com/nexerasourcing01/30min';

  var wrap=document.createElement('div');
  wrap.className='modal-overlay';
  wrap.innerHTML=
    '<div class="modal" role="dialog" aria-modal="true" aria-label="Get your free Canton Fair sourcing plan">'
    +'<button class="modal-close" aria-label="Close">&times;</button>'
    +'<div class="modal-top"><h3>Get your free Canton Fair 2026 sourcing plan</h3><p>Tell us about your business. Our specialist calls you within 24 hours.</p></div>'
    +'<div class="modal-body">'
    +'<form id="nxPopupForm" novalidate>'
    +'<input type="hidden" name="_subject" value="New Canton Fair Inquiry (Popup)">'
    +'<input type="hidden" name="_template" value="table">'
    +'<input type="hidden" name="_captcha" value="false">'
    +'<input type="text" name="_honey" style="display:none">'
    +'<div class="field"><label>Full name*</label><input type="text" name="Name" required placeholder="Your name"></div>'
    +'<div class="field"><label>WhatsApp number*</label><input type="tel" name="Phone" required placeholder="+91 ..."></div>'
    +'<div class="field"><label>City*</label><input type="text" name="City" required placeholder="e.g. Surat, Delhi, Mumbai"></div>'
    +'<div class="field"><label>What do you want to source?*</label><select name="Sourcing_Category" required>'
    +'<option value="">Select</option><option>Electronics and Appliances</option><option>Textiles and Garments</option><option>Machinery and Equipment</option><option>Tiles and Building Materials</option><option>Home and Decor</option><option>Auto Parts</option><option>Gifts and Consumer Goods</option><option>Other</option></select></div>'
    +'<button type="submit" class="btn btn-primary btn-block" id="nxPopupBtn">Request my free consultation</button>'
    +'<div class="form-msg" id="nxPopupMsg"></div>'
    +'<p class="form-note" style="margin-top:10px">Prefer to pick a time? <a href="'+CAL+'" style="color:var(--blue);font-weight:700">Book a meeting</a></p>'
    +'</form></div></div>';
  document.body.appendChild(wrap);

  function close(){wrap.classList.remove('show');sessionStorage.setItem('nx_popup','1');setTimeout(function(){wrap.remove();},350);}
  wrap.querySelector('.modal-close').addEventListener('click',close);
  wrap.addEventListener('click',function(e){if(e.target===wrap)close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});

  setTimeout(function(){wrap.classList.add('show');sessionStorage.setItem('nx_popup','1');},2500);

  var form=wrap.querySelector('#nxPopupForm'),msg=wrap.querySelector('#nxPopupMsg'),btn=wrap.querySelector('#nxPopupBtn');
  form.addEventListener('submit',async function(e){
    e.preventDefault();msg.className='form-msg';btn.disabled=true;btn.textContent='Sending...';
    try{
      var res=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
      var out=await res.json();
      if(out.success==='true'||out.success===true){msg.classList.add('ok');msg.textContent='Thank you! Our specialist will call you within 24 hours.';form.reset();if(window.gtag)gtag('event','generate_lead',{event_label:'popup'});setTimeout(close,2200);}
      else throw new Error();
    }catch(err){msg.classList.add('err');msg.textContent='Something went wrong. Please WhatsApp us at +91 7746 050190.';}
    btn.disabled=false;btn.textContent='Request my free consultation';
  });
})();
