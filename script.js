const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("content");
const searchInput = document.getElementById("search-input"); 
let currentCategory = "home"; 

// -----------------------------------
// البيانات المحدثة مع فئة الصناديق الجديدة
// -----------------------------------
const data = {
  ranks: [
    {name:"rank1", ext:"jpg", desc:"Elite: +500 بلوكة كليم، سيف سوبر، 300 فلوس", price:"200 دايموند"},
    {name:"rank2", ext:"jpg", desc:"VIP: +1000 بلوكة كليم، سيف سوبر، 3000 فلوس", price:"300 دايموند"},
    {name:"rank3", ext:"jpg", desc:"Golding: +2000 بلوكة كليم، سيف سوبر، 5000 فلوس", price:"400 دايموند"}
  ],
  claims: [
    {name:"cliam", ext:"jpg", desc:"100 بلوكة", price:"10 دايموند"},
    {name:"cliam", ext:"jpg", desc:"300 بلوكة", price:"30 دايموند"},
    {name:"cliam", ext:"jpg", desc:"400 بلوكة", price:"40 دايموند"},
    {name:"cliam", ext:"jpg", desc:"1000 بلوكة", price:"100 دايموند"}
  ],
  chests: [
    {name:"chastes", ext:"jpg", desc:"صندوق ذو مزايا عشوائية", price:"500 دايموند"} 
  ]
};

// -----------------------------------
// 1. دالة إنشاء شاشة تفاصيل المنتج
// -----------------------------------
function showProductDetailsPage(item, category) {
    // تعطيل البحث عند عرض صفحة التفاصيل
    searchInput.style.visibility = 'hidden'; 
    
    content.innerHTML = ""; 

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "product-details-page";
    detailsContainer.style.textAlign = 'center';

    const backButton = document.createElement('button');
    backButton.textContent = '← العودة إلى القائمة';
    backButton.className = 'back-button';
    backButton.onclick = () => showCategory(category);
    
    const largeImg = document.createElement("img");
    largeImg.src = `${item.name}.${item.ext}`;
    largeImg.alt = item.name;
    largeImg.style.maxWidth = '100%';
    largeImg.style.maxHeight = '400px';
    largeImg.style.borderRadius = '15px';
    largeImg.style.margin = '20px auto';
    largeImg.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

    const displayName = (category === 'chests') ? item.desc : (item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/([a-zA-Z]+)(\d+)/, '$1 $2'));
    
    let detailsDesc = item.desc;
    if (category === 'chests') {
        detailsDesc = "صندوق يحتوي على مزايا نادرة أو أدوات قوية عشوائية بقيمة تفوق سعر الشراء!";
    }

    const infoHtml = `
        <h2 style="color: #FFD700;">${displayName}</h2>
        <p style="font-size: 1.2em; max-width: 600px; margin: 0 auto 20px auto;">${detailsDesc}</p>
        <p style="font-size: 1.5em; font-weight: bold; color: #7CFC00;">السعر: ${item.price}</p>
        <button class="buy-button">طلب الشراء (تواصل معنا)</button>
    `;

    detailsContainer.appendChild(backButton);
    detailsContainer.appendChild(largeImg);
    detailsContainer.innerHTML += infoHtml; 

    content.appendChild(detailsContainer);
}


// -----------------------------------
// 2. دالة إنشاء بطاقة المنتج
// -----------------------------------
function createProductCard(item, category) {
    const card = document.createElement("div");
    card.className = `product-card ${category}`; 

    const img = document.createElement("img");
    img.src = `${item.name}.${item.ext}`;
    img.alt = item.name;
    img.loading = "lazy"; 

    const info = document.createElement("div");
    info.className = "product-info";
    
    const displayName = (category === 'chests') ? item.desc : (item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/([a-zA-Z]+)(\d+)/, '$1 $2'));
    
    info.innerHTML = `
        <h3>${displayName}</h3> 
        <p>${item.price}</p>
    `;
    
    card.appendChild(img);
    card.appendChild(info);

    card.onclick = () => {
        showProductDetailsPage(item, category);
    };
    
    return card;
}

// -----------------------------------
// 3. دالة عرض الفئة
// -----------------------------------
function renderProducts(products, cat) {
    content.innerHTML = "";
    if (products.length === 0) {
        content.innerHTML = `<p style="text-align: center; margin-top: 50px;">عذراً، لم يتم العثور على منتجات مطابقة في فئة ${cat} هذه.</p>`;
        return;
    }
    products.forEach(item => {
        content.appendChild(createProductCard(item, cat));
    });
}

function showCategory(cat) {
    currentCategory = cat;
    searchInput.value = ''; 

    // إظهار حقل البحث في جميع الفئات ما عدا الرئيسية
    searchInput.style.visibility = (cat === 'home') ? 'hidden' : 'visible'; 

    if (cat === 'home') {
        content.innerHTML = `
            <div style="text-align: center; padding: 50px 20px; max-width: 600px; margin: 50px auto; background-color: rgba(31, 41, 55, 0.8); border-radius: 15px; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
                <h2 style="color: #FFD700; margin-bottom: 30px;">التواصل والدعم الفني</h2>
                <p style="font-size: 1.5em; margin-bottom: 30px; line-height: 1.6;">
                    للتواصل معنا تعال هنا و اتفح تكت
                </p>
                <a href="https://discord.gg/GNCfyw8xY" 
                   target="_blank" 
                   style="display: inline-block; padding: 15px 30px; background-color: #5865F2; color: white; border-radius: 8px; text-decoration: none; font-size: 1.2em; font-weight: bold; transition: background-color 0.2s;">
                   انقر هنا لفتح تذكرة على ديسكورد
                </a>
                <p style="margin-top: 15px; font-size: 0.9em; color: #ccc;">(يفتح الرابط في نافذة جديدة)</p>
            </div>
        `;
        return;
    }
    
    renderProducts(data[cat], cat);
}

// -----------------------------------
// 4. دالة البحث (Filtering Function)
// -----------------------------------
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (currentCategory === 'home') return; // منع البحث في صفحة الرئيسية
    
    const filteredProducts = data[currentCategory].filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm);
        const descMatch = item.desc.toLowerCase().includes(searchTerm);
        return nameMatch || descMatch;
    });
    
    renderProducts(filteredProducts, currentCategory);
}

// -----------------------------------
// 5. مستمعات الأحداث والتحميل الأولي
// -----------------------------------

// هذا الجزء هو المسؤول عن تشغيل الأزرار عند الضغط
tabs.forEach(tab=>{
  tab.addEventListener("click", ()=>{
    tabs.forEach(t=>t.classList.remove("tab-active"));
    tab.classList.add("tab-active");
    showCategory(tab.dataset.target);
  });
});

searchInput.addEventListener("input", filterProducts);

// الإعداد الأولي (عرض الرئيسية أولاً افتراضياً)
showCategory('home');
// تفعيل زر الرئيسية
document.querySelector('button[data-target="home"]').classList.add("tab-active");
