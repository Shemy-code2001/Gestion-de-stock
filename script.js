const defaultFilters = {
  cities: [],
  conditions: [],
  colors: [],
  category: "",
  search: "",
  minPrice: null,
  maxPrice: null,
};

let activeFilters = { ...defaultFilters };

// Liste de objets produits 
const products = [
  {
    id: 1,
    title: "Pantagon gENnator 6.5kW Silencer Gasoline",
    price: 99999,
    reviews: 223,
    rating: 5,
    image: "https://i.pinimg.com/564x/8a/3f/03/8a3f0367e54b904dc61e890339fc8a89.jpg",
    category: "accessories",
    city: "casablanca",
    condition: "new",
    color: "black",
  },
  {
    id: 2,
    title: "MacBook Pro 14-inch | M2 Pro chip | 512GB SSD | 16GB",
    price: 999798,
    reviews: 1253,
    rating: 5,
    image: "https://i.pinimg.com/564x/5c/94/b8/5c94b877b9135b62c8801f8e844feb79.jpg",
    category: "laptop",
    city: "marrakech",
    condition: "new",
    color: "white",
  },
  {
    id: 3,
    title: "HyperX Cloud Alpha Wireless 300-hour battery life",
    price: 159.99,
    reviews: 876,
    rating: 5,
    image: "https://hyperx.com/cdn/shop/files/hx_alpha_w_3_4_540x.jpg?v=1730147988",
    category: "accessories",
    city: "tanger",
    condition: "new",
    color: "red",
  },
  {
    id: 4,
    title: "Gaming Mouse RGB Razer DeathAdder V2",
    price: 699.99,
    reviews: 452,
    rating: 4.5,
    image: "https://i.pinimg.com/564x/44/11/77/441177ab870daa1f05fc3a8e61e79d8a.jpg",
    category: "mouse",
    city: "casablanca",
    condition: "new",
    color: "black",
  },
  {
    id: 5,
    title: "Mechanical Keyboard RGB Cherry MX Blue",
    price: 1299.99,
    reviews: 328,
    rating: 4.8,
    image: "https://i.pinimg.com/564x/2b/a0/ba/2ba0baf5ff8584cfe5727f0ce0aaa84e.jpg",
    category: "keyboard",
    city: "marrakech",
    condition: "new",
    color: "red",
  },
  {
    id: 6,
    title: "Gaming PC RTX 4080 i9-13900K",
    price: 25999.99,
    reviews: 89,
    rating: 5,
    image: "https://i.pinimg.com/736x/c0/8f/6d/c08f6d5e88f6ad47499f8161bc56fcdb.jpg",
    category: "computer",
    city: "tanger",
    condition: "new",
    color: "black",
  },
];

// modal proil
const modal = document.getElementById("profileModal");
const btn = document.getElementById("myPageBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = () => (modal.style.display = "block");
span.onclick = () => (modal.style.display = "none");
window.onclick = (event) => {
  if (event.target === modal) modal.style.display = "none";
};

function logout() {
  alert("Logging out...");
  modal.style.display = "none";
}

// mettre à jour les filtres actifs
function updateActiveFilters() {
  const container = document.getElementById("activeFilters");
  container.innerHTML = "";

  const createBadge = (text, type, value) => {
    const badge = document.createElement("div");
    badge.className = "filter-badge";
    badge.innerHTML = `
            ${text}
            <button onclick="removeFilter('${type}', '${value}')">&times;</button>
        `;
    container.appendChild(badge);
  };

  activeFilters.cities.forEach((city) => createBadge(city, "cities", city));
  activeFilters.conditions.forEach((condition) =>
    createBadge(condition, "conditions", condition)
  );
  activeFilters.colors.forEach((color) => createBadge(color, "colors", color));
  if (activeFilters.category)
    createBadge(activeFilters.category, "category", activeFilters.category);
}

function removeFilter(type, value) {
  if (Array.isArray(activeFilters[type])) {
    activeFilters[type] = activeFilters[type].filter((item) => item !== value);
  } else {
    activeFilters[type] = "";
  }
  updateActiveFilters();
  filterProducts();
}

function clearAllFilters() {
  activeFilters = { ...defaultFilters };
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((checkbox) => (checkbox.checked = false));
  document
    .querySelectorAll(".color-option")
    .forEach((option) => option.classList.remove("selected"));
  document.getElementById("searchInput").value = "";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  updateActiveFilters();
  filterProducts();
}

// Filtrage 
function filterProducts() {
  let filtered = products.filter((product) => {
    const matchesSearch =
      !activeFilters.search ||
      product.title.toLowerCase().includes(activeFilters.search.toLowerCase());
    const matchesCategory =
      !activeFilters.category || product.category === activeFilters.category;
    const matchesCity =
      activeFilters.cities.length === 0 ||
      activeFilters.cities.includes(product.city);
    const matchesCondition =
      activeFilters.conditions.length === 0 ||
      activeFilters.conditions.includes(product.condition);
    const matchesColor =
      activeFilters.colors.length === 0 ||
      activeFilters.colors.includes(product.color);
    const matchesPrice =
      (!activeFilters.minPrice || product.price >= activeFilters.minPrice) &&
      (!activeFilters.maxPrice || product.price <= activeFilters.maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesCity &&
      matchesCondition &&
      matchesColor &&
      matchesPrice
    );
  });

  renderProducts(filtered);
}

// Afficher les produits
function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    const stars =
      "⭐".repeat(Math.floor(product.rating)) +
      (product.rating % 1 >= 0.5 ? "⭐" : "");

    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">${stars} ${
      product.reviews
    } Reviews</div>
                <div class="product-price">${product.price.toLocaleString()} DH</div>
                <div class="product-details">
                    <span class="city">${product.city}</span> • 
                    <span class="condition">${product.condition}</span>
                </div>
                <button onclick="addToCart(${product.id})" class="add-to-cart">
                    Add to Cart
                </button>
            </div>
        `;
    container.appendChild(productCard);
  });
}

// Event listeners for all filters
document.addEventListener('DOMContentLoaded', () => {
    // City checkboxes
    document.querySelectorAll('input[name="city"]').forEach(checkbox => {
      checkbox.addEventListener('change', e => {
        if (e.target.checked) {
          activeFilters.cities.push(e.target.value);
        } else {
          activeFilters.cities = activeFilters.cities.filter(city => city !== e.target.value);
        }
        updateActiveFilters();
        filterProducts();
      });
    });
  
    // Condition checkboxes
    document.querySelectorAll('input[name="condition"]').forEach(checkbox => {
      checkbox.addEventListener('change', e => {
        if (e.target.checked) {
          activeFilters.conditions.push(e.target.value);
        } else {
          activeFilters.conditions = activeFilters.conditions.filter(condition => condition !== e.target.value);
        }
        updateActiveFilters();
        filterProducts();
      });
    });
  
    // Color options
    document.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', e => {
        const color = e.target.dataset.color;
        if (e.target.classList.contains('selected')) {
          e.target.classList.remove('selected');
          activeFilters.colors = activeFilters.colors.filter(c => c !== color);
        } else {
          e.target.classList.add('selected');
          activeFilters.colors.push(color);
        }
        updateActiveFilters();
        filterProducts();
      });
    });

    document.querySelectorAll('nav ul li').forEach(item => {
      item.addEventListener('click', e => {
        const category = e.target.dataset.category;
        activeFilters.category = category;
        updateActiveFilters();
        filterProducts();
      });
    });
  
    // Search 
    document.getElementById('searchInput').addEventListener('input', e => {
      activeFilters.search = e.target.value;
      filterProducts();
    });
  
    // Price range
    document.getElementById('minPrice').addEventListener('input', e => {
      activeFilters.minPrice = e.target.value ? Number(e.target.value) : null;
      filterProducts();
    });
  
    document.getElementById('maxPrice').addEventListener('input', e => {
      activeFilters.maxPrice = e.target.value ? Number(e.target.value) : null;
      filterProducts();
    });
  
    // Sort 
    document.getElementById('sortSelect').addEventListener('change', e => {
      const sortOption = e.target.value;
      let sortedProducts = [...products];
  
      switch (sortOption) {
        case 'price-asc':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'reviews':
          sortedProducts.sort((a, b) => b.reviews - a.reviews);
          break;
        case 'rating':
          sortedProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
  
      renderProducts(sortedProducts.filter(product => {
        return matchesFilters(product, activeFilters);
      }));
    });
  });
  
  function matchesFilters(product, filters) {
    return (
      (!filters.search || product.title.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.category || product.category === filters.category) &&
      (filters.cities.length === 0 || filters.cities.includes(product.city)) &&
      (filters.conditions.length === 0 || filters.conditions.includes(product.condition)) &&
      (filters.colors.length === 0 || filters.colors.includes(product.color)) &&
      (!filters.minPrice || product.price >= filters.minPrice) &&
      (!filters.maxPrice || product.price <= filters.maxPrice)
    );
  }
  
  function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchCategory = document.getElementById('searchCategory');
    
    activeFilters.search = searchInput.value;
    activeFilters.category = searchCategory.value;
    
    filterProducts();
  }

document.addEventListener("DOMContentLoaded", () => {
  filterProducts();
});
