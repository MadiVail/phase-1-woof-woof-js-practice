const url = "http://localhost:3000/pups/";

const getDogs = (getDogsBool) => {
    fetch (url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify()
    })
    .then(resp => resp.json())
    .then(json => {
        if (getDogsBool === false) {
            json.forEach(Dog => {
                addDog(Dog)
            })
        } else {
            json.filter(dogs => dogs.isGoodDog)
            .forEach(Dog => {
                addDog(Dog)
            })
         }
    })
}

addDog = (dog) => {
    const dogBar = document.getElementById("dog-bar");
    const dogSpan = document.createElement("span");

    dogSpan.setAttribute("id", "dog-span")
    dogSpan.innerHTML = dog.name;
    dogBar.appendChild(dogSpan);

    dogSpan.addEventListener('click', (e) => {
        e.preventDefault();
        viewDog(dog);
    })

}

viewDog = (dog) => {
    const dogInfo = document.getElementById("dog-info");

    deleteDogInfo();

    const dogImg = document.createElement("img");
    const dogName = document.createElement("h2");
    const dogBtn = document.createElement("button");

    dogBtn.setAttribute("id", "good-bad")

    dogBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dogToggle(dog, !dog.isGoodDog)
        butToggle(!dog.isGoodDog);
    })
    
    dogImg.src = dog.image;
    dogName.innerHTML = dog.name;
    
    dogInfo.appendChild(dogImg);
    dogInfo.appendChild(dogName);
    dogInfo.appendChild(dogBtn);

    butToggle(dog.isGoodDog)
}

dogToggle = (dog, bool) => {
    fetch(url + dog.id, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            isGoodDog: bool,
        }),
    })
    .then(resp => resp.json())
    .then(json => dog.isGoodDog = json.isGoodDog)
}

butToggle = (bool) => {
    const dogBut = document.getElementById("good-bad")
    if (bool) {
        dogBut.innerHTML = "Good Dog!";
    } else {
        dogBut.innerHTML = "Bad Dog!";
    }
}

filterTog = () => {
    const filter = document.getElementById("good-dog-filter")
    let filterBool = false;

    filter.addEventListener('click', (e) => {
        e.preventDefault();
        deleteSpan();
        deleteDogInfo();
        filterBool = !filterBool;

        if (filterBool === false) {
            filter.innerHTML = "Filter good dogs: OFF"
            getDogs(filterBool);
        } else {
            filter.innerHTML = "Filter good dogs: ON"
            getDogs(filterBool)
        }
    })
}

deleteDogInfo = () => {
    const dogInfo = document.getElementById("dog-info");

    let child = dogInfo.lastElementChild;
    
    while(child) {
        dogInfo.removeChild(child)
        child = dogInfo.lastElementChild;
    }
}

deleteSpan = () => {
    const dogBar = document.getElementById("dog-bar")
    let child = dogBar.lastElementChild;

    while(child) {
        dogBar.removeChild(child)
        child = dogBar.lastElementChild;
    }
}

init = () => {
    getDogs(false), filterTog();
}

document.addEventListener("DOMContentLoaded", init);