let navbarArr = document.getElementsByClassName('navbar-element');

let contentArr = document.getElementsByClassName('content')
let initialNav = navbarArr[0].classList;

let initialContent=contentArr[0].classList;

document.getElementsByTagName('nav')[0].getElementsByTagName('img')[0].addEventListener('click',()=> {
    if (navbarArr[0].classList == initialNav)
        return;
        document.getElementsByTagName('h4')[0].classList.add('hidden');
    let finalNav = (navbarArr)[0].classList;
    finalNav.toggle('activeTab');
    initialNav.toggle('activeTab');
    initialNav = finalNav;
    clearInput();
    let finalContent = (contentArr)[0].classList;
    finalContent.toggle('hidden');
    initialContent.toggle('hidden');
    initialContent=finalContent;
})

navbarArr[0].addEventListener("click",()=> {
    if (navbarArr[0].classList == initialNav)
        return;
        clearInput();
        document.getElementsByTagName('h4')[0].classList.add('hidden');
    let finalNav = (navbarArr)[0].classList;
    finalNav.toggle('activeTab');
    initialNav.toggle('activeTab');
    initialNav = finalNav;

    let finalContent = (contentArr)[0].classList;
    finalContent.toggle('hidden');
    initialContent.toggle('hidden');
    initialContent=finalContent;
});


navbarArr[1].addEventListener("click",()=> {
    if (navbarArr[1].classList == initialNav)
        return;
        clearInput();
        document.getElementsByTagName('h4')[0].classList.add('hidden');
    let finalNav = (navbarArr)[1].classList;
    finalNav.toggle('activeTab');
    initialNav.toggle('activeTab');
    initialNav = finalNav;

    let finalContent = (contentArr)[1].classList;
    finalContent.toggle('hidden');
    initialContent.toggle('hidden');
    initialContent=finalContent;
});

navbarArr[2].addEventListener("click",()=>{
    if (navbarArr[2].classList == initialNav)
        return;
        clearInput();
        document.getElementsByTagName('h4')[0].classList.add('hidden');
    let finalNav = (navbarArr)[2].classList;
    finalNav.toggle('activeTab');
    initialNav.toggle('activeTab');
    initialNav = finalNav;

    let finalContent = (contentArr)[2].classList;
    finalContent.toggle('hidden');
    initialContent.toggle('hidden');
    initialContent=finalContent;
});


navbarArr[3].addEventListener("click",()=> {
    if (navbarArr[3].classList == initialNav)
        return;
        clearInput();
        document.getElementsByTagName('h4')[0].classList.add('hidden');
    let finalNav = (navbarArr)[3].classList;
    finalNav.toggle('activeTab');
    initialNav.toggle('activeTab');
    initialNav = finalNav;

    let finalContent = (contentArr)[3].classList;
    finalContent.toggle('hidden');
    initialContent.toggle('hidden');
    initialContent=finalContent;
})


function clearInput(){
    let inputArr=document.querySelectorAll('input');
    for(i=0;i<inputArr.length;i++)
    {
        var temp=inputArr[i];
        temp.value='';
    }
}

let imageArr=document.querySelectorAll('img');

document.getElementsByTagName("img")[1].addEventListener('click',()=>{
    imageArr[1].classList.toggle('hidden');
    imageArr[2].classList.toggle('hidden');
})

document.getElementsByTagName("img")[2].addEventListener('click',()=>{
    imageArr[1].classList.toggle('hidden');
    imageArr[2].classList.toggle('hidden');
})

let feedbackButton=document.getElementById('feedbackButton');
feedbackButton.addEventListener('click',()=>
{
    document.getElementsByTagName('h4')[0].classList.toggle('hidden');
    clearInput();
})