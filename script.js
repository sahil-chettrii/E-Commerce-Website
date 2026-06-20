const filterlinks = document.querySelectorAll(".filter-bar a");
const productcards = document.querySelectorAll(".product-card");

const sortSelect = document.getElementById("sort");
const productGrid = document.querySelector(".product-grid");

const searchInput = document.getElementById("searchInput");

const  cartCoun = document.getElementById("cartCount");
 
let cartTotsl = 0;

// FILTER BUTTONS

filterlinks.forEach((link) => {
  link.addEventListener("click",(e)=> {
    e.preventDefault();
    filterlinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const selectedCategory = link.textContent.trim().toLowerCase();
    productcards.forEach((card) => {
        const cardCategory  = card.CDATA_SECTION_NODE.category;

        if(selectedCategory === "all" || cardCategory === selectedCategory){
            card.classList.remove("hidden");

        }else{
            card.classList.add("hidden");
        }
    });
  });
});

// SORT DROPDOWN (Price low-high, high-low... 

sortSelect.addEventListener("change", () => {
    const sortValue = sortSelect.value;

    const cardsArray = Array.from(productcards);

    if (sortValue === "LowToHigh") {
        cardsArray.sort((a, b) => a.dataset.price - b.dataset.price);
    } else if (sortValue === "Newest") {
        cardsArray.reverse();
    }

    cardsArray.forEach((card) => productGrid.appendChild(card));
});

// WISHLIST TOGGLE (heart button)

const  wishlistButton = document.querySelectorAll(".wishlist-btn");
wishlistButton.forEach((btn) => {
    btn.addEventListener("click",() => {
        btn.classList.toggle("active");
        if(btn.classList.contains("active")){
            btn.textContent ="♥"
             showToast("added to whishlist");
        } else{
            btn.textContent="♡"
            showToast("Removed from whishlist");       
         }
    });
});

// ADD TO CART

productcards.forEach((card)=> {
    const imgWrap = card.querySelector(".product-img-wrap");
    imgWrap.addEventListener("click",(e) => {
        if(e.target.classList.contains("wishlist-btn"))
            return;
        const price = Number(card.dataset.price);
        const name = card.querySelector("h3").textContent;
        cartTotal++;
        cartCount.textContent = cartTotal;
        showToast('${name} added to cart');
    });
});