function toggleMenu() {
    document.getElementById("mobileNav").classList.toggle("show");
  }

  document.addEventListener('DOMContentLoaded', () => {
    const zoomBtns = document.querySelectorAll('.zoom-toggle');
    const wishlistBtns = document.querySelectorAll('.WishList');
    const wishlistContainer = document.getElementById('wishlistItems');

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Function to render an item to the wishlist
    function renderWishlistItem(item) {
      const div = document.createElement('div');
      div.className = 'wishlist-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <p>${item.title}</p>
        <button class="remove-wishlist">Remove</button>
      `;
      div.querySelector('.remove-wishlist').addEventListener('click', () => {
        div.remove();
        wishlist = wishlist.filter(i => i.img !== item.img);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Re-enable corresponding "Add to Wishlist" button
        document.querySelectorAll('.nail-card').forEach(card => {
          const img = card.querySelector('img').src;
          if (img === item.img) {
            const btn = card.querySelector('.WishList');
            btn.textContent = "Add to Wishlist";
            btn.disabled = false;
          }
        });
      });
      wishlistContainer.appendChild(div);
    }

    // Load wishlist from localStorage
    wishlist.forEach(renderWishlistItem);

    // Zoom functionality
    zoomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const img = btn.closest('.nail-card').querySelector('img');
        img.classList.toggle('zoomed');
        btn.textContent = img.classList.contains('zoomed') ? 'Minimize' : 'Zoom';
      });
    });

    // Add to Wishlist buttons
    wishlistBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.nail-card');
        const img = card.querySelector('img').src;
        const title = card.querySelector('h2').textContent;

        // Prevent duplicates
        if (wishlist.some(item => item.img === img)) return;

        const item = { img, title };
        wishlist.push(item);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        renderWishlistItem(item);

        btn.textContent = "Added";
        btn.disabled = true;
      });

      // On page load, disable button if already in wishlist
      const card = btn.closest('.nail-card');
      const img = card.querySelector('img').src;
      if (wishlist.some(item => item.img === img)) {
        btn.textContent = "Added";
        btn.disabled = true;
      }
    });
  });