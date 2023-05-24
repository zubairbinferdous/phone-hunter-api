// fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
// .then(res => res.json())
// .then( phone => {
//     phone.data.map( singlePhone => {
//         console.log(singlePhone);
//     })
// })


const loadPhone = async(value) => {
  try{
    const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
    const api = await fetch(url);
    const data = await api.json();
    phoneData(data.data);
  }catch(error){
    console.log(error);
  }
}

phoneData = phone => {
    console.log(phone.length)
    const element = document.getElementById('phone_container');
    const error = document.getElementById('error');
    element.innerHTML = '';
    phone = phone.slice(0 , 10);

    if (phone.length === 0) {
      error.classList.remove('d-none')
    }else{
      error.classList.add('d-none')
    }

    phone.map( singlePhone => {
        const newElement = document.createElement('div');
        newElement.classList.add('col');
        newElement.innerHTML = `
        <div class="card">
        <img src="${singlePhone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${singlePhone.phone_name}</h5>
          <p class="card-text">${singlePhone.slug}</p>
        </div>
       </div>
        `;
        element.appendChild(newElement);
    })
} 

const search = document.getElementById('submit');
search.addEventListener('click', function(){
 const value =  document.getElementById('search-field').value;
 loadPhone(value);

})



// loadPhone();
