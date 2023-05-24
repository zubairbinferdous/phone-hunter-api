// fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
// .then(res => res.json())
// .then( phone => {
//     phone.data.map( singlePhone => {
//         console.log(singlePhone);
//     })
// })

const loadPhone = async (value , limit) => {
  try {
    const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
    const api = await fetch(url);
    const data = await api.json();
    phoneData(data.data , limit);
  } catch (error) {
    console.log(error);
  }
};

phoneData = (phone , limit) => {
  console.log(phone.length);
  const element = document.getElementById("phone_container");
  const error = document.getElementById("error");
  element.innerHTML = "";
  
  const showAll = document.getElementById("show_all");
  if ( phone.length > limit) {
    phone = phone.slice(0, 10);
    showAll.classList.remove('d-none')
  }else{
    showAll.classList.add('d-none')
  }


  if (phone.length === 0) {
    error.classList.remove("d-none");
  } else {
    error.classList.add("d-none");
  }

  phone.map((singlePhone) => {
    const newElement = document.createElement("div");
    newElement.classList.add("col");
    newElement.innerHTML = `
        <div class="card">
        <img src="${singlePhone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${singlePhone.phone_name}</h5>
          <p class="card-text">${singlePhone.slug}</p>
          
          <div class="btn btn-bg btn-danger " onclick=loadDetails('${singlePhone.slug}') > Show Details</div>
        </div>
       </div>
        `;
    element.appendChild(newElement);
  });

  // stop loader
  loader(false);
};

const processSearch = (limit) => {
  loader(true);
  const value = document.getElementById("search-field").value;
  loadPhone(value , limit);
}

const search = document.getElementById("submit");
search.addEventListener("click", function () {
  // start loader
  processSearch(10);
});

// loader
function loader(isLoading) {
  const value = document.getElementById("loader");
  if (isLoading) {
    value.classList.remove("d-none");
  }else{
    value.classList.add("d-none");
  }
}

// loadPhone();

const showAll = document.getElementById('show_all');
showAll.addEventListener('click', function () {
   processSearch()
})

const loadDetails = async (id) =>{
  console.log(id)
}