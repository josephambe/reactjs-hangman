if(localStorage.getItem("firstTime")==null){
    alert("Welcome to Raygun's sample app! Look for errors in the site. \nHINT: Raygun");
    localStorage.setItem("firstTime","done");
}