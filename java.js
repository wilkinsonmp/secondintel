
      
   
      // timeline card interaction: hover to reveal on large screens, click/tap to toggle on all
      (function(){
        const cards = Array.from(document.querySelectorAll('.timeline-card'));
        if (!cards.length) return;

        function toggleCard(card, expand){
          const isExpanded = Boolean(card.classList.contains('active'));
          const shouldExpand = typeof expand === 'boolean' ? expand : !isExpanded;
          card.classList.toggle('active', shouldExpand);
          card.setAttribute('aria-expanded', shouldExpand ? 'true' : 'false');
        }

        cards.forEach(card => {
          card.addEventListener('click', (e) => {
            // ignore clicks on links (if any)
            if (e.target.closest('a')) return;
            toggleCard(card);
          });

          card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleCard(card);
            }
          });
        });
      })();
 
      
      (function () {
        'use strict';
        const form = document.getElementById('subscribeForm');
        if (!form) return;
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            event.preventDefault();
            // replace with real submission in production
            const checkbox = form.querySelector('#allowNotifications');
            const allowed = checkbox && checkbox.checked ? 'Yes' : 'No';
            alert('Thanks — subscription received! Notifications allowed: ' + allowed);
            form.reset();
          }
          form.classList.add('was-validated');
        }, false);
      })();


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>


    // Initialize header carousel autoplay (continuous)
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('welcomeCarousel');
      if (!el) return;
      el.setAttribute('data-bs-pause', 'false');
      const interval = parseInt(el.getAttribute('data-bs-interval'), 10) || 5000;
      const carousel = bootstrap.Carousel.getOrCreateInstance(el, { interval, pause: false });
      carousel.cycle();
    });
 
    // Indicator light movement + color change
    (function(){
      'use strict';

      const container = document.querySelector('#welcomeCarousel .carousel-indicators');
      if (!container) return;
      const light = container.querySelector('.indicator-light');
      const buttons = Array.from(container.querySelectorAll('button'));
      if (!light || buttons.length === 0) return;

      // customize colors per slide (adjust order to match slides)
      const colors = ['#0d6efd','#198754','#0dcaf0','#ffc107'];

      function hexToRgba(hex, alpha){
        let c = (hex || '#000').replace('#','');
        if (c.length === 3) c = c.split('').map(ch=>ch+ch).join('');
        const n = parseInt(c,16);
        const r = (n>>16)&255, g = (n>>8)&255, b = n&255;
        return `rgba(${r},${g},${b},${alpha})`;
      }

      function placeLight(index){
        const btn = buttons[index] || buttons[0];
        const contRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const center = btnRect.left + btnRect.width/2 - contRect.left;
        light.style.left = `${Math.round(center)}px`;

        const color = colors[index % colors.length] || colors[0];
        light.style.background = `radial-gradient(circle at 30% 30%, ${hexToRgba(color,0.95)}, ${hexToRgba(color,0.6)})`;
        light.style.boxShadow = `0 8px 24px ${hexToRgba(color,0.28)}, 0 0 34px ${hexToRgba(color,0.32)}`;

        container.classList.add('moving');
        clearTimeout(container._movingTimeout);
        container._movingTimeout = setTimeout(()=> container.classList.remove('moving'), 360);
      }

      // initial placement
      const initialIndex = buttons.findIndex(b => b.classList.contains('active')) || 0;
      placeLight(initialIndex);

      // move when carousel finishes sliding
      const carouselEl = document.getElementById('welcomeCarousel');
      if (carouselEl) {
        carouselEl.addEventListener('slid.bs.carousel', (ev) => {
          placeLight(ev.to || 0);
        });
      }

      // react to clicks and resize
      buttons.forEach((b,i)=> b.addEventListener('click', ()=> placeLight(i)));
      let resizeTimer = null;
      window.addEventListener('resize', ()=> {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(()=>{
          const activeIndex = buttons.findIndex(b=>b.classList.contains('active')) || 0;
          placeLight(activeIndex);
        }, 120);
      });
    })();
 
     (function(){ const el = document.getElementById('footerYear'); if(el) el.textContent = new Date().getFullYear(); })();